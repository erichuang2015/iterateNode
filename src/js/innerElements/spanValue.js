function spanValue(li,value,typeNode) {
    var valueElem = document.createElement("span");
    valueElem.classList.add("iterate-node__value");
    valueElem.textContent = "" + value;
    if (defaults.contentEditable.value) {
        valueElem.setAttribute("contenteditable","true");
        valueElem.addEventListener("blur",
            changeKeyOrValue.bind(null,li,typeNode,false))
    }
    li.appendChild(valueElem);
}