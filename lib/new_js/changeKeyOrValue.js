"use strict";

function changeKeyOrValue(e) {
    if (!e.target.hasAttribute("contenteditable")) return;
    var thisTarget = e.target;
    var thisParent = thisTarget.parentElement;
    var innerText = thisTarget.innerText;
    var path = thisParent.getAttribute('data-iterate-node-path');
    var isKey = thisTarget.classList.contains("iterate-node__key");
    var isValue = thisTarget.classList.contains("iterate-node__value");
    var typeNode = Object.prototype.toString.call(returnParamFromString(path, this.state));

    if (isKey) assignKeyFromString(path, this.state, innerText);
    if (isValue) {
        // number sanitation: if is NaN, is 0
        var value = typeNode == "[object Number]" ? isNaN(Number(innerText)) ? 0 : Number(innerText) : innerText;
        // boolean sanitation : if is not 'true', then is false
        value = typeNode == "[object Boolean]" ? innerText.toLowerCase() == "true" : value;
        if (value.toString() != thisTarget.innerText) thisTarget.innerText = value;
        assignParamFromString(path, this.state, value);
    }
}