function ITERATION (obj,callback) {
    var DOMrepresentation = document.createElement("ul");
    if(defaults.map) {
        defaults.map(obj,function(newObj){
            for (var k in newObj)
                DOMrepresentation.appendChild(
                    TEMPLATE(newObj[k].key || k,
                        newObj[k].value, newObj,newObj[k].alias));
        });
        callback(DOMrepresentation)
    }
    else {
        for (var k in obj.value) {
            DOMrepresentation.appendChild(TEMPLATE(k, obj.value[k], obj.value));
        }
        callback(DOMrepresentation);
    }


}