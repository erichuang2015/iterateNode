function ITERATION (obj,path) {
    var $super = this;
    var DOMrepresentation = document.createElement("ul");
    if($super.options.renderChildren) {
        obj = $super.options.renderChildren(obj);
    }
    for (var k in obj)
        DOMrepresentation.appendChild(TEMPLATE.call($super, k, obj[k], path));

    return DOMrepresentation;
}