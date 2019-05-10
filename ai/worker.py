from pymongo import MongoClient
import praw
from praw.models import MoreComments
import datetime
import time
from neutral_predictive import predict_sentiment, predict_all

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
    comments.replace_more(limit=12)
    comments = comments.list()
    print(len(comments))

    output = predict_all(post.title, comments)
    result = {
        'article' : article,
        'dateCreated': datetime.datetime.utcnow(),
        'commentsTotal': post.num_comments,
        'results' : []
    }
    for topic in output.keys():
        result['results'].append({
            'target': topic,
            'commentsFavoring': output[topic]['favor'],
            'commentsNeutral': output[topic]['none'],
            'commentsAgainst': output[topic]['against'] 
        })
    print(result)

    db.results.replace_one({"article": article}, result, True)
    print("Done")

# main code
while(True):  # not optimal but whatever
    if(db.jobs.count_documents({}) == 0):
        time.sleep(2)
        continue
    obj = db.jobs.find_one()
    process(obj['article'])
    db.jobs.delete_one(obj)
