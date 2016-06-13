'use strict';

var stat = require('jsregress');
var express = require('express');
var http = require('http');

var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.set('json spaces', 2);

app.get('/', function(req,res,next) {
  res.send("I'm working!");
});

app.get('/*.json', function(req,res,next) {
  var results = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  var top = 0;
  var topScore = 0;

  res.setHeader('Content-Type', 'application/json');
  res.contentType('application/json');

  var url = req.url;
  var redditResponse;
  url = "http://www.reddit.com/r" + url.substring(0, url.length - 5) + "/hot.json?limit=100";

  var request = http.get(url, function(response) {
    var json = '';
    response.on('data', function(chunk) {
      json += chunk;
    });

    response.on('end', function() {
      redditResponse = JSON.parse(json);
      if(redditResponse.error) {
        res.send({error: redditResponse.error});
      }
      else {
        //Put in scores by hour
        for(var i = 0; i < redditResponse.data.children.length; i++) {
          var post = redditResponse.data.children[i];
          var date = new Date(post.data.created_utc*1000);
          results[date.getHours()] += post.data.score;
        }
        //ANOVA to be here
        //Find best time to post
        for(var i = 0; i < results.length; i++) {
          if(results[i] > topScore) {
            topScore = results[i];
            top = i;
          }
        }
        res.send({result: results, best: top, bestScore: topScore});
      }
    })
  });
});

var server = app.listen(process.env.PORT || '8080', function () {
  console.log('App listening on port %s', server.address().port);
  console.log('Press Ctrl+C to quit.');
});
