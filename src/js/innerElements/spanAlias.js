function spanAlias(li,text) {
    var alias = document.createElement("span");
    alias.classList.add("iterate-node__alias");
    alias.innerHTML = text;
    li.appendChild(alias);
}