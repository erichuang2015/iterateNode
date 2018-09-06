function prependObjectElement(elm,key,value,keyToPrepend) {
    var temp = JSON.parse(JSON.stringify(elm));
    for (var OldesKey in elm)
        delete elm[OldesKey];
    for (var copyKey in temp) {
        if (copyKey == keyToPrepend) {
            elm[key] = value;
            elm[copyKey] = temp[copyKey];
        }
        else
            elm[copyKey] = temp[copyKey];
    }
}