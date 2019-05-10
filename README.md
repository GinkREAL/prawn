# PRAWN
This repo contains all the needed information for our thesis, except for the thesis paper itself.
It has scripts to scrape data, helper functions to prepare the database, and the webserver which gathers data from volunteers who label the comments. Also has.... damn I don't even wanna explain anymore this project is complex af.


### General Requirements
You need these running on the system already.
```
MongoDB server, port 27017
Node.js
npm
Angular-JS ng CLI (get this one via npm)
Python3 (and pip)
Java (tested on 8)

```
MongoDB be run on any port but you need to change ports in reddit.py and the webserver's backend/src/main/resources/application-dev.properties and application-prod.properties. Best to leave it at 27017

### Database (/db)
If you want to run a local instance of the AI simply for testing purposes, you don't need this at all. MongoDB is still required though.
If you want to do everything from scratch and gather labels from your own users, follow the first section.
If you want to load the included articles and labels to obtain the dataset of the researchers for tweaking the AI model, follow the second section.

#### Setup Database for Label Gathering
First you need to scrape reddit, run reddit.py and run these commands

```
connect
use <subreddit>
auto (this will take a really long time)
truncate 5000 (optional)
heatmap
target
```

These set of commands first connect to reddit's API, then automatically scrapes articles from a specific subreddit. Then optionally truncate all those articles with 5000 comments or less to improve the quality of the articles. Heatmaps also improve the quality of the comments the webserver returns by generating a directory listing of comments with the most upvotes. Finally, target will help you add the objects of interest of which you want to measure the stance of the comment toward this particular object. Note that all of these is mandatory except for truncate.

#### Setup Database for Tweaking AI Model
Theoretically you can do this section and the previous section, but I haven't tried. This is only for those who would like to tweak the AI model found in /ai. From the prawn folder:

```
cd db
mongoimport --collection=articles --database=reddit ./articles
mongoimport --collection=labels --database=reddit ./labels
```

Information about how the information is structured can be found in this repo's wiki. Naturally the users table will not be uploaded to this repo, however for cohen's kappa purposes the labeller name is available.


### Frontend (/frontend)
Once the database has been setup and ready for deployment, we can now compile the webserver. This is only necessary if you want to be able to collect labels from your labellers. If load the included db of labels and are only looking to tweak the AI model, you can actually skip this step.  Firstly, you need to compile the AngularJS frontend. Starting from the prawn root directory, run these commands in order:

```
cd frontend
npm install (if you don't have angular dependencies yet)
ng build --prod
```

This will output a dist/my-app folder, copy the contents of this folder exactly as is into
prawn/backend/src/main/resources/static/.

### Backend (/backend)
Run these commands.

```
cd backend
./gradlew build (don't forget to change active profile to 'dev' in src/main/resources/application.properties)
```

This will output build/libs/prawn-1.0.jar. The server is now ready and will connect to the local mongodb and facilitate labelling and assist the AI worker and extension. If you would like to compile the prod version instead which is running on https, please check the wiki for more information on how to do so.

### Extension (/extension)
The extension is already precompiled, however should you want to build it, you need web-ext.

```
cd extension
web-ext build (Don't forget to comment the correct baseURL in prawnz.js for dev or prod)
```

This outputs a zip file in web-ext artifacts, send it to mozilla for the extension to be signed. (Don't do that, signed version is already bundled)

### AI (/ai)
The most questionable decision in this project, we have a separate script do the AI work because doing AI in java is a pain in the ass. Run it using python3. I have no idea if python2 will work and theoretically, it shouldn't. 

#### Python Library Prerequisites

```
pip3 install nltk
pip3 install spacy
pip3 install pymongo
pip3 install keras
pip3 install tensorflow
pip3 install rake_nltk
pip3 install praw
python3 -m spacy download en_core_web_md
```

Also in a python3 console

```
import nltk
nltk.download('wordnet')
```

#### DB Library Prerequisites
Load the vocab and dataset files into the mongodb

```
cd ai
mongoimport --collection=dataset --db=reddit ./dataset
mongoimport --collection=vocab --db=reddit ./vocab
```

#### Running
Run this alongside backend

```
cd ai
python3 worker.py
```
