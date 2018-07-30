"use strict";

function openObject(e) {
    var target = e.target;
    if (!e.target.classList.contains('iterate-node__caret')) return;

    var options = this.options;
    var state = this.state;
    var iteration = this.iteration;
    var parent = e.target.parentNode;
    var ul = parent.querySelector("ul");
    if (!ul) {
        var path = parent.getAttribute("data-iterate-node-path");
        var newObj;
        if (options.renderChildren) {
            newObj = options.renderChildren(path);
            assignParamFromString(path, state, newObj);
        } else newObj = returnParamFromString(path, state, options.separator);

        var newUl = iteration.call(this, newObj, path, options);
        parent.insertAdjacentHTML('beforeend', newUl);
        ul = parent.querySelector("ul");
    }

    target.classList.toggle('open');
}