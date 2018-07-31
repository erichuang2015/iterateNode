function elementRoot(){
    var options = this.options;
    var $this = this;
    var path = "";
    var typeNode = Object.prototype.toString.call({});
    var templateGlobals = {
        path : path,
        typeNode : typeNode,
        value : this.state
    };

    /* main LI */
    var ul = document.createElement("ul");
    var li = templateGlobals.li = document.createElement("li");
    li.setAttribute("data-iterate-node-path","");
    li.classList.add("iterate-node__root");
    if (options.contentEditable.add) {
        spanAddItem.call($this,templateGlobals);
    }
    ul.appendChild(li);
    return ul;
}