from pymongo import MongoClient
import praw
from praw.models import MoreComments
import datetime
import time
#from neutral_predictive import predict_sentiment, predict_all

# Worker thread for the AI.

client = MongoClient('127.0.0.1', 27017)
db = client.reddit
reddit = praw.Reddit(client_id='qgi95T7D7DJiJg',
                     client_secret='EZgrhtxTqOx13W4-TGQuSes7Z5Q',
                     user_agent='web:qgi95T7D7DJiJg:1.0 by /u/GinkREAL')


def process(article):
    print("Received job: " + article)
    post = reddit.submission(id=article)
    print(post.title)
    print(post.num_comments)

    comments = post.comments
    print("Replacing forest")
    comments.replace_more(limit=12)

    print("Turning it into list")
    comments = comments.list()
    print(len(comments))
    commentnum = 0
    score = 0

    #result = predict_all(post.title, comments)
    #print(result)
    result = {
        'target': "dummytarget",
        'article': article,
        'dateCreated': datetime.datetime.utcnow(),
        'commentsProcessed': commentnum,
        'commentsTotal': post.num_comments,
        'commentsFavoring': 400,
        'commentsNeutral': 650,
        'commentsAgainst': 300
    }

    db.results.insert_one(result)
    print("Done")

# main code
while(True):  # not optimal but whatever
    if(db.jobs.count_documents({}) == 0):
        time.sleep(2)
        continue
    obj = db.jobs.find_one()
    process(obj['article'])
    db.jobs.delete_one(obj)
