function spanForKey(li,key,parentElement,typeNode) {
    /* span for key */
    var keyElem = document.createElement("span");
    keyElem.classList.add("iterate-node__key");
    keyElem.innerText = key;
    // if editable, adding contenteditable and correlate event
    if (defaults.contentEditable.key && !Array.isArray(parentElement)) {
        keyElem.setAttribute("contenteditable","true");
        keyElem.addEventListener("blur", changeKeyOrValue.bind(null,li,typeNode,true));
    }
    li.appendChild(keyElem);
}