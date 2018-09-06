function deleteElement(li){
    var parentElm = li.parentElement.parentElement[defaults.dataKeyOnDOM].value;
    var keyElm = li[defaults.dataKeyOnDOM].key;
    if(Array.isArray(parentElm)) {
        var parentElement = li.parentElement;
        var index = Array.prototype.indexOf.call(parentElement.children, li);
        var parentElementLength = parentElement.children.length;
            for (var ii = index+1; ii < parentElementLength; ii++) {
                var childLI = parentElement.children[ii];
                childLI[defaults.dataKeyOnDOM].key = ii-1;
                childLI.querySelector(".iterate-node__key").innerText = ii-1;
            }
        parentElm.splice(index,1);
    }
    else
        delete parentElm[keyElm];

    defaults.removeElementListener && defaults.removeElementListener(li[defaults.dataKeyOnDOM]);
    li.parentElement.removeChild(li);
}