# karma-helper
A reddit point scorer using Node.js.

Demo: [karma-helper.herokuapp.com](karma-helper.herokuapp.com)

Frontend: [http://h313.github.io/karma-helper](http://h313.github.io/karma-helper/)

##Setup##
In order to get this working, there's literally one command you need (if you have node.js installed) aside from installing the dependencies, which are:

* [Express.js](http://expressjs.com/)
* [JSRegress](https://github.com/cjqed/jsRegress)

After installing these, just use the command

    node app.js

within the project dir. Go to:

    localhost/8080
    
and the page should say, "I'm working!"

##How do I even use this!?##
Here's a very quick rundown of how to use it:

1. Get the name of your subreddit.
2. Put it in like this: karma-helper.herokuapp.com/pcmasterrace.json
3. You'll have a JSON with three variables: result, best, and bestScore.

result gives you the total scores of the top 100 hot posts of the subreddit by the hour. Best shows the best hour to post, in UTC, and bestScore is the karma gained by posts posted during that period.

##Front End##
[Is here](https://github.com/h313/karma-helper/tree/gh-pages)
