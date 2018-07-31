function spanCaret(templateGlobals) {
    var $self = this;
    var caret = document.createElement("span");
    caret.classList.add("iterate-node__caret");
    caret.addEventListener('click', openObject.bind($self));
    templateGlobals.li.appendChild(caret);
}