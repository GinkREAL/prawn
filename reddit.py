from pymongo import MongoClient
from operator import itemgetter
import traceback
import getpass
import praw
import datetime

# Comprehensive tool to scrape reddit, add targets and simulataneously generate heatmaps

client = MongoClient('127.0.0.1', 27017)
db = client.reddit
errout = open('error.log', 'w')
reddit = None


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


def goOnline():
    print("Please input username: ", end='')
    username = input()
    password = getpass.getpass('Please input password: ')
    reddit = praw.Reddit(client_id='kMJUL_qNcpDOpA',
                         client_secret='j8Z_cHCsrpVTb9eeXpALON4vCqI',
                         user_agent='script:kMJUL_qNcpDOpA:1.0 by /u/GinkREAL',
                         username=username,
                         password=password)


def generateHeatmaps():
    print("Dropping heatmaps...")
    db.heatmaps.drop()
    progress = 0
    total = str(db.articles.estimated_document_count())
    for article in db.articles.find():
        print("Progress: " + str(progress + 1) + "/" + total +
              " Comments: " + str(article['num_comments']))
        listing = []
        for x in range(len(article['comments'])):
            heatmapstage1(article['comments'][x], listing, str(x))
        final = {
            'article_id': article['_id'],
            'heatmap': sorted(listing, key=itemgetter('score'), reverse=True)
        }
        db.heatmaps.insert_one(final)
        progress += 1


def heatmapstage1(forest, listing, comment_address):
    listing.append({
        'comment_address': comment_address,
        'score': forest['score']
    })
    if 'replies' in forest:
        for z in range(len(forest['replies'])):
            heatmapstage1(forest['replies'][z], listing,
                          comment_address + "," + str(z))
    return


def tagArticles():
    for article in db.articles.find():
        if 'targets' in article:
            continue
        else:
            print("Labeling>" + article['title'])
            inp = ""
            targets = []
            while inp != 'ok':
                print(">> ", end='')
                inp = input()
                if inp == 'cancel':
                    return
                elif inp == 'preview':
                    for i in range(10):
                        preview = article['comments'][i]
                        print("=====")
                        print(preview['comment'])
                    continue
                elif inp == 'undo':
                    del targets[-1]
                elif inp == 'ok':
                    break
                else:
                    targets.append(inp)
                print(targets)
            db.articles.find_one_and_update({'_id': article['_id']}, {
                                            '$set': {'targets': targets}})


# main code
command = ['notexit']
subreddit = None
print("PRAWn helper tool.")
print("'help' for help")
while command[0] != "exit":
    if subreddit is None:
        print("> ", end='')
    else:
        print(subreddit.display_name + "> ", end='')
    command = input().split()
    try:
        if command[0] == 'use':  # change subreddit
            if(reddit is None):
                print("Please go online first ('connect')")
            print("Changed subreddit to: " + command[1])
            subreddit = reddit.subreddit(command[1])
        elif command[0] == 'connect':
            goOnline()
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
        elif command[0] == 'heatmap':  # generates heatmaps
            generateHeatmaps()
        elif command[0] == 'target':  # adds targets for articles
            print("Targeting helper module.")
            print("Commands:")
            print("preview, undo, cancel, ok")
            print("anything else will be added as a target")
            print("once a targetlist has been confirmed, it can")
            print("only be removed  manually through mongodb")
            tagArticles()
        elif command[0] == 'truncate':
            threshold = int(command[1])
            result = db.articles.delete_many(
                {'num_comments': {'$lt': threshold}})
            print("Deleted: " + str(result.deleted_count))
        elif command[0] == 'help':
            print("=====PRAWn Helper Tool======")
            print("connect => connects to reddit, necessary for all scraping functions")
            print("use => sets the current subreddit, necessary after connecting")
            print(
                "scrape <reddit_id> => scrapes a reddit article based on ID found in url")
            print("hot => scrapes top 25 of current subreddit's hot listing")
            print("auto => scrapes top 500 of all time of current subreddit")
            print("touchall => updates modified timestamps so nothing gets updated")
            print("heatmap => generates a fresh heatmap to be used by the database")
            print("target => adds target for articles")
            print("truncate <threshold> => deletes articles under this comment amount")
            print("============================")
        else:
            print("Unknown command")
    except Exception as e:
        print("===ERROR===")
        print(traceback.format_exc())
        continue
