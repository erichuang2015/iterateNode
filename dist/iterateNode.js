(function(){

    /**
     *
     * @param string - the string representation of object
     * @param root - the root object
     * @param value - value to assign
     */
    function assignParamFromString(string, root, value, separatore) {
        var separator = separatore || "?";
        var model = string.split(separator);
        var actualModel = root;
        for (var i = 0; i < model.length - 1; i++)
            actualModel = actualModel[model[i]];

        actualModel[model[model.length - 1]] = value;
    }

    function assignKeyFromString(string, root, value, separatore) {
        var separator = separatore || "?";
        var model = string.split(separator);
        var actualModel = root;
        for (var i = 0; i < model.length - 1; i++)
            actualModel = actualModel[model[i]];

        var temp = actualModel[model[model.length - 1]];
        delete actualModel[model[model.length - 1]];
        actualModel[value] = temp;
    }

    function createKeyFromString(string, root, key, value, separatore) {
        var separator = separatore || "?";
        var model = string.split(separator);
        var actualModel = root;
        for (var i = 0; i < model.length - 1; i++)
            actualModel = actualModel[model[i]];

        var finalModel = actualModel[model[model.length - 1]];
        finalModel[key] = value;
    }

    function returnParamFromString(string, root,separatore) {
        if ( !string )
            return root;

        var separator = separatore || "?";
        var model = string.split(separator);
        var actualModel = root;
        for (var i = 0; i < model.length; i++)
            actualModel = actualModel[model[i]];

        return actualModel;
    }

    function deleteParamFromString(string, root,separatore) {
        var separator = separatore || "?";
        var model = string.split(separator);
        var actualModel = root;
        for (var i = 0; i < model.length - 1; i++)
            actualModel = actualModel[model[i]];

        //var temp = actualModel[model[model.length - 1]];
        if( Array.isArray( actualModel[model] ) ){
            var index = actualModel[model].indexOf( actualModel[model[model.length - 1]] );
            actualModel[model].splice(index, 1);
        }
        else
            delete actualModel[model[model.length - 1]];

    }
/**
 * Created by Simone on 01/09/15.
 */
function clone(obj) {
    var target = {};
    for (var i in obj) {
        var typeNode = Object.prototype.toString.call(obj[k]);
        if ( ( typeNode == "[object Object]" || typeNode == "[object Array]" ) &&
            obj[i] )
            target[i] = clone(obj)
        else
            target[i] = obj[i];
    }
    return target;
}

var classHide = /hide/g;
var classShow = /show/g;
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
/**
 *
 * @param li {HTMLLIElement} - li element to attach the listener
 * @param settings {jsObject} - javascript object ( usually the settings passing to iterateNode constructor )
 * @returns {HTMLAnchorElement}
 */
function createCaret(li,nodeIteratorSettings){
    var caretA = document.createElement("a");
    caretA.href="javascript:void()";
    caretA.className="caretA";
    var caret = document.createElement("span");
    caret.className = "caret";
    caretA.addEventListener("click",function(e){
        e.preventDefault();
        e.stopPropagation();
        var ulChild = li.querySelectorAll("ul")[0];
        if ( !ulChild )
        {
            nodeIteratorSettings.countObj =  nodeIteratorSettings.countObj+"-";
            if ( nodeIteratorSettings.asyncFunction ){
                nodeIteratorSettings.asyncFunction(li.getAttribute("data-string-model"),
                    function(newObject){
                        nodeIteratorSettings.obj = newObject;
                        li.appendChild( iterateNode(nodeIteratorSettings) );
                    }
                );
            }
            else{
                li.appendChild( iterateNode(nodeIteratorSettings) );
            }
        }

        var path = /open/g;
        if ( path.test( caret.className ) )
        {
            caret.className = caret.className.replace(path, "");
            ulChild.className+=" simpleHide";
        }
        else{
            caret.className+=" open";
            if ( ulChild ) ulChild.className = ulChild.className.replace(/simpleHide/g, "");
        }

    },false);
    caretA.appendChild(caret);
    return caretA;
}
/*
 JSON Value
 It includes ?

 number (integer or floating point)
 string
 boolean
 array
 object
 null
 */
var iterateNodeDataTypes = {
    "[object Number]": {
        label: "number",
        converter: function () {
            return Number();
        }
    },
    "[object String]": {
        label: "string",
        converter: function () {
            return String();
        }
    },
    "[object Boolean]": {
        label: "boolean",
        converter: function () {
            return Boolean();
        }
    },
    "[object Array]": {
        label: "list of values",
        converter: function (obj) {
            return [];
        }
    },
    "[object Object]": {
        label: "list of elements",
        converter: function (obj) {
            return {};
        }
    },
    "[object Null]": {
        label: "null",
        converter: function (obj) {
            return null;
        }
    }
};
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
function filterObject( obj, predicate ) {
    var target = Array.isArray(obj) ? [] : {};
    for (var i in obj) {
        if (predicate.indexOf(i)) {
            target[i] = obj[i];
        }
    }
    return target;
};

/**
 * iterateNode constructor
 *
 * @param settings {jsObject} - javascript object
 * @property obj {jsObject|JSON} - Specify the element to parse
 * @property objFilterFunction {function} - Optional. A function to filter the object parsed.
 * @property elementFilterFunction {function} - Optional. A function to filter the object property.
 * @property asyncFunction {function} - Optional. A function called when a caret is clicked for the first time to receive the children object asynchronously
 * @property Key {String} - Optional. text on element .iterateNode-sanitize-key. Default 'key:'
 * @property Separator1 {String} - Optional. text on element .iterateNode-sanitize-separator1. Default ' -- '
 * @property Typeof {String} - Optional. text on element .iterateNode-sanitize-key-typeof. Default 'typeof:'
 * @property Separator2 {String} - Optional. text on element .iterateNode-sanitize-separator2. Default ' -- '
 * @property countObj {String} - Optional. the id of the list element after 'iterateNode-object-'. Default is ""
 * @property stringModel {String} - Optional. the json string model inserted in the "data-string-model" attribute of the element. Default is builded under the hood.
 * @property typeOfFilter {function} - Optional. The value instead of the stringified constructor ( passed as argument )
 * @returns {documentFragment} - See {@link https://developer.mozilla.org/it/docs/Web/API/DocumentFragment}
 */

var defaults = {
    countObj : "",
    stringModel : "",
    key : "key:",
    Separator1 : " -- ",
    Typeof : "typeof:",
    Separator2 : " -- ",
    Include : [],
    Exclude : [],
    sanitizedObjects : [
        "outerText",
        "innerText",
        "innerHTML",
        "outerHTML"
    ]
};
var iterateNode = function(settings){
    var docfrag = document.createDocumentFragment();
    var ul = document.createElement("ul");
    ul.className="iterateNode-obj";
    if( settings.name ){
        ul.id = settings.name;
        settings.name = null;
    }
    var typeNode = "";
    var count = 0;
    var alias = settings.filterFunction ? settings.filterFunction(settings.obj) : settings.obj;
    var flatArrays = settings.flatArrays;
    var options = merge(settings,defaults,true);

    for(var k in alias){
        var li = parsingNode(k,alias[k],options,count);
        ul.appendChild(li);
        count++;
    }


    docfrag.appendChild(ul);
    return docfrag;
};
/**
 * Created by Simone on 01/09/15.
 */
function merge(add,base,extension) {
    var target = Array.isArray(base) ? [] : {};
    for (var i in base) {
        var typeNode = Object.prototype.toString.call(base[k]);
        if ( ( typeNode == "[object Object]" || typeNode == "[object Array]" ) &&
               base[i] )
            target[i] = add[i] ? merge(add[i],base[i],extension) : base[i];
        else
            target[i] = add[i] || base[i];
    }
    // TODO Permit add keys to be included in target object
    if ( extension ){
        for (var k in add){
            target[k] = target[k] || add[k];
        }
    }

    return target;
}

/**
 * Created by Simone on 02/09/15.
 */
function parsingNode(k,node,options,count){
    var typeNode = Object.prototype.toString.call(node);
    var typeOfValue = typeNode;
    if ( options.typeOfFilter ){
        var newValues = options.typeOfFilter(typeNode,node);
        typeOfValue = newValues.typeofValue;
        node = newValues.node;
        typeNode = Object.prototype.toString.call(node);
    }
    var newStringModel = !options.stringModel.length ? k : options.stringModel + "?" + k;
    var newCountObject = options.countObj + count;
    var isInnerText = options.sanitizedObjects.indexOf(k) > -1 ? "node-iterator-text-content" : "";
    var contentEditable = options.contentEditable ? " contenteditable " : "";
    var contentEditableList = options.contentEditable && ( typeNode == "[object Object]" || typeNode == "[object Array]" ) ? "<span class='add-items'>+</span>" : "";
    var li = document.createElement("li");
    li.id="iterateNode-" + newCountObject;
    li.setAttribute("data-string-model", newStringModel);
    li.setAttribute("data-type-of", typeNode);
    li.className="iterateNode-" + typeNode.replace(/[\[\]]/g, "").replace(/\s+/,"-");
    li.innerHTML = "<span class='" + isInnerText +"'><i class='iterateNode-sanitize-key'>" + options.key +
        "</i><b class='iterateNode-sanitize-key-value'" + contentEditable + ">"+ k +
        "</b><span class='iterateNode-sanitize-separator1'>" + options.Separator1 + "</span>" +
        "<span class='iterateNode-sanitize-key-typeof'>" + options.Typeof + "</span>" +
        "<i class='iterateNode-sanitize-key-typeof-value' data-value='" + typeOfValue +"'>"+ typeOfValue + "</i>"+
        "</span>";

    if ( options.sanitizedObjects.indexOf(k) > -1 ) {// sanitizedObjects
        var sanitizedHTML = sanitize( node );
        li.innerHTML += "<pre class='iterateNode-sanitizedHTML'>" + sanitizedHTML + "</pre>";
    }
    else if( typeof node === "object" && node ) // all javascript objects
    {
        if ( ( ( typeNode == "[object Object]" || typeNode == "[object Array]" ) && !Object.keys(node).length ) &&
            !options.asyncFunction) {
            //return li;
        }
        else {
            var settingsChildren = merge({
                obj: node,
                stringModel: newStringModel,
                countObj: newCountObject
            }, options, true);
            var caretA = createCaret(li, settingsChildren);
            li.appendChild(caretA);
        }
    }
    else if ( options.sanitizedObjects.indexOf(k) < 0 ) // all javascript values except sanitizedObjects array values
        li.innerHTML += node != null ? "<span class='iterateNode-sanitize-separator2'>"+ options.Separator2 +
        "</span><b class='iterateNode-sanitize-value'" + contentEditable + ">" + node + "</b>" : " null";


    if(options.contentEditable){ // adding events for key/values changes
        eventsLabel(li,options,node,count,k,typeNode,newStringModel);
        eventRemoveItem(li,options);
    }

    if( options.contentEditable && contentEditableList ){ // adding contentEditable events
        eventsList(li,typeNode,options,contentEditableList,count,node,newStringModel,newCountObject);
    }


    return li;
}
/**
 * Created by Simone on 26/07/15.
 */
var sanitize = function(html){
    if ( html )
        return html
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
            //.replace(/"/g, "&quot;")
            //.replace(/'/g, "&#039;");
    else
        return html;
};

window.iterateNode = iterateNode;
})();