function assignParamFromString(string, value) {
    var $self = this;
    var model = string.split($self.options.separator);
    var actualModel = $self.state;
    for (var i = 0; i < model.length - 1; i++)
        actualModel = actualModel[model[i]];

    actualModel[model[model.length - 1]] = value;
    var key = model[model.length - 1];
    var li = $self.targetElement.querySelector("[data-iterate-node-path='" + string + "']");
    var path = li.parentElement.parentElement.getAttribute("data-iterate-node-path");
    li.parentElement.replaceChild(
        TEMPLATE.call($self,key,value,path),
        li
    );
}