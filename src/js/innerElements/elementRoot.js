function elementRoot(obj){
    /* main LI */
    var ul = document.createElement("ul");
    var li = document.createElement("li");

    var renderObj = defaults.map ? defaults.map(obj) : obj;
    li[defaults.dataKeyOnDOM] = {
        value : renderObj,
        alias : obj
    };
    if (defaults.alias)
        spanAlias(li,defaults.alias(obj));
    if (defaults.contentEditable.add) {
        spanAddItem(li);
    }
    ul.appendChild(li);
    return ul;
}