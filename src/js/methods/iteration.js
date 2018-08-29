function ITERATION (obj) {
    var DOMrepresentation = document.createElement("ul");
    if(defaults.map) {
        var newObj = defaults.map(obj);
        for (var k in newObj) {
            DOMrepresentation.appendChild(
                TEMPLATE(k,newObj[k].value, newObj,newObj[k].alias));
        }
    }
    else
        for (var k in obj) {
            DOMrepresentation.appendChild(TEMPLATE(k, obj[k], obj));
        }

    return DOMrepresentation;
}