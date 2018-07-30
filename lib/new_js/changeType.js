'use strict';

function changeTypeEnable(e) {
    if (!e.target.classList.contains('iterate-node__key_typeof')) return;
    e.target.classList.add('iterate-node__hide');
    e.target.nextElementSibling.classList.remove('iterate-node__hide');
}

function changeType(e) {
    var options = this.options;
    if (e.target.tagName.toLowerCase() != 'select') return;
    var newValue = iterateNodeDataTypes[e.target.value].converter();
    var parent = e.target.parentElement;
    var path = parent.getAttribute('data-iterate-node-path');
    var key = parent.querySelector('.iterate-node__key').innerText.trim();
    assignParamFromString(path, this.state, newValue);
    parent.outerHTML = this.template.call(this, key, newValue, path.split(options.separator).slice(0, this.length - 1).join(options.separator));
    e.target.classList.add('iterate-node__hide');
    e.target.previousElementSibling.classList.remove('iterate-node__hide');
}