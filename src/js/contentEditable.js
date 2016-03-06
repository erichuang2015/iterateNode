function iterNodeCntEdit(li,contentEditableList,node,typeNode,newStringModel,newCountObject,options){
    var dataTyepOf = li.querySelector('.iterateNode-data-types-typeof');
    var dtypeOf = li.querySelector('.iterateNode-sanitize-key-typeof-value');
    var select = li.querySelector('.iterateNode-data-types');
    if( contentEditableList.length ){
        li.insertAdjacentHTML('beforeend',contentEditableList);
        var addItems = li.querySelector('.add-items');
        addItems.addEventListener('click', function (e) {
            if( !li.querySelector('ul') && li.querySelector('.caretA') )
                return false;

            if ( !li.querySelector('.caretA')){
                var settingsChildren = merge({
                    obj:node,
                    stringModel:newStringModel,
                    countObj:newCountObject,
                    opened:true
                },options,true);
                var caretA = createCaret(li,settingsChildren);
                li.appendChild(caretA);
                li.insertAdjacentHTML('beforeend','<ul></ul>');
            }

            var NodeNewElement = li.querySelector('ul');
            var thisLength = NodeNewElement.children.length;
            var thisKey = typeNode == "[object Object]" ? "key" + thisLength : thisLength;
            var newLi = parsingNode(thisKey, "value", options, count);
            NodeNewElement.appendChild(newLi);
        });
    }

    for(var i = 0; i<options.iterateNodeDataTypes.length;i++){
        var option = document.createElement("option");
        option.value = iterateNodeDataTypes[i].value;
        option.text = iterateNodeDataTypes[i].label;
        select.add(option, i);
    }

    var path = /show/g;
    dataTyepOf.addEventListener('click', function (e) {
        if ( path.test( dtypeOf.className ) )
        {
            dtypeOf.className = dtypeOf.className.replace(path, "") + " hide";
            select.className =select.className.replace(/hide/g, "") + " show";
        }
        /*
        else{
            select.className = select.className.replace(path, "") + " hide";
            dtypeOf.className = dtypeOf.className.replace(/hide/g, "") + " show";
        }*/

    });
    select.addEventListener('blur', function(e){
        dtypeOf.textContent = select.value;
        select.className = select.className.replace(path, "") + " hide";
        dtypeOf.className = dtypeOf.className.replace(/hide/g, "") + " show";
    });

}