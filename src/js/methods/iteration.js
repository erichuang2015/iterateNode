function ITERATION (obj,callback) {
    var DOMrepresentation = document.createElement("ul");
    if(defaults.map) {
        defaults.map(obj,function(newObj){
            for (var k in newObj) {
                DOMrepresentation.appendChild(
                    TEMPLATE(newObj.key || k,
                        newObj[k].value, newObj,newObj[k].alias));
            }
        });
        callback(DOMrepresentation)
    }
    else {
        for (var k in obj) {
            DOMrepresentation.appendChild(TEMPLATE(k, obj[k], obj));
        }
        callback(DOMrepresentation);
    }


}