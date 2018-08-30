(function(){
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
//render in select
function returnDataTypes(elem){

    var select = document.createElement("select");
    select.classList.add("iterate-node__hide");
    for(var k in iterateNodeDataTypes){
        var option = document.createElement("option");
        option.value = k;
        select.options.add(new Option(iterateNodeDataTypes[k].label, k));
    }
    return select;
}
var defaults = {
    separator : ".",
    contentEditable : {
        add : false,
        delete : false,
        key : false,
        value: false,
        selection : false,
        drag : false,
        type : false
    },
    appendElements : {},
    map : false,
    dataKeyOnDOM : '__iterate-node-data__'
};

var methods = {
    addElement : addElement,
    changeKeyOrValue : changeKeyOrValue,
    changeType : changeType,
    deleteElement : deleteElement,
    openObject : openObject,
    iteration : ITERATION,
    template : TEMPLATE
}
function dragging(HandlerEl) {
        var $super = this;
        var dragging = false;
        var target, cloneNodes = [],targetLi,targetType;
        var dummy = document.querySelector(".iterate_node__dummy");
        if(!dummy) {
            dummy = document.createElement("div");
            dummy.classList.add("iterate_node__dummy");
            document.body.appendChild(dummy);
        }
        var highlight = document.querySelector(".iterate-node__drag-position");
        if(!highlight) {
            highlight = document.createElement("div");
            highlight.classList.add("iterate-node__drag-position");
            document.body.appendChild(highlight);
        }

        function Down(e){
            if(dragging
                || !e.target.classList.contains("iterate-node__drag")
                || !isDescendant(HandlerEl,e.target))
                return;
            dragging = true;
            var li = e.target.parentElement;
            var clone = li.cloneNode(true);
            if(clone.querySelector("ul") ) clone.removeChild(clone.querySelector("ul"));
            cloneNodes.push({
                original : li,
                clone : clone
            });
            for(var k in cloneNodes)
                dummy.appendChild(cloneNodes[k].clone);
            dummy.style.transform = "translate(" + e.x + "px," + e.y + "px)";
        }
        function Move(e){
            if(!dragging
                || !isDescendant(HandlerEl,e.target))
                return;

            target = e.target;
            var targetNodeName = target.nodeName.toLowerCase();
            var parentNodeName = target.parentElement.nodeName.toLowerCase();
            targetLi = targetNodeName == "li" ?
                target :
                ( parentNodeName == "li" ?
                    target.parentElement :
                    false);
            if(!targetLi)
                return;

            var height = 0;
            if( targetNodeName == "ul"){
                var caret = targetLi.querySelector('.iterate-node__caret');
                height = targetLi.offsetHeight;
            }
            dummy.style.transform = "translate(" + (e.x + 1) + "px," + (e.y +1) + "px)";
            var position = offset(targetLi);
            highlight.style.width = ( targetLi.offsetWidth + position.left ) + "px";
            highlight.style.transform = "translate(0," + ( position.top + height ) + "px)";
        }
        function Up(e){
            if(!dragging )
                return;
            if(isDescendant(HandlerEl,e.target) && targetLi)
                for(var k in cloneNodes) {
                    var original = cloneNodes[k].original;
                    if(original == targetLi  || isDescendant(original,targetLi))
                        continue;

                    var key = original[defaults.dataKeyOnDOM].key;
                    deleteElement(original);
                    var value = original[defaults.dataKeyOnDOM].value;
                    var liToPrepend = target.nodeName.toLowerCase() == "ul" ?
                        false :
                        targetLi;
                    var li = typeof targetLi[defaults.dataKeyOnDOM].key === "undefined" ||
                        target.nodeName.toLowerCase() == "ul" ?
                        targetLi :
                        targetLi.parentElement.parentElement;

                    addElement(li,liToPrepend,value,key,original);

                }
            dragging = false;
            dummy.innerHTML = "";
            cloneNodes = [];
            dummy.style.transform = "translate(-9999px,-9999px)";
            highlight.style.transform = "translate(-9999px,-9999px)";
        }

        // TO DO : MOVE IN A SEPARATE FILE ( CORE FUNCTIONALITY OF MANY ELEMENTS )
        // desktop case
        var desktop = function(){
            function mousedown(e){
                var ev = {
                    x : e.pageX,
                    y : e.pageY,
                    target : e.target
                };
                Down(ev);
            }
            HandlerEl.addEventListener("mousedown",mousedown);
            function mouseup(e){
                var ev = {
                    x : e.pageX,
                    y : e.pageY,
                    target : e.target
                };
                Up(ev);
            }
            document.addEventListener("mouseup",mouseup);
            function mousemove(e){
                var ev = {
                    x : e.pageX,
                    y : e.pageY,
                    target : e.target
                };
                Move(ev);
            }
            document.addEventListener('mousemove',mousemove);
            $super.destroy = function(){
                HandlerEl.removeEventListener("mousedown",mousedown);
                document.removeEventListener("mouseup",mouseup);
                document.removeEventListener('mousemove',mousemove);
            }
        };

        // Mobile case
        var mobile = function() {

            function touchstart(e){
                var ev = {
                    x : e.changedTouches[0].pageX,
                    y : e.changedTouches[0].pageY,
                    target : e.target
                };
                Down(ev);
                document.addEventListener('touchend', touchend,false);
                document.addEventListener('touchmove', touchend,false);
            }

            // listeners
            HandlerEl.addEventListener('touchstart', touchstart,{passive:true});
            function touchmove(e){
                var ev = {
                    x : e.changedTouches[0].pageX,
                    y : e.changedTouches[0].pageY,
                    target : document.elementFromPoint(e.changedTouches[0].pageX, e.changedTouches[0].pageY)
                };
                Move(ev);
            }
            function touchend(e){
                var ev = {
                    x : e.changedTouches[0].pageX,
                    y : e.changedTouches[0].pageY,
                    target : e.target
                };
                Up(ev);
                document.removeEventListener('touchend', touchend);
                document.removeEventListener('touchmove',touchmove,{passive:false});
            }

            $super.destroy = function(){
                HandlerEl.removeEventListener('touchstart', touchstart);
            }
        };



        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )
            mobile();
        else
            desktop();
}
function elementRoot(obj){
    /* main LI */
    var ul = document.createElement("ul");
    var li = document.createElement("li");

    var renderObj = defaults.map ? defaults.map(obj) : obj;
    li[defaults.dataKeyOnDOM] = {
        value : renderObj,
        alias : obj
    };
    if (defaults.alias)
        spanAlias(li,defaults.alias(obj));
    if (defaults.contentEditable.add) {
        spanAddItem(li);
    }
    ul.appendChild(li);
    return ul;
}
function spanAddItem(li,obj) {
    var add = document.createElement("span");
    add.classList.add("iterate-node__add-item");
    add.textContent = "+";
    add.addEventListener("click", function(e){
        addElement(li,null,null,undefined,null)
    });
    li.appendChild(add);
}
function spanAlias(li,text) {
    var alias = document.createElement("span");
    alias.classList.add("iterate-node__alias");
    alias.innerHTML = text;
    li.appendChild(alias);
}
function spanCaret(li) {
    var $self = this;
    var caret = document.createElement("span");
    caret.classList.add("iterate-node__caret");
    caret.addEventListener('click', openObject);
    li.appendChild(caret);
}
function spanElementDelete(li) {
        var deleteElem = document.createElement("span");
        deleteElem.innerText = "-";
        deleteElem.addEventListener("click",
            deleteElement.bind(null,li));
        li.appendChild(deleteElem);
}
function spanForDrag(li) {
    /* add span for Drag */
    var spanForDrag = document.createElement("span");
    spanForDrag.classList.add("iterate-node__drag");
    spanForDrag.innerText = "D";
    li.appendChild(spanForDrag);
}
function spanForKey(li,key,parentElement,typeNode) {
    /* span for key */
    var keyElem = document.createElement("span");
    keyElem.classList.add("iterate-node__key");
    keyElem.innerText = key;
    // if editable, adding contenteditable and correlate event
    if (defaults.contentEditable.key && !Array.isArray(parentElement)) {
        keyElem.setAttribute("contenteditable","true");
        keyElem.addEventListener("blur", changeKeyOrValue.bind(null,li,typeNode,true));
    }
    li.appendChild(keyElem);
}
function spanForTypeof(li,typeNode,key) {
    /* span for typeof */
    var typeOfElem = document.createElement("span");
    typeOfElem.classList.add("iterate-node__type-node");
    typeOfElem.innerText = typeNode;
    li.appendChild(typeOfElem);
    // if editable, adding event on click and select for choose type
    if (defaults.contentEditable.type) {
        typeOfElem.addEventListener("click", changeTypeEnable);
        var sel = returnDataTypes();
        li.appendChild(sel);
        sel.addEventListener("blur", changeType.bind(null))
    }

}
function spanSeparator(li) {
    /* add span separator */
    var spanSeparator = document.createElement("span");
    spanSeparator.innerText = ":";
    spanSeparator.classList.add("iterate-node__separator");
    li.appendChild(spanSeparator);
}
function spanValue(li,value,typeNode) {
    var valueElem = document.createElement("span");
    valueElem.classList.add("iterate-node__value");
    valueElem.textContent = "" + value;
    if (defaults.contentEditable.value) {
        valueElem.setAttribute("contenteditable","true");
        valueElem.addEventListener("blur",
            changeKeyOrValue.bind(null,li,typeNode,false))
    }
    li.appendChild(valueElem);
}
function isDescendant(parent, child) {
    var node = child.parentNode;
    while (node != null) {
        if (node == parent) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
}
function iterateNode(targetElement,settings) {
    var $self = this;
    defaults = $self.defaults =
        settings ? merge(settings,defaults,true) : defaults;
    $self.state = defaults.obj;
    $self.methods = methods;
    var DOMrepresentation = ITERATION(defaults.obj);
    var rootRepresentation = elementRoot(defaults.obj);
    rootRepresentation.children[0].appendChild(DOMrepresentation);
    targetElement.className += " iterateNode-obj";
    targetElement.appendChild(rootRepresentation);

    if( defaults.contentEditable.drag )
        dragging.call(this,targetElement);

    return $self;
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
    if ( extension ){
        for (var k in add){
            target[k] = target[k] || add[k];
        }
    }

    return target;
}

function addElement(li,liToPrepend,value,key,liToClone,alias){
    var elm = li[defaults.dataKeyOnDOM].value;
    // if no container, create
    var container = li.querySelector("ul");
    // open the caret
    var caret = li.querySelector('.iterate-node__caret');
    if( caret ) {
        if(!container) {
            caret.click();
            container = li.querySelector("ul");
        }
        if (!caret.classList.contains('open'))
            caret.classList.add('open');
    }

    var index,newValue,newKey;

    if(Array.isArray(elm)) {
        if(typeof key === "undefined") {
            value = "value";
            key = elm.length;
        }

        if(liToPrepend) {
            index = Array.prototype.indexOf.call(
                liToPrepend.parentElement.children, liToPrepend);
            var parentElementLength = liToPrepend.parentElement.children.length;
            for (var ii = index; ii < parentElementLength; ii++) {
                var childLI = liToPrepend.parentElement.children[ii];
                childLI[defaults.dataKeyOnDOM].key = ii+1;
                childLI.querySelector(".iterate-node__key").innerText = ii+1;
            }
            elm.splice(index, 0, value);
            if(liToClone) {
                liToClone.querySelector(".iterate-node__key").innerText = index;
                liToClone[defaults.dataKeyOnDOM].key = index;
            }
            key = index;
        }
        else {
            if(liToClone) {
                liToClone.querySelector(".iterate-node__key").innerText = elm.length;
                liToClone[defaults.dataKeyOnDOM].key = elm.length;
            }
            elm[elm.length] = value;
        }
    }
    else {
        if(typeof key === "undefined") {
            // every newItem key must have "newItem" + maxNumber as key
            var number = 0;
            for (var k in elm) {
                if (k.indexOf("newItem") === 0) {
                    var itemNumber = Number(k.replace("newItem", ""));
                    number = !isNaN(itemNumber) && number < itemNumber ? itemNumber : number;
                }
            }
            value = "value";
            key = "newItem" + ( number + 1 );
        }
        else {
            while (Object.keys(elm).indexOf(key) > -1)
                key = key + Math.floor(Math.random() * (9007199254740991));

            if(liToClone) {
                liToClone.querySelector(".iterate-node__key").innerText = key;
                liToClone[defaults.dataKeyOnDOM].key = key;
            }
        }
        // insertment
        if(liToPrepend) {
            var keyToPrepend = liToPrepend[defaults.dataKeyOnDOM].key;
            var temp = JSON.parse(JSON.stringify(elm));
            for (var OldesKey in elm)
                delete elm[OldesKey];
            for (var copyKey in temp) {
                if (copyKey == keyToPrepend) {
                    elm[key] = value;
                    elm[copyKey] = temp[copyKey];
                }
                else
                    elm[copyKey] = temp[copyKey];
            }
        }
        else
            elm[key] = value;
    }
    if(liToClone)
        liToClone[defaults.dataKeyOnDOM].parentElement = elm;

    var newElementDOM = liToClone ? liToClone :
        TEMPLATE(key, value, elm, alias || null);
    if(liToPrepend) {
        liToPrepend.parentElement.insertBefore(
            newElementDOM,
            liToPrepend
        );
    }
    else {
        container.appendChild(newElementDOM)
    }
    defaults.addElementListener &&
    defaults.addElementListener(newElementDOM[defaults.dataKeyOnDOM],
        li[defaults.dataKeyOnDOM],
        liToPrepend ? liToPrepend[defaults.dataKeyOnDOM] : false);
}
function changeKeyOrValue(li,typeNode,isKey,e) {
    var thisTarget = e.target;
    var parentElement = li.parentElement.parentElement[defaults.dataKeyOnDOM].value;
    var innerText = thisTarget.innerText;
    if(isKey) {
        while (Object.keys(parentElement).indexOf(innerText) > -1)
            innerText = innerText + Math.floor(Math.random() * (9007199254740991));

        li[defaults.dataKeyOnDOM].key = innerText;
        thisTarget.innerText = innerText;
        defaults.changeKeyListener && defaults.changeKeyListener(li[defaults.dataKeyOnDOM]);
    }
    else{
        // number sanitation
        switch(typeNode) {
            case ("[object Number]") :
                // Number : if is NaN, is 0
                innerText = isNaN(Number(innerText)) ?
                    0 : Number(innerText);
                break;
            case ("[object Boolean]") :
                // boolean : if is not 'true', then is false
                innerText = ( innerText.toLowerCase() == "true" );
                break;
            default:
                break;
        }
        li[defaults.dataKeyOnDOM].value = innerText;
        defaults.changeValueListener && defaults.changeValueListener(li[defaults.dataKeyOnDOM]);
    }
}
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

function deleteElement(li){
    var parentElm = li[defaults.dataKeyOnDOM].parentElement;
    var keyElm = li[defaults.dataKeyOnDOM].key;
    if(Array.isArray(parentElm)) {
        var parentElement = li.parentElement;
        var index = Array.prototype.indexOf.call(parentElement.children, li);
        var parentElementLength = parentElement.children.length;
            for (var ii = index+1; ii < parentElementLength; ii++) {
                var childLI = parentElement.children[ii];
                childLI[defaults.dataKeyOnDOM].key = ii-1;
                childLI.querySelector(".iterate-node__key").innerText = ii-1;
            }
        parentElm.splice(index,1);
    }
    else
        delete parentElm[keyElm];
    defaults.removeElementListener && defaults.removeElementListener(li[defaults.dataKeyOnDOM]);
    li.parentElement.removeChild(li);
}
function ITERATION (obj) {
    var DOMrepresentation = document.createElement("ul");
    if(defaults.map) {
        var newObj = defaults.map(obj);
        for (var k in newObj) {
            DOMrepresentation.appendChild(
                TEMPLATE(k,newObj[k].value, newObj,newObj[k].alias));
        }
    }
    else
        for (var k in obj) {
            DOMrepresentation.appendChild(TEMPLATE(k, obj[k], obj));
        }

    return DOMrepresentation;
}
function openObject(e){
        var target = e.target;
        var li = target.parentElement;
        var ul = li.querySelector("ul");
        if (!ul){
            var newObj= li[defaults.dataKeyOnDOM].value;
            var newUl = ITERATION(newObj);
            li.appendChild(newUl);
        }

        target.classList.toggle('open');
}
function TEMPLATE (key,value,parentElement,alias){
    var typeNode = Object.prototype.toString.call(value);
    /* main LI */
    var li = document.createElement("li");
    li[defaults.dataKeyOnDOM] = {
        key : key,
        value : value,
        parentElement : parentElement,
        alias : alias
    };
    if( defaults.contentEditable.drag )
        spanForDrag(li);
    spanForKey(li,key,parentElement,typeNode);
    spanForTypeof(li,typeNode,key);
    spanSeparator(li);
    if (defaults.alias)
        spanAlias(li,defaults.alias(alias));
    /*if (typeNode == "[object Object]" ||
        typeNode == "[object Array]" ) {*/
    if(value && typeof value === 'object'){
        spanCaret(li);

        if (defaults.contentEditable.add)
            spanAddItem(li);
    }
    else
        if(!defaults.alias) spanValue(li,value,typeNode);
    /* adding delete element */
    if (defaults.contentEditable.delete)
        spanElementDelete(li);

    if (Object.keys(defaults.appendElements).length)
        for(var k in defaults.appendElements)
            defaults.appendElements[k](key,value);

    return li;
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



window.iterateNode = iterateNode;
})();