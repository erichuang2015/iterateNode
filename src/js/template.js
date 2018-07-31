function TEMPLATE (key,value,path){
    var options = this.options;
    var $this = this;
    var path = path.length ? path + options.separator + key : key;
    var parentPath = path.split(options.separator);
    var typeNode = Object.prototype.toString.call(value);
    /* main LI */
    var li = document.createElement("li");
    li.setAttribute("data-iterate-node-path",path);
    var thisElementSharedVars = {
        path : path,
        parentPath : parentPath,
        parent : $this.returnParamFromString.call($this,parentPath.slice(0,parentPath.length-1).join(options.separator), $this.state),
        typeNode : typeNode,
        value : value,
        key : key,
        li : li
    };
    if( options.contentEditable.drag )
        spanForDrag.call(this,thisElementSharedVars);
    spanForKey.call(this,thisElementSharedVars);
    spanForTypeof.call(this,thisElementSharedVars);
    spanSeparator.call(this,thisElementSharedVars);
    if (typeNode == "[object Object]" ||
        typeNode == "[object Array]") {
        spanCaret.call($this,thisElementSharedVars);
        if (options.contentEditable.add) {
            spanAddItem.call($this,thisElementSharedVars);
        }
    }
    else
        spanValue.call($this,thisElementSharedVars);
    /* adding delete element */
    if (options.contentEditable.delete)
        spanElementDelete.call(this, thisElementSharedVars);

    if (Object.keys(options.appendElements).length)
        for(var k in options.appendElements)
            options.appendElements[k](key,value);

    return li;
}

