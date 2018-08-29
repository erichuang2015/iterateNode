function spanForDrag(li) {
    /* add span for Drag */
    var spanForDrag = document.createElement("span");
    spanForDrag.classList.add("iterate-node__drag");
    spanForDrag.innerText = "D";
    li.appendChild(spanForDrag);
}