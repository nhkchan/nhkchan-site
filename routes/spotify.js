var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('config');

var c = new Buffer(config.get('spotify.clientId'), 'base64');
var s = new Buffer(config.get('spotify.clientSecret'), 'base64');

var clientId = c.toString();
var clientSecret = s.toString();

//Authorize
// https://accounts.spotify.com/authorize

//base64

/*
var b = new Buffer('JavaScript');
var s = b.toString('base64');
// SmF2YVNjcmlwdA==

var b = new Buffer('SmF2YVNjcmlwdA==', 'base64')
var s = b.toString();
// JavaScript
*/

router.get('/', function(req, res){
   res.send('Pick a method.');
});

router.get('/authorize', function(req, res){
	var str = clientId + '<br />' + clientSecret;
   res.send(str);
});

//export this router to use in our index.js
module.exports = router;