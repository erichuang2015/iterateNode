function spanAddItem(li,obj) {
    var add = document.createElement("span");
    add.classList.add("iterate-node__add-item");
    add.textContent = "+";
    add.addEventListener("click", function(e){
        addElement(li,null,null,undefined,null)
    });
    li.appendChild(add);
}