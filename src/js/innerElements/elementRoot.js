function elementRoot(obj,cb){
    /* main LI */
    var ul = document.createElement("ul");
    var li = document.createElement("li");

    if(defaults.map)
        defaults.map({value:obj},eR);
    else
        eR({value : obj});

    function eR(renderObj) {
        li[defaults.dataKeyOnDOM] = {
            value: renderObj.value || obj,
            alias: renderObj.alias || obj
        };
        if (defaults.alias)
            spanAlias(li, defaults.alias(renderObj.alias || obj));
        if (defaults.contentEditable.add) {
            spanAddItem(li);
        }
        ul.appendChild(li);
        cb(ul);
    }
}