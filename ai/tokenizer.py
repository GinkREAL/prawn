import nltk
from bson import ObjectId
from string import punctuation
from nltk.corpus import stopwords
from pymongo import MongoClient
from nltk import *

nltk.download('stopwords')
nltk.download('wordnet')

try:
    client = MongoClient('mongodb://localhost:27017/')
    print("Successfully Connected")
except:
    print("Failed to connect")

db = client.reddit
articles = db['articles']
hmap = db['heatmaps']
vocab = db['vocab']

# recursively scrapes comments from comment/replies
def scrape_replies(comment_address, comments):
    top = int(comment_address.pop(0))
    reply = comments[top]
    if len(comment_address) == 0:
        return reply['comment']
    else:
        return scrape_replies(comment_address, reply['replies'])

# lemmatize text
def lemma(text):

    return SnowballStemmer("english").stem(WordNetLemmatizer().lemmatize(text, pos='v'))

# cleans text, then transforms it into tokens
def clean(doc):
    tokens = doc.split()
    table = str.maketrans('', '', punctuation)
    tokens = [w.translate(table) for w in tokens]
    tokens = [w for w in tokens if w.isalpha()]
    stop_words = set(stopwords.words('english'))
    tokens = [w for w in tokens if not w in stop_words]
    tokens = [w for w in tokens if len(w) > 3]
    tokens = [w.lower() for w in tokens]
    tokens = [lemma(w) for w in tokens]
    return tokens

# adds to vocabulary
def addToVocab(txt, vocab):
    tokens = clean(txt)
    vocab.update(tokens)

# creates new vocabulary for BoW
def newVocab():
    counter = Counter()
    # Goes through the heatmap to find relevant comments, then goes to the article
    for heat in hmap.find():
        article_id = heat['article']
        article = articles.find_one({"_id": ObjectId(article_id)})
        comments = article['comments']
        for cmap in heat['heatmap']:
            if(cmap['score'] > 100):
                comment_address = cmap['comment_address']
                com_add = comment_address.split(",")
                addToVocab(scrape_replies(com_add,comments), counter)

    # keep tokens with a min occurrence
    min_occur = 15
    tokens = [k for k,c in counter.items() if c >= min_occur]

    # updates the vocabulary collection in MongoDB
    vocab.update_many({'vocabulary':{"$exists":True}}, {"$set": {'vocabulary': tokens}})
    print("Done updating vocabulary!")

newVocab()


