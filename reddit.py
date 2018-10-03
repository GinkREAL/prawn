from pymongo import MongoClient
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
    mapping = {'comment': tree.body,
               'created_utc': tree.created_utc,
               'distinguished': tree.distinguished,
               'edited': tree.edited,
               'comment_id': tree.id,
               'score': tree.score,
               'stickied': tree.stickied,
               }

    try:
        mapping['author_fullname'] = tree.author_fullname
        mapping['author'] = tree.author.name
    except:
        #print("     Author of this comment has been deleted", file=errout)
        mapping['author_fullname'] = '[deleted]'
        mapping['author'] = '[deleted]'

    replies = []
    subforest = tree.replies
    subforest.replace_more(limit=None)
    for branch in subforest:
        replies.append(build(branch))
    if len(replies) > 0:
        mapping['replies'] = replies
    return mapping


def updatetimestamps():
    db.articles.update_many(
        {}, {'$set': {'last_modified': datetime.datetime.utcnow()}})


def scrape(submissions):
    for submission in submissions:
        try:
            print("Doing: " + submission.title)
            existingcopy = db.articles.find_one({'article_id': submission.id})
            if existingcopy != None:
                if existingcopy['archived']:
                    print("     Skipping due to being archived in db")
                    continue
                if existingcopy['last_modified'] + datetime.timedelta(7) > datetime.datetime.utcnow():
                    print("     Skipping due to last update being less than 7 days ago")
                    continue
                print("     Updating existing record")
                db.articles.delete_one({'_id': existingcopy['_id']})

            print("     Loading comments (this may take awhile) = " +
                  str(submission.num_comments))
            forest = submission.comments
            print("     Populating forest", end='')
            while True:
                try:
                    forest.replace_more(limit=50)
                    print("")
                    break
                except PossibleExceptions:
                    print(".", end='')
                    usleep(500)
            print("     Done, finalizing insertion")

            allcomments = []
            for tree in forest:
                allcomments.append(build(tree))

            final = {'title': submission.title,
                     'subreddit':  submission.subreddit.display_name,
                     'name': submission.name,
                     'upvotes': submission.ups,
                     'downvotes': submission.downs,
                     'score': submission.score,
                     'locked': submission.locked,
                     'num_comments': submission.num_comments,
                     'url': submission.url,
                     'created_utc': submission.created_utc,
                     'last_modified': datetime.datetime.utcnow(),
                     'article_id': submission.id,
                     'archived': submission.archived,
                     }

            try:
                final['author_fullname'] = submission.author_fullname
                final['author'] = submission.author.name
            except:
                print("     Author of this article has been deleted", file=errout)
                final['author_fullname'] = '[deleted]'
                final['author'] = '[deleted]'

            final['comments'] = allcomments

            db.articles.insert_one(final)
            print("Done")
        except Exception as e:
            print("Error in \"" + submission.title + "\"")
            print("Error in \"" + submission.title + "\"", file=errout)
            print(e, file=errout)
            errout.flush()
            continue


# main code
command = ['notexit']
subreddit = None
while command[0] != "exit":
    if subreddit is None:
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
            scrape([submission])
        elif command[0] == 'hot':  # scrapes a set amount of articles from hot of current subreddit
            starttime = datetime.datetime.utcnow()
            scrape(subreddit.hot(limit=25))
            print("Finished: ", end='')
            print(datetime.datetime.now())
            print("Elapsed->", end='')
            print(datetime.datetime.utcnow() - starttime)
        elif command[0] == 'auto':  # scrapes a set amount of articles from top of current subreddit
            starttime = datetime.datetime.utcnow()
            scrape(subreddit.top(limit=500))
            print("Finished: ", end='')
            print(datetime.datetime.now())
            print("Elapsed->", end='')
            print(datetime.datetime.utcnow() - starttime)
        elif command[0] == 'touchall':  # dont use, updates all modified timestamps
            updatetimestamps()
        elif command[0] == 'forceupdate':  # updates all non archived rgardless of timestamp
            print("Unimplemented function")
        else:
            print("Unknown command")
    except Exception as e:
        print("===ERROR===")
        print(e)
        continue
