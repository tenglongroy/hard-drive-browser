var path = require('path');
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

/* for Ajax call, return specified file's data */
router.get('/ajax-show-file', function(req, res, next) {
	var objectName = req.query.objectName;
	var fileExtension = path.extname(objectName).toLowerCase();
	var videoList = ['mp4', 'm4v', 'mpe', 'rmvb', 'rm', 'mkv', 'mov', 'wmv', 'flv', 'avi'];
	var imageList = ['png', 'jpg', 'jpeg', 'jpe', 'bmp', 'tif', 'tiff', 'gif'];
	var documentList = ['txt', 'pdf', ];
	var audioList = [];
	if(videoList.indexOf(fileExtension) >= 0){
		getvideoAjax(req, res);
	}
	else if(imageList.indexOf(fileExtension) >= 0){
		getFileAjax(req, res);
	}
	else if(documentList.indexOf(fileExtension) >= 0){
		getFileAjax(req, res);
	}
	else{
		getFileAjax(req, res);
	}
	next();
  res.end();
});

module.exports = router;
