var express = require('express');
var browseFile = express();

var fs = require('fs');
var path = require('path');

//var rootPath = path.normalize("D:\\");
var rootPath = '';

/*if (process.argv.length <= 2) {
    console.log("Usage: " + __filename + " path/to/directory");
    process.exit(-1);
}*/
if (process.argv.length > 2) {
	rootPath = process.argv[2];
}
else{	//process.argv.length <= 2, initial path not given
    console.log("Usage: " + __filename + " path/to/root/directory");
    process.exit(-1);
}

try{
	fs.accessSync(rootPath);
}
catch(err){
	console.log("The initial path does not exist: %s", rootPath);
	console.log(err)
    process.exit(-1);
}

var rootStructure = {};




// objectName -> path that is passed from previous function call
function _DFSTraverse(objectName, prefix, level){
	var currentPath = path.join(prefix, objectName);
	if(fs.statSync(currentPath).isFile()){
		return {'name': objectName, 'type': path.extname(objectName), 'desc': null, 'prefix': prefix, 'level': level};
	}
	var currentList = fs.readdirSync(currentPath);
	var currentStructure = {'name': objectName, 'type': 'folder', 'desc': {}, 'prefix': prefix, 'level': level};
	if(currentList.length == 0){
		currentStructure['desc'] = null;
		return currentStructure;
	}
	
	for(var i = 0; i<currentList.length; i++){
		var result = _DFSTraverse(currentList[i], currentPath, level+1);
		currentStructure['desc'][currentList[i]] = result;
	}
	return currentStructure;
};

/* wrapper function, to wrap the recursion
   return the structure for rootPath
*/
function DFSTraverse(targetPath){
	var temp = path.parse(targetPath);
	return _DFSTraverse(temp['base'], temp['dir'], 1);
};

// use breadth first search to recursively print this tree-like JSON
function _printStructure(currentDict, preSpace){
	if(currentDict['name'] == 'node_modules' || currentDict['name'] == '.git' )
		return;
	/*if(currentDict['name'] == 'public'){
		console.log(JSON.stringify(currentDict['desc']));
	}*/
	console.log();
	console.log(preSpace+'{\n'+preSpace+'  name:'+currentDict['name']);
	console.log(preSpace+'  type:'+currentDict['type']);
	console.log(preSpace+'  level:'+currentDict['level']);
	console.log(preSpace+'  prefix:'+currentDict['prefix']);
	if(currentDict['desc'] != null){
		console.log(preSpace+'  desc:');
		Object.keys(currentDict['desc']).forEach(function(key) {
			//console.log(key);
			_printStructure(currentDict['desc'][key], preSpace+'  ');
		});
	}
	console.log(preSpace+'}');
}

function printStructure(){
	return _printStructure(DFSTraverse(rootPath), "  ");
}






// check if the given path is legit
function checkPath(targetPath){
	try{
		fs.accessSync(targetPath);
	}
	catch(err){
		//console.log("Given path does not exist");
	    //process.exit(-1);
	    return false;
	}
	return true;
}

/* update the current rootPath to the given path.
   if successfully updated, update the structure as well.
*/
function updatePath(newPath){
	if(checkPath(newPath)){
		console.log('Path updated from %s to %s', rootPath, newPath);
		rootPath = newPath;
		return getUpdatedStructure();
	}
	else{
		console.log("Given path does not exist");
		return null;
	}
}

function showRootPath(){
	return rootPath;
};

function getUpdatedStructure(){
	return DFSTraverse(rootPath);
};

function getFileAjax(objectName, prefix){
	var realPath = path.join(prefix, objectName);
	if(!checkPath(realPath)){
		return false;
	}
	fs.readFile()
};

function getStructureAjax(objectName, prefix, level){
	if(!checkPath(path.join(prefix, objectName))){
		return false;
	}
	var realPrefix = prefix.replace(rootPath, '');
	var descKeys = realPrefix.split(path.sep).filter(function(item){
		return item != '';
	});
	descKeys.push(objectName);
	//console.log(descKeys);
	var nextStructure = rootStructure;
	for(var i = 0; i<descKeys.length && nextStructure!= null; i++){
		nextStructure = nextStructure['desc'];
		nextStructure = nextStructure[descKeys[i]];
	}
	//console.log(nextStructure);
	return nextStructure;
};

// left strip a specified char
function trimLeft(string, charToRemove) {
    while(string.charAt(0)==charToRemove) {
        string = string.substring(1);
    }
};

function getRootStructure(){
	return rootStructure;
}


rootStructure = DFSTraverse(rootPath);

//printStructure();
//getStructureAjax('stylesheets', 'C:\\Users\\tengl\\Node\\hard-drive-browser\\public', 100);


module.exports = browseFile;
module.exports = {
	'printStructure': printStructure,
	'DFSTraverse': DFSTraverse,
	'showRootPath': showRootPath,
	'updatePath': updatePath,
	'getUpdatedStructure': getUpdatedStructure,
	'getRootStructure': getRootStructure,
	'getStructureAjax': getStructureAjax
};
//module.exports = app;
