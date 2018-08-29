function spanCaret(li) {
    var $self = this;
    var caret = document.createElement("span");
    caret.classList.add("iterate-node__caret");
    caret.addEventListener('click', openObject);
    li.appendChild(caret);
}