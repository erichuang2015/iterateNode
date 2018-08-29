function iterateNode(targetElement,settings) {
    var $self = this;
    defaults = $self.defaults =
        settings ? merge(settings,defaults,true) : defaults;
    $self.state = defaults.obj;
    $self.methods = methods;
    var DOMrepresentation = ITERATION(defaults.obj);
    var rootRepresentation = elementRoot(defaults.obj);
    rootRepresentation.children[0].appendChild(DOMrepresentation);
    targetElement.className += " iterateNode-obj";
    targetElement.appendChild(rootRepresentation);

    if( defaults.contentEditable.drag )
        dragging.call(this,targetElement);

    return $self;
};