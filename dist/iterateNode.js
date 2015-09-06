(function(){

    /**
     *
     * @param string - the string representation of object
     * @param root - the root object
     * @param value - value to assign
     */
    function assignParamFromString(string, root, value) {
        var model = string.split('.');
        var actualModel = root;
        for (var i = 0; i < model.length - 1; i++)
            actualModel = actualModel[model[i]];

        actualModel[model[model.length - 1]] = value;
    }

    function returnParamFromString(string, root) {
        if ( !string )
            return root;

        var model = string.split('.');
        var actualModel = root;
        for (var i = 0; i < model.length; i++)
            actualModel = actualModel[model[i]];

        return actualModel
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
//var iterateNode = function(jsObject,filterFunction, countObj,stringModel){
var iterateNode = function(settings){
    var docfrag = document.createDocumentFragment();
    var ul = document.createElement("ul");
    ul.className="iterateNode-obj";
    var typeNode = "";
    var count = 0;
    var alias = settings.filterFunction ? settings.filterFunction(settings.obj) : settings.obj;
    var flatArrays = settings.flatArrays;
    var options = merge(settings,defaults,true);
    /*if( flatArrays && Array.isArray(alias) )
        for(count = 0;i<alias.length;count++){
            for(var inner = 0;inner<alias[count].length;inner++)
                ul.appendChild( parsingNode(inner,alias[count][inner],options,count) );
        }
    else*/
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
    var li = document.createElement("li");
    li.id="iterateNode-object-" + newCountObject;
    li.setAttribute("data-string-model", newStringModel);
    li.className="iterateNode-object-" + typeNode.replace(/[\[\]]/g, "").replace(/\s+/,"-");
    li.innerHTML = "<span class='" + isInnerText +"'><i class='iterateNode-sanitize-key'>" + options.key + "</i><b class='iterateNode-sanitize-key-value'>"+ k +
        "</b><span class='iterateNode-sanitize-separator1'>" + options.Separator1 + "</span>" +
        "<span class='iterateNode-sanitize-key-typeof'>" + options.Typeof + "</span>" +
        "<i class='iterateNode-sanitize-key-typeof-value'>"+ typeOfValue + "</i></span>";

    if ( options.sanitizedObjects.indexOf(k) > -1 ) {// sanitizedObjects
        var sanitizedHTML = sanitize( node );
        li.innerHTML += "<pre class='iterateNode-sanitizedHTML'>" + sanitizedHTML + "</pre>";
    }
    else if( typeof node === "object" && node ) // all javascript objects
    {
        if ( ( ( typeNode == "[object Object]" || typeNode == "[object Array]" ) && !Object.keys(node).length ) &&
            !options.asyncFunction)
            return li;

        var settingsChildren = merge({
            obj:node,
            stringModel:newStringModel,
            countObj:newCountObject
        },options,true);
        var caretA = createCaret(li,settingsChildren);
        li.appendChild(caretA);
    }
    else if ( options.sanitizedObjects.indexOf(k) < 0 ) // all javascript values except sanitizedObjects array values
        li.innerHTML += node ? "<span class='iterateNode-sanitize-separator2'>"+ options.Separator2 +"</span><b class='iterateNode-sanitize-value'>" + node + "</b>" : " null";

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