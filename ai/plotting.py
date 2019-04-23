import nltk
import en_core_web_sm
from pymongo import MongoClient
from numpy import array
from keras.preprocessing.text import Tokenizer
from keras.models import Sequential
from keras.layers import Dense
from keras import backend as K
from pandas import DataFrame
from matplotlib import pyplot

nlp = en_core_web_sm.load()

nltk.download('stopwords')
nltk.download('wordnet')
nltk.download('averaged_perceptron_tagger')

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
ds = db['dataset']

voca = voc.find_one({'vocabulary':{"$exists":True}})
vocab = voca['vocabulary']

fav_tr = []
agt_tr = []
non_tr = []
fav_ts = []
agt_ts = []
non_ts = []

for sets in ds.find():
    lbl = sets['label']
    if lbl == 'fav_tr':
        fav_tr = sets['voc']
    elif lbl == 'fav_ts':
        fav_ts = sets['voc']
    elif lbl == 'agt_tr':
        agt_tr = sets['voc']
    elif lbl == 'agt_ts':
        agt_ts = sets['voc']
    elif lbl == 'non_tr':
        non_tr = sets['voc']
    elif lbl == 'non_ts':
        non_ts = sets['voc']

tr_set = agt_tr + fav_tr
ts_set = agt_ts + fav_ts
neu_tr = non_tr + tr_set
neu_ts = non_ts + ts_set

def f1(y_true, y_pred):
    def recall(y_true, y_pred):
        true_positives = K.sum(K.round(K.clip(y_true * y_pred, 0, 1)))
        possible_positives = K.sum(K.round(K.clip(y_true, 0, 1)))
        recall = true_positives / (possible_positives + K.epsilon())
        return recall

    def precision(y_true, y_pred):
        true_positives = K.sum(K.round(K.clip(y_true * y_pred, 0, 1)))
        predicted_positives = K.sum(K.round(K.clip(y_pred, 0, 1)))
        precision = true_positives / (predicted_positives + K.epsilon())
        return precision

    precision = precision(y_true, y_pred)
    recall = recall(y_true, y_pred)
    return 2*((precision*recall)/(precision+recall+K.epsilon()))

# evaluate a neural network model
def eval(Xtrain, ytrain, Xtest, ytest):
    scores = list()
    n_repeats = 5
    n_words = Xtest.shape[1]
    for i in range(n_repeats):
        model = Sequential()
        model.add(Dense(50, input_shape=(n_words,), activation='relu'))
        model.add(Dense(1, activation='sigmoid'))
        # model.compile(loss='binary_crossentropy', optimizer='adam', metrics=['accuracy'])
        model.compile(loss='binary_crossentropy', optimizer='adam', metrics=[f1])
        model.fit(Xtrain, ytrain, epochs=20, verbose=2)
        loss, acc = model.evaluate(Xtest, ytest, verbose=0)
        scores.append(acc)
        print('%d f1 score: %s' % ((i+1), acc))
    return scores

# prepare bag of words encoding of docs
def prep(train_docs, test_docs, mode):
    tokenizer = Tokenizer()
    tokenizer.fit_on_texts(train_docs)
    Xtrain = tokenizer.texts_to_matrix(train_docs, mode=mode)
    Xtest = tokenizer.texts_to_matrix(test_docs, mode=mode)
    return Xtrain, Xtest

ytrain = array([0 for _ in range(len(non_tr))] + [1 for _ in range(len(tr_set))])
ytest = array([0 for _ in range(len(non_ts))] + [1 for _ in range(len(ts_set))])

modes = ['binary', 'count', 'tfidf', 'freq']
results = DataFrame()
print('Training/Testing NEU_MOD')
for mode in modes:
    print(mode)
    Xtrain, Xtest = prep(neu_tr, neu_ts, mode)
    results[mode] = eval(Xtrain, ytrain, Xtest, ytest)

print('With or Without Model: ')
print(results.describe())
results.boxplot()
pyplot.show()

ytrain = array([0 for _ in range(len(agt_tr))] + [1 for _ in range(len(fav_tr))])
ytest = array([0 for _ in range(len(agt_ts))] + [1 for _ in range(len(fav_ts))])

results = DataFrame()
print('Training/Testing PN_MOD')
for mode in modes:
    Xtrain, Xtest = prep(tr_set, ts_set, mode)
    results[mode] = eval(Xtrain, ytrain, Xtest, ytest)

print('Positive Negative Model: ')
print(results.describe())
results.boxplot()
pyplot.show()
