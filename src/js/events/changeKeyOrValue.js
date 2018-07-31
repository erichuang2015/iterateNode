function changeKeyOrValue(templateGlobals,isKey,e) {
    var $super = this;
    var thisTarget = e.target;
    var innerText = thisTarget.innerText;
    var parent = e.target.parentElement;
    var path = parent.getAttribute("data-iterate-node-path");
    if(isKey)
        $super.assignKeyFromString(path, innerText,$super.returnParamFromString(path),1);
    else{
        // number sanitation: if is NaN, is 0
        var value = ( templateGlobals.typeNode == "[object Number]" ) ? isNaN(Number(innerText)) ? 0 : Number(innerText) : innerText;
        // boolean sanitation : if is not 'true', then is false
        value = ( templateGlobals.typeNode == "[object Boolean]" ) ? ( innerText.toLowerCase() == "true" ) : value;
        if(value.toString() != thisTarget.innerText)
            thisTarget.innerText = value;
        $super.assignParamFromString(path, value);
    }
}