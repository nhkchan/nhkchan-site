var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
   res.send('Pick a method.');
});

router.post('/search', function(req, res){
   res.send('Search Anime or Manga');
});

//export this router to use in our index.js
module.exports = router;