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
 * @property stringModel {String} - Optional. the json string model inserted in the "data-string-model" attribute of the element. Default is builded under the hood.
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
}
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