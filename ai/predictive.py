import nltk
from bson import ObjectId
from pymongo import MongoClient
from nltk.stem import *
from numpy import array
from keras.preprocessing.text import Tokenizer
from keras.models import Sequential
from keras.layers import Dense
from string import punctuation
from collections import Counter
from nltk.corpus import stopwords

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
voc = db['vocab']
labels = db['labels']

voca =  voc.find_one({'vocabulary':{"$exists":True}})
vocab = voca['vocabulary']

# recursively scrapes comments from comment/replies
def scrapeReplies(comment_address, comments):
    top = int(comment_address.pop(0))
    reply = comments[top]
    if len(comment_address) == 0:
        return reply['comment']
    else:
        return scrapeReplies(comment_address, reply['replies'])

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
        for article in articles.find({"_id": ObjectId(article_id)}):
            comments = article['comments']
            for cmap in heat['heatmap']:
                if(cmap['score'] > 100):
                    comment_address = cmap['comment_address']
                    com_add = comment_address.split(",")
                    addToVocab(scrapeReplies(com_add,comments), counter)

    # keep tokens with a min occurrence
    min_occur = 15
    tokens = [k for k,c in counter.items() if c >= min_occur]

    # updates the vocabulary collection in MongoDB
    vocab.update_many({'vocabulary':{"$exists":True}}, {"$set": {'vocabulary': tokens}})
    print("Done updating vocabulary!")

# gathers the comments into their specific label (favor, against, none)
def getLabel():
    print('Tokenizing training and test data')
    thresh = (labels.count()*.9)
    count = 0;
    for label in labels.find():
        article_id = label['article_id']
        lbl = label['label']
        trgt = label['target']
        article = articles.find_one({"_id": ObjectId(article_id)})
        comments = article['comments']
        comment_address = label['comment_address']
        com_add = comment_address.split(",")
        comment = scrapeReplies(com_add,comments)
        if comment != '[deleted]':
            tokens = clean(comment)
            tokens = [w for w in tokens if w in vocab]
            if(count >= thresh):
                if lbl == 'favor':
                    fav_ts.extend(tokens)
                elif lbl == 'against':
                    agt_ts.extend(tokens)
                elif lbl == 'none':
                    non_ts.extend(tokens)
            else:
                if lbl == 'favor':
                    fav_tr.extend(tokens)
                elif lbl == 'against':
                    agt_tr.extend(tokens)
                elif lbl == 'none':
                    non_tr.extend(tokens)
        count+=1


fav_tr = []
agt_tr = []
non_tr = []
fav_ts = []
agt_ts = []
non_ts = []

getLabel()
print('Done tokenizing!')

tr_set = agt_tr + fav_tr

tokenizer = Tokenizer()
tokenizer.fit_on_texts(tr_set)
Xtrain = tokenizer.texts_to_matrix(tr_set, mode='freq')
print(Xtrain.shape)

ts_set = agt_ts + fav_ts
Xtest = tokenizer.texts_to_matrix(ts_set, mode='freq')
print(Xtest.shape)
n_words = Xtest.shape[1]
print(len(Xtrain))
print(len(Xtest))

ytrain = array([0 for _ in range(len(agt_tr))] + [1 for _ in range(len(fav_tr))])
print(len(ytrain))
ytest = array([0 for _ in range(len(agt_ts))] + [1 for _ in range(len(fav_ts))])
print(len(ytest))

model = Sequential()
model.add(Dense(50, input_shape=(n_words,), activation='relu'))
model.add(Dense(1, activation='sigmoid'))
model.compile(loss='binary_crossentropy', optimizer='adam', metrics=['accuracy'])
model.fit(Xtrain, ytrain, epochs=50, verbose=2)
loss, acc = model.evaluate(Xtest, ytest, verbose=0)
print('Test Accuracy: %f' % (acc*100))

# classify a comment as negative (0) or positive (1)
def predict_sentiment(comment, vocab, tokenizer, model):
	tokens = clean(comment)
	tokens = [w for w in tokens if w in vocab]
	line = ' '.join(tokens)
	encoded = tokenizer.texts_to_matrix([line], mode='tfidf')
	yhat = model.predict(encoded, verbose=0)
	return round(yhat[0,0])

text = 'He was the top pick for this job'
print(predict_sentiment(text, vocab, tokenizer, model))
text = 'Fuck Donald Trump'
print(predict_sentiment(text, vocab, tokenizer, model))

