from pymongo import MongoClient
#import json
import getpass
import praw
import datetime

client = MongoClient('127.0.0.1', 27017)
db = client.reddit
errout = open('error.log', 'w')

print("Please input username: ", end='')
username = input()
password = getpass.getpass('Please input password: ')
reddit = praw.Reddit(client_id='kMJUL_qNcpDOpA',
                     client_secret='j8Z_cHCsrpVTb9eeXpALON4vCqI',
                     user_agent='script:kMJUL_qNcpDOpA:1.0 by /u/GinkREAL',
                     username=username,
                     password=password)


def build(tree):
    mapping = {'comment': tree.body}
    replies = []
    subforest = tree.replies
    subforest.replace_more(limit=None)
    for branch in subforest:
        replies.append(build(branch))
    if len(replies) > 0:
        mapping['replies'] = replies
    return mapping


# main code
command = ['notexit']
subreddit = None
while command[0] != "exit":
    if subreddit == None:
        print("> ", end='')
    else:
        print(subreddit.display_name + "> ", end='')
    command = input().split()
    try:
        if command[0] == 'use':  # change subreddit
            print("Changed subreddit to: " + command[1])
            subreddit = reddit.subreddit(command[1])
        elif command[0] == 'scrape':  # scrape a specific article
            submission = reddit.submission(id=command[1])

            print("Doing: " + submission.title)
            forest = submission.comments
            forest.replace_more(limit=None)

            allcomments = []
            for tree in forest:
                allcomments.append(build(tree))

                db.comments.insert_one({'title': submission.title,
                                        'subreddit':  submission.subreddit.display_name,
                                        'name': submission.name,
                                        'upvotes': submission.ups,
                                        'downvotes': submission.downs,
                                        'author_fullname': submission.author_fullname,
                                        'score': submission.score,
                                        'locked': submission.locked,
                                        'author': submission.author.name,
                                        'num_comments': submission.num_comments,
                                        'url': submission.url,
                                        'created_utc': submission.created_utc,
                                        'article_id': submission.id,
                                        'archived': submission.archived,
                                        'comments': allcomments})
        elif command[0] == 'hot':  # scrapes a set amount of articles from hot
            print("TOP OF /r/" + subreddit.display_name)
            for submission in subreddit.top(limit=10):
                print("> " + submission.title)
        elif command[0] == 'auto':  # scrapes a set amount of articles from top
            for submission in subreddit.top(limit=200):
                try:
                    print("Doing: " + submission.title)

                    existingcopy = db.comments.find_one(
                        {'article_id': submission.id})
                    if existingcopy != None:
                        if existingcopy['archived']:
                            print(" Skipping due to being archived in db")
                            continue
                        print(" Updating existing record")
                        db.comments.delete_one({'_id': existingcopy['_id']})

                    print(" Loading comments (this may take awhile)")
                    forest = submission.comments
                    print(" Populating forest", end='')
                    while True:
                        try:
                            forest.replace_more(limit=50)
                            print("")
                            break
                        except PossibleExceptions:
                            print(".", end='')
                            usleep(500)
                    print(" Done, finalizing insertion")

                    allcomments = []
                    for tree in forest:
                        allcomments.append(build(tree))

                    db.comments.insert_one({'title': submission.title,
                                            'subreddit':  subreddit.display_name,
                                            'name': submission.name,
                                            'upvotes': submission.ups,
                                            'downvotes': submission.downs,
                                            'author_fullname': submission.author_fullname,
                                            'score': submission.score,
                                            'locked': submission.locked,
                                            'author': submission.author.name,
                                            'num_comments': submission.num_comments,
                                            'url': submission.url,
                                            'created_utc': submission.created_utc,
                                            'article_id': submission.id,
                                            'archived': submission.archived,
                                            'comments': allcomments})
                    print("Done")
                except Exception as e:
                    print("Error in " + submission.title)
                    print("Error in " + submission.title, file=errout)
                    print(e, file=errout)
                    errout.flush()
                    continue
            print("AUTO COMPLETE AT", end='')
            print(datetime.datetime.now())
        elif command[0] == 'touchall':  # dont use, updates all modified timestamps
            print("Unimplemented function")
        elif command[0] == 'forceupdate':  # updates all non archived rgardless of timestamp
            print("Unimplemented function")
        else:
            print("Unknown command")
    except Exception as e:
        print("===ERROR===")
        print(e)
        continue
