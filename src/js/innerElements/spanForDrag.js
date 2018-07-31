function spanForDrag(templateGlobals) {
    /* add span for Drag */
    var spanForDrag = document.createElement("span");
    spanForDrag.classList.add("iterate-node__drag");
    spanForDrag.innerText = "D";
    templateGlobals.li.appendChild(spanForDrag);
}