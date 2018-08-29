function TEMPLATE (key,value,parentElement,alias){
    var typeNode = Object.prototype.toString.call(value);
    /* main LI */
    var li = document.createElement("li");
    li[defaults.dataKeyOnDOM] = {
        key : key,
        value : value,
        parentElement : parentElement,
        alias : alias
    };
    if( defaults.contentEditable.drag )
        spanForDrag(li);
    spanForKey(li,key,parentElement,typeNode);
    spanForTypeof(li,typeNode,key);
    spanSeparator(li);
    if (defaults.alias)
        spanAlias(li,defaults.alias(alias));
    /*if (typeNode == "[object Object]" ||
        typeNode == "[object Array]" ) {*/
    if(value && typeof value === 'object'){
        spanCaret(li);

        if (defaults.contentEditable.add)
            spanAddItem(li);
    }
    else
        if(!defaults.alias) spanValue(li,value,typeNode);
    /* adding delete element */
    if (defaults.contentEditable.delete)
        spanElementDelete(li);

    if (Object.keys(defaults.appendElements).length)
        for(var k in defaults.appendElements)
            defaults.appendElements[k](key,value);

    return li;
}

