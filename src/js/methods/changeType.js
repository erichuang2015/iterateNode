function changeTypeEnable(e){
    e.target.classList.add('iterate-node__hide');
    e.target.nextElementSibling.classList.remove('iterate-node__hide');
}

function changeType(e){
    var li = e.target.parentElement;
    var key = li[defaults.dataKeyOnDOM].key;
    var parent = li[defaults.dataKeyOnDOM].parentElement;
    var newValue = iterateNodeDataTypes[e.target.value].converter();
    var newLi = TEMPLATE(key,newValue,parent);
    li.parentElement.replaceChild(
        newLi,
        li
    );
    //li[defaults.dataKeyOnDOM].value = newValue;
    parent[key] = newValue;
    defaults.changeTypeListener && defaults.changeTypeListener(newLi[defaults.dataKeyOnDOM]);
}
