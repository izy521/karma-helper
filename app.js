'use strict';

var stat = require('jsregress');
var express = require('express');
var r = require("nraw");

var app = express();
var Reddit = new r("Karma Helper");

app.set('json spaces', 2);

app.get('/?.json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  var url = req.url;
  url = url.substring(0, str.length - 5);
  Reddit.subreddit(url).hot().exec(function(data){
    
  });

  res.json({ a: 1 });
});

var server = app.listen(process.env.PORT || '8080', function () {
  console.log('App listening on port %s', server.address().port);
  console.log('Press Ctrl+C to quit.');
});
