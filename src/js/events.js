/**
 * Created by simone.dinuovo on 03/05/2017.
 */
function eventsList(li,typeNode,options,contentEditableList,count,node,newStringModel,newCountObject) {
    li.insertAdjacentHTML('beforeend', contentEditableList);
    addItems = li.querySelector('.add-items');
    var ourStringModel = li.getAttribute("data-string-model");
    var $this = returnParamFromString(ourStringModel,options.originalObject);
    addItems.addEventListener('click', function (e) {
        /*var child = li.querySelector('ul');
        if (!child  && !Object.keys($this).length ) {
            li.insertAdjacentHTML('beforeend', '<ul></ul>');
        }
        else if(child == null || child.style.display == "none")
            li.querySelector('.caretA').click();*/
        //var NodeNewElement = li.querySelector('ul');
        if( li.querySelector('.caretA') )
            li.removeChild(li.querySelector('.caretA'));
        var thisLength = Object.keys($this).length ;
        var thisKey = typeNode == "[object Object]" ? "key" + thisLength : thisLength;
        options.stringModel = ourStringModel;
        createKeyFromString(ourStringModel, options.originalObject, thisKey, "value");
        var settingsChildren = merge({
            obj: node,
            stringModel: newStringModel,
            countObj: newCountObject
        }, options, true);
        var caretA = createCaret(li, settingsChildren);
        if(li.querySelector('ul'))
            li.replaceChild(caretA,li.querySelector('ul'));
        else
            li.appendChild(caretA);
        li.querySelector('.caretA').click();
        /*var newLi = parsingNode(thisKey, "value", options, count);
        NodeNewElement.appendChild(newLi);
        console.log("ourStringModel", ourStringModel);
        console.log("newLi.getAttribute('data-string-model')", newLi.getAttribute("data-string-model"));*/
    });
};

function eventsLabel(li,options,node,count,k,typeNode,newStringModel){
    // key e values editable
    li.querySelectorAll("[contenteditable]").forEach(function(v,i,a){
        v.addEventListener("blur",function(e){
            // number sanitation
            var value = ( typeNode == "[object Number]" && v.className.indexOf("iterateNode-sanitize-key-value") < 0 ) ? isNaN( Number(v.innerText) ) ? 0 : Number(v.innerText) : v.innerText;
            // boolean sanitation
            value = ( typeNode == "[object Boolean]" && v.className.indexOf("iterateNode-sanitize-key-value") < 0 ) ? ( v.innerText.toLowerCase() == "true" ) : value;
            if(value != v.innerText)
                v.innerText = value;
            if(v.className.indexOf("iterateNode-sanitize-key-value") >= 0 ) {
                var ourStringModel = li.getAttribute("data-string-model");
                var decriptStringModel = ourStringModel.split("?");
                decriptStringModel[decriptStringModel.length-1] = v.innerText;
                var newAsStringModel = decriptStringModel.join("?");
                assignKeyFromString(ourStringModel, options.originalObject, v.innerText);
                var parentNode = li.parentNode;
                var parentStringNode = parentNode.parentNode.getAttribute("data-string-model");
                options.stringModel = parentStringNode;
                var newLi = parsingNode(v.innerText,node,options,count);
                parentNode.replaceChild(newLi, li);
            }
            else
                assignParamFromString(newStringModel, options.originalObject, value);

            console.log("[originalObject] : \n", options.originalObject);
        });
    });

    // change type
    var typeOfElement = li.querySelector('.iterateNode-sanitize-key-typeof-value');
    typeOfElement.addEventListener('click',function(e){
        var newSelect=document.createElement('select');
        var opt = document.createElement("option");
        newSelect.appendChild(opt);
        for(element in iterateNodeDataTypes)
        {
            var opt = document.createElement("option");
            opt.value= element;
            opt.innerHTML = iterateNodeDataTypes[element].label;
            newSelect.appendChild(opt);
        }
        li.children[0].replaceChild(newSelect,typeOfElement);
        newSelect.addEventListener('change',function(e){
            var ourStringModel = li.getAttribute("data-string-model");
            var newValue = iterateNodeDataTypes[newSelect.value].converter();
            console.log("newValue", newValue);
            assignParamFromString(ourStringModel, options.originalObject, newValue);
            var $this = returnParamFromString(ourStringModel,options.originalObject);
            console.log($this);
            console.log("options.originalObject",options.originalObject);
            var parentNode = li.parentNode;
            options.stringModel = parentNode.parentNode.getAttribute("data-string-model");
            var newLi = parsingNode(k,newValue,options,count);
            console.log("iterateNode",newLi);
            parentNode.replaceChild(newLi, li);
        })
    })
}
function eventRemoveItem(li,options){
    var i = document.createElement("i");
    i.className = 'iterateNode-delete-item';
    i.innerHTML = "-";
    li.appendChild(i);
    i.addEventListener('click',function(e){
        var ourStringModel = li.getAttribute("data-string-model");
        deleteParamFromString(ourStringModel, options.originalObject);
        li.parentNode.removeChild(li);
    });
}