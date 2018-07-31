function openObject(e){
        var $self = this;
        var target = e.target;
        var options = this.options;
        var parent = target.parentElement;
        var ul = parent.querySelector("ul");
        if (!ul){
            var path = parent.getAttribute("data-iterate-node-path");
            var newObj;
            /*
            if(options.renderChildren) {
                newObj = options.renderChildren(path);
                $self.assignParamFromString(path,newObj);
            }
            else */
                newObj = $self.returnParamFromString(path);

            var newUl = ITERATION.call($self, newObj, path, options);
            parent.appendChild(newUl);
            ul = parent.querySelector("ul");
        }

        target.classList.toggle('open');
}