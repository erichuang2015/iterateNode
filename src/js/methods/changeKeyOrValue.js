function changeKeyOrValue(isKey,e) {
    var thisTarget = e.target;
    var li = thisTarget.parentElement;
    var oldKey = li[defaults.dataKeyOnDOM].key;
    var oldValue = li[defaults.dataKeyOnDOM].value;
    var typeNode = Object.prototype.toString.call(oldValue);
    var parentElement = li[defaults.dataKeyOnDOM].parentElement;
    var innerText = thisTarget.innerText;

    if(isKey) {
        if(innerText == oldKey)
            return;
        while (Object.keys(parentElement).indexOf(innerText) > -1)
            innerText = innerText + Math.floor(Math.random() * (9007199254740991));

        var nextElement = li.nextElementSibling;
        li[defaults.dataKeyOnDOM].key = innerText;
        thisTarget.innerText = innerText;
        if(nextElement) {
            prependObjectElement(parentElement, innerText,
                oldValue, nextElement[defaults.dataKeyOnDOM].key);
            delete parentElement[oldKey];
        }
        else {
            delete parentElement[oldKey];
            parentElement[innerText] = li[defaults.dataKeyOnDOM].value;
        }
        defaults.changeKeyListener && defaults.changeKeyListener(li[defaults.dataKeyOnDOM]);
    }
    else{
        if(innerText == oldValue)
            return;
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
            case ("[object Null]") :
                thisTarget.innerText = "" + null;
                return;
                break;
            default:
                break;
        }

        parentElement[oldKey] = innerText;
        li[defaults.dataKeyOnDOM].value = innerText;
        thisTarget.innerText = innerText;
        defaults.changeValueListener && defaults.changeValueListener(li[defaults.dataKeyOnDOM]);
    }
}