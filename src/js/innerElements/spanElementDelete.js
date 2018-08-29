function spanElementDelete(li) {
        var deleteElem = document.createElement("span");
        deleteElem.innerText = "-";
        deleteElem.addEventListener("click",
            deleteElement.bind(null,li));
        li.appendChild(deleteElem);
}