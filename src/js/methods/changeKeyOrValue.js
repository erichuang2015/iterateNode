function changeKeyOrValue(li,typeNode,isKey,e) {
    var thisTarget = e.target;
    var parentElement = li.parentElement.parentElement[defaults.dataKeyOnDOM].value;
    var innerText = thisTarget.innerText;
    if(isKey) {
        while (Object.keys(parentElement).indexOf(innerText) > -1)
            innerText = innerText + Math.floor(Math.random() * (9007199254740991));

        li[defaults.dataKeyOnDOM].key = innerText;
        thisTarget.innerText = innerText;
        defaults.changeKeyListener && defaults.changeKeyListener(li[defaults.dataKeyOnDOM]);
    }
    else{
        // number sanitation
        switch(typeNode) {
            case ("[object Number]") :
                // Number : if is NaN, is 0
                innerText = isNaN(Number(innerText)) ?
                    0 : Number(innerText);
                break;
            case ("[object Boolean]") :
                // boolean : if is not 'true', then is false
                innerText = ( innerText.toLowerCase() == "true" );
                break;
            default:
                break;
        }
        li[defaults.dataKeyOnDOM].value = innerText;
        defaults.changeValueListener && defaults.changeValueListener(li[defaults.dataKeyOnDOM]);
    }
}