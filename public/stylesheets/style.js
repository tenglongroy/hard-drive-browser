var videoList = ['mp4', 'm4v', 'mpe', 'rmvb', 'rm', 'mkv', 'mov', 'wmv', 'flv', 'avi'];
var imageList = ['png', 'jpg', 'jpeg', 'jpe', 'bmp', 'tif', 'tiff', 'gif'];
var documentList = ['txt', 'pdf' ];

function constructNav(JSONFile){
    var pTag = document.createElement("p");
    pTag.setAttribute("name", JSONFile['name']);
    pTag.setAttribute("prefix", JSONFile['prefix']);
    pTag.setAttribute("level", JSONFile['level']);
    pTag.addClass('close');

    var iconDiv = document.createElement("span");
    pTag.appendChild(iconDiv);
    var typeDiv = createTypeDiv(JSONFile['type']);
    pTag.appendChild(typeDiv);

    if(JSONFile['desc'] != null){
        pTag.addClass('dropdown')
        _constructNav(JSONFile['desc'], pTag);
    }

    return pTag;
}


function _constructNav(JSONFile, parentObject){
    var ul = document.createElement("ul");
    var li = document.createElement("li");



    parentObject.addClass(li);
    

    if(JSONFile['desc'] != null){
        pTag.addClass('dropdown')
        _constructNav(JSONFile['desc'], pTag);
    }
}



function createTypeDiv(type){
    var typeDiv = document.createElement("div");
    if(type == 'folder'){
        typeDiv.addClass('folder');
    }
    else if(videoList.indexOf(type) >= 0){
        typeDiv.addClass('video');
    }
    else if(imageList.indexOf(type) >= 0){
        typeDiv.addClass('image');
    }
    else if(documentList.indexOf(type) >= 0){
        typeDiv.addClass('document');
    }
    else{
        typeDiv.addClass('no-type');
    }
}
