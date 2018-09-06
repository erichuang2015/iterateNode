function spanAddItem(li,obj) {
    var add = document.createElement("span");
    add.classList.add("iterate-node__add-item");
    add.textContent = "+";
    add.addEventListener("click", function(e){
        addElement(e.target.parentElement,null,null,undefined,null)
    });
    li.appendChild(add);
}