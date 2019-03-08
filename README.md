# PRAWN
This repo contains all the needed information for our thesis, except for the thesis paper itself.
It has scripts to scrape data, helper functions to prepare the database, and the webserver which gathers data from volunteers who label the comments.

### Requirements
You need these running on the system already.
'''
MongoDB server, port 27017
npm
Angular-JS ng CLI
'''
MongoDB be run on any port but you need to change ports in reddit.py and the webserver's backend/src/main/resources/application-dev.properties and application-prod.properties

### Setup steps
First you need to scrape reddit, run reddit.py and run these commands

'''
connect
use <subreddit>
auto (this will take a really long time)
truncate 5000 (optional)
heatmap
target
'''

These set of commands first connect to reddit's API, then automatically scrapes articles from a specific subreddit. Then optionally truncate all those articles with 5000 comments or less to improve the quality of the articles. Heatmaps also improve the quality of the comments hte webserver returns by generating a directory listing of comments with the most upvotes. Finally, target will help you add the objects of interest of which you want to measure the stance of the comment toward this particular object. Note that all of these is mandatory except for truncate.

Once the database has been setup and ready for deployment, we can now compile the webserver. Firstly, you need to compile the AngularJS frontend. Starting from the prawn root directory, run these commands in order:

'''
cd frontend
ng-build --prod
'''

This will output a dist/my-app folder, copy the contents of this folder exactly as is into
prawn/backend/src/main/resources/static/. Then go back to the main prawn folder and run these commands: 

'''
cd backend
./gradlew build (don't forget to change active profile to 'prod' in src/main/resources/application.properties
'''

This will output build/libs/prawn-1.0.jar. The server is now ready and will connect to the local mongodb and facilitate labelling.
