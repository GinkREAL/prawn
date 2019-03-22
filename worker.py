from pymongo import MongoClient
import praw
import datetime
import time

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


# main code
while(True):
    if(db.jobs.count_documents({}) == 0):
        time.sleep(2)
        continue
    obj = db.jobs.find_one()
    process(obj['article'])
    db.jobs.delete_one(obj)
