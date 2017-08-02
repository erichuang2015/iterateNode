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