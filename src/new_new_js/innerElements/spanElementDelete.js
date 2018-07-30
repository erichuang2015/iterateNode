function spanElementDelete(templateGlobals) {
        var deleteElem = document.createElement("span");
        deleteElem.innerText = "-";
        deleteElem.addEventListener("click", removeElement.bind(this, templateGlobals));
        templateGlobals.li.appendChild(deleteElem);
}