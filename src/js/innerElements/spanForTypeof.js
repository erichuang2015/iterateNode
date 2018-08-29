function spanForTypeof(li,typeNode,key) {
    /* span for typeof */
    var typeOfElem = document.createElement("span");
    typeOfElem.classList.add("iterate-node__type-node");
    typeOfElem.innerText = typeNode;
    li.appendChild(typeOfElem);
    // if editable, adding event on click and select for choose type
    if (defaults.contentEditable.type) {
        typeOfElem.addEventListener("click", changeTypeEnable);
        var sel = returnDataTypes();
        li.appendChild(sel);
        sel.addEventListener("blur", changeType.bind(null))
    }

}