var express = require('express');
var router = express.Router();

var browseFile = require('./browse-file');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* for first visit, show root structure */
router.get('/show-path', function(req, res, next) {
  res.render('index', { currentFolder: 'qwetfgdfbk;n qeh oeh rar' });
});

/* for Ajax call, show specified path structure */
router.get('/ajax-show-path', function(req, res, next) {
  res.render('index', { currentFolder: 'qwetfgdfbk;n qeh oeh rar' });
});

module.exports = router;
