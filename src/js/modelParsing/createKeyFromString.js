function createKeyFromString(string, key, value) {
    var $self = this;
    var model = string.split($self.options.separator);
    var actualModel = $self.state;
    for (var i = 0; i < model.length - 1; i++)
        actualModel = actualModel[model[i]];

    var finalModel = string.length ? actualModel[model[model.length - 1]] : $self.state;

    while (Object.keys(finalModel).indexOf(key) > -1)
        key = key + Math.floor(Math.random() * (9007199254740991));

    finalModel[key] = value;

    var li = $self.targetElement.querySelector("[data-iterate-node-path='" + string + "']");
    var newEl = TEMPLATE.call($self,key,value,string);
    if (!li.querySelector("ul") && li.querySelector(".iterate-node__caret")) {
        li.querySelector(".iterate-node__caret").click();
        // clicking the caret in a new ul, the item is automatically added. Return
        return;
    }

    li.querySelector("ul").appendChild(newEl);
}