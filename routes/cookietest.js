var express = require('express');
var router = express.Router();
var config = require('config');
var parseurl = require('parseurl')
var session = require('express-session')

router.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

router.get('/', function(req, res){
	//console.log(res);
	console.log(req);
   res.send(req.sessionID);
});

//export this router to use in our index.js
module.exports = router;