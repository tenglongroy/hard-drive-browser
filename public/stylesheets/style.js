function constructNav(JSONFile){
    var pTag = document.createElement("p");
    pTag.setAttribute("name", JSONFile['name']);
    pTag.setAttribute("prefix", JSONFile['prefix']);
    pTag.setAttribute("level", JSONFile['level']);
    var iconDiv = document.createElement("div");
    pTag.prepend(iconDiv);
}


function _constructNav(JSONFile, parentObject){
    var li = document.createElement("li")
}
