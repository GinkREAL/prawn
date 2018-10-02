from pymongo import MongoClient
import json
import nltk
import string
import pandas as pd
import numpy
from collections import Counter
from nltk.tokenize import WordPunctTokenizer, MWETokenizer, RegexpTokenizer
from nltk.corpus import stopwords
import matplotlib.pyplot as plt

# Retrieve data from MongoDB
client = MongoClient('localhost', 27017)
db = client.reddit
comments = db.comments
comments_only = []
num_comments = 0
# Close MongoDB connection
# client.close()

# Getting the comments
for article in comments.find().limit(1):
	for comment in article['comments']:
		comments_only.append(comment['comment'])
		num_comments += 1

# Function for tokenizer
def process(text='', stopwords=[], combine_words=[]):
    text = text.lower()
    word_punct_tokenizer = WordPunctTokenizer()
    tokens_punct = word_punct_tokenizer.tokenize(text)
    tokens_regex = RegexpTokenizer(r'\w+').tokenize(text)

    name_tokenizer = MWETokenizer(combine_words, separator='_')
    tokens = name_tokenizer.tokenize(tokens_regex)

    return [word for word in tokens if word not in stopwords and not word.isdigit()]

punct = list(string.punctuation)
nltk.download('stopwords')
more_stopwords = ['https', 'would', 'could', 'com', 'vs', 'deleted']
stopword_list = stopwords.words('english') + punct + more_stopwords
combine_words_list = [("jeff", "goldblum"), ("ryan", "reynolds"), ("steven", "spielberg"), ("drew", "barrymore"), ("owen", "wilson"), ("nat", "geo"), ("harrison", "ford")]

tf = Counter()

for element in comments_only:
    text = element
    tokens = process(text = text, stopwords = stopword_list, combine_words = combine_words_list)
    # Update word frequency
    tf.update(tokens)

# Convert the counter to a sorted list (tf_sorted is a list of 2-tuples)
tf_list_sorted = sorted(tf.items(), key = lambda pair: pair[1], reverse = True)

# Convert list to dataframe
df = pd.DataFrame(tf_list_sorted, columns=['Term', 'Frequency'])
print(df)
print('Number of comments cleaned: ', num_comments)
df.to_csv('clean_data/1.csv')

top_20 = [["jeff_goldblum", "jeff", "goldblum"], ["watch"], ["like"], ["fascinated"], ["show"], ["people"], ["things"], ["love"], ["well"], ["way"], ["nat_geo"], ["going"], ["see"], ["man"], ["pikachu"], ["best"], ["one"], ["money"], ["ryan_reynolds"], ["know"]]
top_20_freq = [118, 55, 44, 41, 29, 25, 24, 22, 21, 20, 20, 19, 19, 19, 19, 19, 18, 18, 18, 17]
x = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100]


# Bar plot of the top 20 most frequently used words
ax = plt.bar(x, top_20_freq, width=3, tick_label=top_20)
plt.xticks(rotation=-30)
plt.show()

