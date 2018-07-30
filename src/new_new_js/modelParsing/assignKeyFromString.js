function assignKeyFromString(string,value, newValue,replace) {
    // value is the key, newValue the
    var $self = this;
    var model = string.split($self.options.separator);
    var actualModel = $self.state;
    var index;
    var li = $self.targetElement.querySelector("[data-iterate-node-path='" + string +"']");
    var path = li.parentElement.parentElement.getAttribute("data-iterate-node-path");
    for (var i = 0; i < model.length - 1; i++) {
        actualModel = actualModel[model[i]];
    }
    while (Object.keys(actualModel).indexOf(value) > -1)
        value = value + Math.floor(Math.random() * (9007199254740991));

    if(!Array.isArray( actualModel )) {
        var temp = JSON.parse(JSON.stringify(actualModel));
        for(var keyOld in actualModel)
            delete actualModel[keyOld];
        var incr = 0;
        for(var key in temp) {
            if(key == model[model.length - 1]) {
                index = incr;
                actualModel[value] = newValue;
                if(!replace)
                    actualModel[key] = temp[key];
            }
            else
                actualModel[key] = temp[key];
            incr++;
        };
    }
    else {
        //var oldElement = JSON.stringify(JSON.parse(actualModel[model[model.length - 1]]));
        index = Number(model[model.length - 1]);
        actualModel.splice(index, replace, newValue);
        model.splice(model.length-1, 1);
        path = model.join($self.options.separator);
        var parentElementLength = li.parentElement.children.length;
        for(var ii = index;ii<parentElementLength;ii++) {
            var thisChildren = li.parentElement.children[ii];
            var oldPathSplitted = li.parentElement.children[ii].getAttribute("data-iterate-node-path").split($self.options.separator);
            oldPathSplitted.splice(oldPathSplitted.length-1, 1, ii + 1);
            thisChildren.setAttribute("data-iterate-node-path",oldPathSplitted.join($self.options.separator));
            thisChildren.querySelector(".iterate-node__key").innerText = ii + 1;
            var caret = thisChildren.querySelector('.iterate-node__caret');
            if( caret && thisChildren.querySelector("ul") ){
                var caretWasOpen = caret.classList.contains('open');
                caretWasOpen && caret.click();
                thisChildren.removeChild(thisChildren.querySelector("ul"));
                caretWasOpen && caret.click();
                }
            }
    }
    var keyEl = Array.isArray( actualModel ) ? index : value;
    if(replace)
        li.parentElement.replaceChild(
            TEMPLATE.call($self,
                keyEl,
                newValue,
                path),
            li
        );
    else
        li.parentElement.insertBefore(
            TEMPLATE.call($self,
                keyEl,
                newValue,
                path),
            li.parentElement.children[index]
        );
}
