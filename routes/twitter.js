var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('config');

var c = new Buffer(config.get('twitter.apiKey'), 'base64');
var apiKey = c.toString();

//search
// https://api.twitter.com/1.1/search/tweets.json

//authorize
//  https://api.twitter.com/oauth/authorize

router.get('/', function(req, res){
   res.send('Pick a method.');
});

router.get('/authorize', function(req, res){
   res.send(apiKey);
});

//export this router to use in our index.js
module.exports = router;