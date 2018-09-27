from pymongo import MongoClient
import json
import getpass
import praw


client = MongoClient('127.0.0.1', 27017)
db = client.reddit
rooturl = 'https://oauth.reddit.com/r/'
headers = {'user-agent': 'script:kMJUL_qNcpDOpA:1.0 by /u/GinkREAL'}
params = {'sort': 'best', 'raw_json': 1}


print("Please input username:", end='')
username = input()
password = getpass.getpass('Please input password:')
accessrequest = requests.post('https://www.reddit.com/api/v1/access_token', headers={
    'Authorization': 'Basic a01KVUxfcU5jcERPcEE6ajhaX2NIQ3NycFZUYjllZVhwQUxPTjR2Q3FJ',
    'User-Agent': 'script:kMJUL_qNcpDOpA:1.0 by /u/GinkREAL'},
    params={'grant_type': 'password', 'password': password, 'username': username})

if(accessrequest.status_code == 200):
    headers['Authorization'] = 'Bearer ' + accessrequest.json()['access_token']
    print("Login successful. Token = " + accessrequest.json()['access_token'])
else:
    print("Error")
    print(accessrequest.status_code)
    print(accessrequest.json())
    exit()


def rprint(tree, indent):  # print with replies
    print(("|---" * indent) + ">" + tree['data']['body'])
    if tree['data']['replies'] == '':
        return
    else:
        for branch in tree['data']['replies']['data']['children']:
            if(branch['kind'] == 't1'):
                rprint(branch, indent + 1)


def build(tree):
    mapping = {'comment': tree['data']['body']}
    debug_comments += 1
    if tree['data']['replies'] == '':
        return mapping
    else:
        replies = []
        for branch in tree['data']['replies']['data']['children']:
            if(branch['kind'] == 't1'):
                replies.append(build(branch))
                debug_comments += 1
        mapping['replies'] = replies
        return mapping


# main code
command = []
subreddit = "/"
while command[0] != "exit":
    print(">", end='')
    command = input().split()
    if command[0] == 'sub':
        print("Subreddit: " + subreddit)
    elif command[0] == 'use':
        print("Changed subreddit to: " + command[1])
        subreddit = command[1]
    elif command[0] == 'scrape':
        debug_comments = 0
        print("Requesting " + command[1])
        data = requests.get(rooturl + subreddit + "/comments/" +
                            command[1], headers=headers, params=params)
        print("Done, storing in db.")
        jdata = data.json()
        mylist = []
        for jsoncomment in jdata[1]['data']['children']:
            if(jsoncomment['kind'] == 't1'):
                mylist.append(build(jsoncomment))

        db.comments.insert_one({'title': jdata[0]['data']['children']['data']['title'],
                                'subreddit':  jdata[0]['data']['children']['data']['subreddit'],
                                'name': jdata[0]['data']['children']['data']['name'],
                                'upvote_ratio': jdata[0]['data']['children']['data']['upvote_ratio'],
                                'domain': jdata[0]['data']['children']['data']['domain'],
                                'author_fullanme': jdata[0]['data']['children']['data']['author_fullname'],
                                'score': jdata[0]['data']['children']['data']['score'],
                                'locked': jdata[0]['data']['children']['data']['locked'],
                                'author': jdata[0]['data']['children']['data']['author'],
                                'num_comments': jdata[0]['data']['children']['data']['num_comments'],
                                'url': jdata[0]['data']['children']['data']['url'],
                                'created_utc': jdata[0]['data']['children']['data']['created_utc'],

                                'article_link': jdata[0]['data']['children']['data']['id'],
                                'comments': mylist})
        print("Done storing in db." + debug_comments)
    elif command[0] == 'list':
        print("Unimplemented command")
    elif command[0] == 'autoscrape':
        print("Unimplemented command")
    else:
        print("Unknown command")
