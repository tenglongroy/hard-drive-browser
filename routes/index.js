var express = require('express');
var router = express.Router();

var browseFile = require('./browse-file');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* for Ajax call, show specified path */
router.get('/show-path', function(req, res, next) {
  res.render('index', { currentFolder: 'qwetfgdfbk;n qeh oeh rar' });
});

module.exports = router;
