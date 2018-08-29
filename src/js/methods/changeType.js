function changeTypeEnable(e){
    e.target.classList.add('iterate-node__hide');
    e.target.nextElementSibling.classList.remove('iterate-node__hide');
}

function changeType(e){
    var li = e.target.parentElement;
    var key = li[defaults.dataKeyOnDOM].key;
    var parent = li.parentElement.parentElement[defaults.dataKeyOnDOM].value;
    var newValue = iterateNodeDataTypes[e.target.value].converter();
    li.parentElement.replaceChild(
        TEMPLATE(key,newValue,parent),
        li
    );
    li[defaults.dataKeyOnDOM].value = newValue;
    parent[key] = newValue;
    defaults.changeTypeListener && defaults.changeTypeListener(li[defaults.dataKeyOnDOM]);
}
