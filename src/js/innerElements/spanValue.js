function spanValue(templateGlobals) {
    var valueElem = document.createElement("span");
    valueElem.classList.add("iterate-node__value");
    valueElem.innerText = "" + templateGlobals.value;
    if (this.options.contentEditable.value) {
        valueElem.setAttribute("contenteditable","true");
        valueElem.addEventListener("blur", changeKeyOrValue.bind(this, templateGlobals,false));
    }
    templateGlobals.li.appendChild(valueElem);
}