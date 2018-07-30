function spanForKey(templateGlobals) {
    /* span for key */
    var keyElem = document.createElement("span");
    keyElem.classList.add("iterate-node__key");
    keyElem.innerText = templateGlobals.key;
    // if editable, adding contenteditable and event
    if (this.options.contentEditable.key && !Array.isArray(templateGlobals.parent)) {
        keyElem.setAttribute("contenteditable","true");
        keyElem.addEventListener("blur", changeKeyOrValue.bind(this, templateGlobals,true));
    }
    templateGlobals.li.appendChild(keyElem);
}