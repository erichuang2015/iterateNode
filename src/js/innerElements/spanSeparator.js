function spanSeparator(templateGlobals) {
    /* add span separator */
    var spanSeparator = document.createElement("span");
    spanSeparator.innerText = ":";
    spanSeparator.classList.add("iterate-node__separator");
    templateGlobals.li.appendChild(spanSeparator);
}