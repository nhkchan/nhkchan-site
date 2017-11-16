var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var index = require('./routes/indexpage.js');
var ttc = require('./routes/ttc.js');
var mal = require('./routes/mal.js');
var spotify = require('./routes/spotify.js');
var twitter = require('./routes/twitter.js');
var cookietest = require('./routes/cookietest.js');

app.set('view engine', 'pug')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/js', express.static(path.join(__dirname, 'public/js')));
app.use('/fonts', express.static(path.join(__dirname, 'public/fonts')));
app.use('/', index);
app.use('/ttc', ttc);
app.use('/mal', mal);
app.use('/spotify', spotify);
app.use('/twitter', twitter);
app.use('/cookietest', cookietest);

app.listen(80);
	
