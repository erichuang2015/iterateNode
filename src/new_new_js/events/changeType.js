function changeTypeEnable(e){
    e.target.classList.add('iterate-node__hide');
    e.target.nextElementSibling.classList.remove('iterate-node__hide');
}

function changeType(templateGlobals,e){
    var $self = this;
    var parent = e.target.parentElement;
    var path = parent.getAttribute("data-iterate-node-path");
    var newValue = iterateNodeDataTypes[e.target.value].converter();
    $self.assignParamFromString(path, newValue,1);
}