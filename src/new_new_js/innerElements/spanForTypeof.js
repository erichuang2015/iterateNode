function spanForTypeof(templateGlobals) {
    /* span for typeof */
    var typeOfElem = document.createElement("span");
    typeOfElem.classList.add("iterate-node__type-node");
    typeOfElem.innerText = templateGlobals.typeNode;
    templateGlobals.li.appendChild(typeOfElem);
    // if editable, adding event on click and select for choose type
    if (this.options.contentEditable.type) {
        typeOfElem.addEventListener("click", changeTypeEnable.bind(this));
        var sel = returnDataTypes();
        templateGlobals.li.appendChild(sel);
        sel.addEventListener("blur", changeType.bind(this,templateGlobals))
    }

}