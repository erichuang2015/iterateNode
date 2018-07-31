function iterateNode(targetElement,obj,settings) {
    var $self = this;
    $self.state = obj;
    $self.targetElement = targetElement;
    $self.assignParamFromString = assignParamFromString;
    $self.assignKeyFromString = assignKeyFromString;
    $self.createKeyFromString = createKeyFromString;
    $self.deleteParamFromString = deleteParamFromString;
    $self.returnParamFromString = returnParamFromString;
    var options = $self.options = settings ? merge(settings,defaults,true) : defaults;
    var DOMrepresentation = ITERATION.call($self, obj, "", options);
    var rootRepresentation = elementRoot.call($self);
    rootRepresentation.children[0].appendChild(DOMrepresentation);
    targetElement.className += " iterateNode-obj";
    targetElement.appendChild(rootRepresentation);

    if( options.contentEditable.drag )
        dragging.call(this,targetElement);

    return this;
};