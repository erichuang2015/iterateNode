function deleteParamFromString(string) {
    var $self = this;
    var model = string.split($self.options.separator);
    var actualModel = $self.state;
    for (var i = 0; i < model.length - 1; i++)
        actualModel = actualModel[model[i]];

    var li = $self.targetElement.querySelector("[data-iterate-node-path='" + string +"']")
    if(Array.isArray(actualModel)) {
        var index = Array.prototype.indexOf.call(li.parentElement.children, li);
        var parentElementLength = li.parentElement.children.length;
        for(var ii = index;ii<parentElementLength;ii++) {
            var thisChildren = li.parentElement.children[ii];
            var oldPathSplitted = li.parentElement.children[ii].getAttribute("data-iterate-node-path").split($self.options.separator);
            var oldPath = oldPathSplitted.splice(oldPathSplitted.length - 1, 1, ii - 1);
            thisChildren.setAttribute("data-iterate-node-path",oldPathSplitted.join($self.options.separator));
            li.parentElement.children[ii].querySelector(".iterate-node__key").innerText = ii - 1;
            var caret = thisChildren.querySelector('.iterate-node__caret');
            if( caret && thisChildren.querySelector("ul") ){
                var caretWasOpen = caret.classList.contains('open');
                caretWasOpen && caret.click();
                thisChildren.removeChild(thisChildren.querySelector("ul"));
                caretWasOpen && caret.click();
            }
        }
    }

    if( Array.isArray( actualModel ) ){
        var index = actualModel.indexOf( actualModel[model[model.length - 1]] );
        actualModel.splice(index, 1);
    }
    else
        delete actualModel[model[model.length - 1]];

    li.parentElement.removeChild(li);
}