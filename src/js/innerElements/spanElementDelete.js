function spanElementDelete(li) {
        var deleteElem = document.createElement("span");
        deleteElem.className = "iterate-node__delete-item";
        deleteElem.innerText = "-";
        deleteElem.addEventListener("click",function(e) {
            deleteElement(e.target.parentElement);
        });
        li.appendChild(deleteElem);
}