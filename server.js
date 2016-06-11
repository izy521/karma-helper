'use strict';

var stat = require('jsregress');
var express = require('express');
var unirest = require('unirest');
var http = require('http');

var app = express();

app.set('json spaces', 2);

app.get('/*.json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
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
      //Put in scores by hour
      var results = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      for(var i = 0; i < redditResponse.data.children.length; i++) {
        var post = redditResponse.data.children[i];
        var date = new Date(post.data.created_utc*1000);
        results[date.getHours()] += post.data.score;
      }
      //ANOVA
      stat.anova({type: 'oneway', vals: results}, function(obj) {
        obj.
      });
      //Find best time to post
      var top = 0;;
      var topScore = 0;
      for(var i = 0; i < results.length; i++) {
        if(results[i] > topScore) {
          topScore = results[i];
          top = i;
        }
      }
      res.contentType('application/json');
      res.send({result: results, best: top, bestScore: topScore});
    })
  });
  request.on('error', function(err) {
    console.log(err);
  });
});

var server = app.listen(process.env.PORT || '8080', function () {
  console.log('App listening on port %s', server.address().port);
  console.log('Press Ctrl+C to quit.');
});
