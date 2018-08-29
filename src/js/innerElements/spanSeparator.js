function spanSeparator(li) {
    /* add span separator */
    var spanSeparator = document.createElement("span");
    spanSeparator.innerText = ":";
    spanSeparator.classList.add("iterate-node__separator");
    li.appendChild(spanSeparator);
}