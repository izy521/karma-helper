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
  url = "http://www.reddit.com/r" + url.substring(0, url.length - 5) + "/top.json";
  var request = http.get(url, function(response) {
    var json = '';
    response.on('data', function(chunk) {
      json += chunk;
    });

    response.on('end', function() {
      redditResponse = JSON.parse(json);
      var result = [];
      for(var post in redditResponse.data.children) {
        result.push(post);
      }
      res.contentType('application/json');
      res.send(redditResponse);
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
