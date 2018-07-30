'use strict';

function iterateNodeEvents(target) {
    var state = this.state;
    var iteration = this.iteration;
    var options = this.options;
    var $this = this;
    // open subtree
    target.addEventListener('click', openObject.bind($this));
    // key value editable
    if (options.contentEditable.key || options.contentEditable.value) target.addEventListener('blur', changeKeyOrValue.bind($this));

    if (options.contentEditable.type) {
        target.addEventListener('click', changeTypeEnable.bind($this));
        target.addEventListener('change', changeType.bind($this));
    }
}