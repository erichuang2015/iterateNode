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
	var dummy = document.getElementById("drag-highlight");
	function dragging(options) {
		var dragged = false;
		var target = false;
		var dropAfter = false;
		/* events fired on the draggable target */
		document.addEventListener("drag", function( event ) {
			event.preventDefault();
			event.stopPropagation();
		}, false);

		document.addEventListener("dragstart", function( event ) {
			if(event.target.nodeName.toLowerCase() != "li" )
				return;
			// store a ref. on the dragged elem
			dragged = event.target;
			// make it half transparent
			event.target.style.opacity = .5;
			event.dataTransfer.dropEffect = "move";
		}, false);

		document.addEventListener("dragend", function( event ) {
			// reset the transparency
			event.target.style.opacity = "";
			dummy.style.display = "none";
			event.dataTransfer.setData("dragging", "false");
			console.log("dragend");
		}, false);

		document.addEventListener("dragexit", function( event ) {
			// reset the transparency
			event.target.style.opacity = "";
			dummy.style.display = "none";
			event.dataTransfer.setData("dragging", "false");
			console.log("dragexit");
		}, false);

		/* events fired on the drop targets */
		document.addEventListener("dragover", function( event ) {
			// prevent default to allow drop
			event.preventDefault();
			event.stopPropagation();
			event.dataTransfer.dropEffect = "move";

		}, false);

		document.addEventListener("dragenter", function( event ) {
			event.preventDefault();
			event.stopPropagation();
			if(target)
				target.style.background = "";
			// highlight potential drop target when the draggable element enters it
			if(event.target.nodeName.toLowerCase() != "li" ) {
					target = findUpTag(event.target, "li");
					if(!target) return;
					dropAfter = true;
			}
			else {
				target = event.target;
				dropAfter = false;
			}
			var position = offset(target);
			dummy.style.width = ( target.offsetWidth + position.left ) + "px";
			dummy.style.top = ( position.top + target.offsetHeight + 7 ) + "px";
			dummy.style.display = "block";
			target.style.background = "purple";
			event.dataTransfer.setData("dragging", "true");
		}, false);

		document.addEventListener("dragleave", function( event ) {
			// reset background of potential drop target when the draggable element leaves it
			//event.target.style.background = "";
			//if(dragged) dragged.style.opacity = "";
			//if(target) target.style.background = "";
			//event.dataTransfer.setData("dragging", "false");

			console.log("dragleave");

		}, false);

		document.addEventListener("drop", drop, true);

		function drop(event){
			// prevent default action (open as link for some elements)
			event.preventDefault();
			event.stopPropagation();

			/* non si possono droppare tutti gli elememti in un array, solo gli elementi che sono array */
			/*var targetIsArray = target.getAttribute("data-type-of") == "[object Array]";
			 var draggedIsArrayElement = window.getComputedStyle( dragged.querySelector("span > .iterateNode-sanitize-key-value") ).display != "none";
			 if( !targetIsArray && !draggedIsArrayElement){
			 event.dataTransfer.dropEffect = "none"
			 event.target.style.opacity = "";
			 if(target)
			 target.style.background = "";
			 dummy.style.display = "none";
			 return;
			 }*/
			// move dragged elem to the selected drop target
			var draggedStringModel = dragged.getAttribute("data-string-model");
			var key = draggedStringModel.split(stringModelSeparator);
			var draggedPosition = returnParamFromString(draggedStringModel,originalObject);
			/* DROP is fired multiple times in nested elements */
			/* TODO is this possibile to avoid? */
			if(typeof draggedPosition === "undefined")
				return;
			var eventTargetStringModel = target.getAttribute("data-string-model");
			var lastTargetStringModel = eventTargetStringModel.split(stringModelSeparator);
			console.log("draggedStringModel, eventTargetStringModel", draggedStringModel, eventTargetStringModel);
			console.log("draggedPosition", draggedPosition);

			deleteParamFromString(draggedStringModel, originalObject);
			dropAfter = !dropAfter && !target.querySelector("ul") ? true : dropAfter;

			if(dropAfter){
				var parentStringNode = lastTargetStringModel.slice(0,lastTargetStringModel.length-1).join(stringModelSeparator);
				console.log("parentStringNode",parentStringNode);
				createKeyFromString(parentStringNode, originalObject, key[key.length-1], draggedPosition);
				dragged.parentNode.removeChild( dragged );
				target.parentNode.appendChild( dragged );
			}
			else {
				createKeyFromString(eventTargetStringModel, originalObject, key[key.length - 1], draggedPosition);
				dragged.parentNode.removeChild( dragged );
				target.querySelector("ul").appendChild( dragged );
			}
			/* reset styles */
			dragged.style.opacity = "";
			target.style.background = "";
			dummy.style.display = "none";
		}
	}

/**
 * Created by simone.dinuovo on 03/05/2017.
 */
function eventsList(li,typeNode,options,contentEditableList,count,node,newStringModel,newCountObject) {
    li.insertAdjacentHTML('beforeend', contentEditableList);
    addItems = li.querySelector('.add-items');
    var ourStringModel = li.getAttribute("data-string-model");
    var $this = returnParamFromString(ourStringModel,options.originalObject);
    addItems.addEventListener('click', function (e) {
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
            assignParamFromString(ourStringModel, options.originalObject, newValue);
            var $this = returnParamFromString(ourStringModel,options.originalObject);
            var parentNode = li.parentNode;
            options.stringModel = parentNode.parentNode.getAttribute("data-string-model");
            var newLi = parsingNode(k,newValue,options,count);
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

function findUpTag(el, tag) {
    console.log("el, el.parentNode ",el, el.parentNode)
    while (el.parentNode) {
        el = el.parentNode;
        if (el.nodeName.toLowerCase() == tag)
            return el;
    }
    return null;
}
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
    stringModelSeparator : "?",
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
var originalObject = {};
var stringModelSeparator = "";
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
    if(!settings.originalObject) settings.originalObject = settings.obj;
    originalObject = settings.originalObject;
    var options = merge(settings,defaults,true);
    stringModelSeparator = options.stringModelSeparator;

    for(var k in alias){
        var li = parsingNode(k,alias[k],options,count);
        ul.appendChild(li);
        count++;
    }


    docfrag.appendChild(ul);
    if( options.contentEditable && options.dragging && !options["dragging-init"]) {
        options["dragging-init"] = true;
        dragging(options);
    }
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
 * Created by Simone on 25/12/14.
 */
function offset(elem){

    var box = { top: 0, left: 0 };
    var docElem = document.documentElement;
    var win = window;
    var core_strundefined = typeof undefined;
    // If we don't have gBCR, just use 0,0 rather than error
    // BlackBerry 5, iOS 3 (original iPhone)
    if ( typeof elem.getBoundingClientRect !== core_strundefined ) {
        box = elem.getBoundingClientRect();
    }

    return {
        top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
        left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
    };
}



(function() {
    var throttle = function(type, name, obj) {
        obj = obj || window;
        var running = false;
        var func = function() {
            if (running) { return; }
            running = true;
            requestAnimationFrame(function() {
                obj.dispatchEvent(new CustomEvent(name));
                running = false;
            });
        };
        obj.addEventListener(type, func);
    };

    /* init - you can init any event */
    throttle("resize", "optimizedResize");
})();

// handle event
/*
window.addEventListener("optimizedResize", function() {
    console.log("Resource conscious resize callback!");
});
*/

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
    var newStringModel = !options.stringModel || !options.stringModel.length ? k : options.stringModel + "?" + k;
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

    if( options.contentEditable && options.dragging)
        li.setAttribute("draggable","true");

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