# Needs "posneg.h5" and "neutral.h5" for model
# Needs db.collection of 'vocab' and 'dataset'

import en_core_web_sm
from nltk.stem import *
from string import punctuation
from pymongo import MongoClient
from nltk.corpus import stopwords
from keras.models import load_model
from keras.preprocessing.text import Tokenizer
from rake_nltk import Rake

r = Rake()
# This is to load Spacy library on English lang
# To get the subject/topic of the sentence
nlp = en_core_web_sm.load()

# Connects and loads to the mongodb server
try:
    client = MongoClient('mongodb://localhost:27017/')
except:
    print("Failed to connect")

db = client.reddit
voc = db['vocab']
voca = voc.find_one({'vocabulary': {"$exists": True}})
vocab = voca['vocabulary']
ds = db['2dataset']

fav_tr = []
agt_tr = []
non_tr = []

for sets in ds.find():
    lbl = sets['label']
    if lbl == 'fav_tr':
        fav_tr = sets['voc']
    elif lbl == 'agt_tr':
        agt_tr = sets['voc']
    elif lbl == 'non_tr':
        non_tr = sets['voc']

tr_set = agt_tr + fav_tr
neu_tr = non_tr + tr_set

# Tokenizers for both models that fits their specific data set/vocabulary
neu_tok = Tokenizer()
neu_tok.fit_on_texts(neu_tr)
pn_tok = Tokenizer()
pn_tok.fit_on_texts(tr_set)

# These two are the bag of word models
# One for check if neutral or with stance
# Another for check if positive or negative
pn_mod = load_model("posneg.h5")
neu_mod = load_model("neutral.h5")

# Cleans text to tokens
def clean(doc):
    tokens = doc.split()
    table = str.maketrans('', '', punctuation)
    tokens = [w.translate(table) for w in tokens]
    tokens = [w for w in tokens if w.isalpha()]
    stop_words = set(stopwords.words('english'))
    tokens = [w for w in tokens if not w in stop_words]
    tokens = [w for w in tokens if len(w) > 3]
    tokens = [w.lower() for w in tokens]
    tokens = [SnowballStemmer("english").stem(
        WordNetLemmatizer().lemmatize(w, pos='v')) for w in tokens]
    return tokens

# Predicts if text is Favor, Against, or Neutral
# Returns string "Topic: 'topic' \n Stance: 'stance'"
def predict_sentiment(comment):
    comment = comment.lower()
    doc = nlp(comment)
    topic = [tok.text for tok in doc if (tok.dep_ == "nsubj")]
    topic = ' '.join(topic)
    tokens = clean(comment)
    tokens = [w for w in tokens if w in vocab]
    line = ' '.join(tokens)
    encoded = neu_tok.texts_to_matrix([line], mode='freq')
    yhat = neu_mod.predict(encoded, verbose=0)
    if yhat[0, 0] < 0.4:
        return "none"
    else:
        encoded = pn_tok.texts_to_matrix([line], mode='tfidf')
        yhat = pn_mod.predict(encoded, verbose=0)
        if yhat[0, 0] < 0.4:
            return "against"
        else:
            return "favor"

def predict_all(title, comments):
    out = {}
    favor = 0
    against = 0
    none = 0
    count = 0;

    r.extract_keywords_from_text(title)
    topics = r.get_ranked_phrases()

    for temp_comment in comments:
        comment = temp_comment.body
        r.extract_keywords_from_text(comment)
        comment_topics = r.get_ranked_phrases()
        for comment_topic in comment_topics:
            for topic in topics:
                if topic == comment_topic:
                    stance = predict_sentiment(comment)
                    count += 1
                    if comment in comments:
                        comments.remove(comment)
                    if stance == 'favor':
                        favor += 1
                    elif stance == 'against':
                        against += 1
                    elif stance == 'none':
                        none += 1

    favor = (favor / count) * 100
    favor =  float("{0:.2f}".format(favor))
    against = (against / count) * 100
    against =  float("{0:.2f}".format(against))
    none = (none / count) * 100
    none =  float("{0:.2f}".format(none))

    out[topics[0]] = {"favor": favor, "against": against, "none": none}

    return out
