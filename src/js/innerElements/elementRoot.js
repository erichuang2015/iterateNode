function elementRoot(obj,cb){
    /* main LI */
    var ul = document.createElement("ul");
    var li = document.createElement("li");

    if(defaults.map)
        defaults.map(obj,eR);
    else
        eR(obj);

    function eR(renderObj) {
        li[defaults.dataKeyOnDOM] = {
            value: renderObj,
            alias: obj
        };
        if (defaults.alias)
            spanAlias(li, defaults.alias(obj));
        if (defaults.contentEditable.add) {
            spanAddItem(li);
        }
        ul.appendChild(li);
        cb(ul);
    }
}