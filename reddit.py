from pymongo import MongoClient
import json
import requests


client = MongoClient('127.0.0.1', 27017)
db = client.reddit
rooturl = 'https://oauth.reddit.com/r/nottheonion/comments/'
headers = {'user-agent': 'script:kMJUL_qNcpDOpA:1.0 by /u/GinkREAL'}
params = {'sort': 'best', 'raw_json': 1}
remaining = 300


print("Please input username:", end='')
username = input()
print("Please input password:", end='')
password = input()
accessrequest = requests.post('https://www.reddit.com/api/v1/access_token', headers={
    'Authorization': 'Basic a01KVUxfcU5jcERPcEE6ajhaX2NIQ3NycFZUYjllZVhwQUxPTjR2Q3FJ'}, 
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
    if tree['data']['replies'] == '':
        return mapping
    else:
        replies = []
        for branch in tree['data']['replies']['data']['children']:
            if(branch['kind'] == 't1'):
                replies.append(build(branch))
        mapping['replies'] = replies
        return mapping


# main code
print("Please input nottheonion article link: ", end='')
article_link = input()

print("Requesting...")
data = requests.get(rooturl + article_link, headers=headers, params=params)
print("Done")

if(data.status_code == 401):
    print("Refresh token")
jdata = data.json()
# print(type(jdata[1]))
# db.comments.insert_one(jdata[1])

mylist = []
for jsoncomment in jdata[1]['data']['children']:
    if(jsoncomment['kind'] == 't1'):
        mylist.append(build(jsoncomment))

db.comments.insert_one({'comments': mylist})
