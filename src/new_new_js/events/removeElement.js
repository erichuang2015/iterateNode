function removeElement(templateGlobals,e){
    var parent = e.target.parentElement;
    var path = parent.getAttribute("data-iterate-node-path");
    this.deleteParamFromString(path);
}