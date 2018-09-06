function iterateNode(targetElement,settings) {
    var $self = this;
    defaults = $self.defaults =
        settings ? merge(settings,defaults,true) : defaults;
    $self.state = defaults.obj;
    $self.methods = methods;
    ITERATION(defaults.obj,function(DOMrepresentation){
            elementRoot(defaults.obj,function(rootRepresentation){
                rootRepresentation.children[0].appendChild(DOMrepresentation);
                targetElement.className += " iterateNode-obj";
                targetElement.appendChild(rootRepresentation);

                if( defaults.contentEditable.drag )
                    dragging.call($self,targetElement);

            })
    });
    return $self;
};