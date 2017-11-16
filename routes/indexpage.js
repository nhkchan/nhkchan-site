var express = require('express');
var router = express.Router();
var config = require('config');
var parseurl = require('parseurl');
var session = require('express-session');
var sqlite3 = require('sqlite3');


router.use(session({
  secret: 'nhkchan1',
  name: 'nhkchanSesId',
  resave: false,
  saveUninitialized: true,
  maxAge: 6000
}));

router.get('/', function(req, res){

	var session = req.session;
	console.log(session);
	/*
	if (session.isLoggedOn == 1) {
		res.render('index2', {headers1: "NHKchan", usernamelogin: session.username});
	}
	else {
		res.render('index', {headers1: "NHKchan"});	
	}
	*/
	res.render('index', {headers1: "NHKchan"});	
});

router.get('/login', function(req, res){

	if (req.session.isLoggedOn) {
		res.redirect(302, '/');
	}
	else {
		console.log(req.session);
		res.render('signin');
	}
});

router.post('/login', function(req, res){
	console.log(req.body);
	if (req.session && req.body.username && req.body.password) {
		console.log("cookie exists");
		var db = new sqlite3.Database('db/nhkchan');
		db.get('SELECT * FROM USER_CREDENTIALS where USERNAME = $user', {$user: req.body.username}, function(err, row){

			if (err){
				console.log(err);
				res.json({'nhkchanStat': 'Fail', 'statReason': 'System Error'});
			}
			else if (row) {

				var dpw = new Buffer(row.PASSWORD, 'base64').toString('ascii');
				if (req.body.password == dpw) {
					console.log('login successful');
					req.session.isLoggedOn = 1;
					req.session.username = req.body.username;
					res.json({'nhkchanStat': 'Success', 'statReason': 'login successful'});
				}
				else {
					if (req.session.pwAttempt) {
						req.session.pwAttempt = req.session.pwAttempt + 1;
					}
					else {
						req.session.pwAttempt = 1;
					}
					res.json({'nhkchanStat': 'Fail', 'statReason': 'Password Incorrect'});
				}

				console.log(row);
			}
			else {
				console.log('no records');
				res.json({'nhkchanStat': 'Fail', 'statReason': 'no user/pw found'});
			}
		});
		db.close();
		console.log(req.session);
	}
	else {
		//res.redirect(404, 'http://192.168.1.159:8080/404.html');
		res.json({'nhkchanStat': 'Fail'});
	}
});

router.get('/register', function(req, res){
	
	res.render('register');

	/*
	if (req.session.isLoggedOn) {
		res.redirect(302, 'http://192.168.1.159:8080/');
	}
	else {
		console.log(req.session);
		res.render('signin');
	}
	*/
});

//export this router to use in our index.js
module.exports = router;
