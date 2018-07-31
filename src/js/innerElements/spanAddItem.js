function spanAddItem(templateGlobals) {
    var add = document.createElement("span");
    add.classList.add("iterate-node__add-item");
    add.innerText = "+";
    add.addEventListener("click", addElement.bind(this, templateGlobals));
    templateGlobals.li.appendChild(add);
}