/**
 * iterateNode constructor
 *
 * @param settings {jsObject} - javascript object
 * @param stringModel {String} - Optional. the json string model inserted in the "data-string-model" attribute of the element. Default is builded under the hood.
 * @property obj {jsObject|JSON} - Specify the element to parse
 * @property filterFunction {function} - Optional. A function called when a caret is clicked, designed for async calls
 * @property Include {Array} - Optional. Print key results including only the values of this object
 * @property Exclude {Array} - Optional. Print key results ignoring the values of this object
 * @property Key {String} - Optional. text on element .iterateNode-sanitize-key. Default 'key:'
 * @property Separator1 {String} - Optional. text on element .iterateNode-sanitize-separator1. Default ' -- '
 * @property Typeof {String} - Optional. text on element .iterateNode-sanitize-key-typeof. Default 'typeof:'
 * @property Separator2 {String} - Optional. text on element .iterateNode-sanitize-separator2. Default ' -- '
 * @property countObj {String} - Optional. the id of the list element after 'iterateNode-object-'. Default is ""
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
    Exclude : []
}
//var iterateNode = function(jsObject,filterFunction, countObj,stringModel){
var iterateNode = function(settings){
    var docfrag = document.createDocumentFragment();
    var ul = document.createElement("ul");
    ul.className="iterateNode-obj";
    var typeNode = "";
    var sanitizedObjects = [
        "outerText",
        "innerText",
        "innerHTML",
        "outerHTML"
    ];
    var count = 0;

    var options = merge(settings,defaults,true);
    /*var countObj = settings.countObj ? settings.countObj : "";
    var stringModel = settings.stringModel ? settings.stringModel : "";
    var key = settings.Key  ? settings.Key  : "key:";
    var Separator1 = settings.Separator1  ? settings.Separator1  : " -- ";
    var Typeof = settings.Typeof  ? settings.Typeof  : "typeof:";
    var Separator2 = settings.Separator2  ? settings.Separator2  : " -- ";
    var Include = settings.Include  ? settings.Include  : [];
    var Exclude = settings.Exclude  ? settings.Exclude  : [];*/
    for(var k in options.obj){
        //(function(k){
        if (options.Include.length && options.Include.indexOf(k) < 0 ||
            options.Exclude.indexOf(k) > 0 )
            continue;

        typeNode = Object.prototype.toString.call(options.obj[k]);
        var newStringModel = !options.stringModel.length ? k : options.stringModel + "?" + k;
        var newCountObject = options.countObj + count;
        var li = document.createElement("li");
        li.id="iterateNode-object-" + newCountObject;
        li.setAttribute("data-string-model", newStringModel);
        li.className="iterateNode-object";
        li.innerHTML = "<b class='iterateNode-sanitize-key'>" + options.key + "</b><i class='iterateNode-sanitize-key-value'>"+ k +
             "</i><span class='iterateNode-sanitize-separator1'>" + options.Separator1 + "</span>" +
             "<b class='iterateNode-sanitize-key-typeof'>" + options.Typeof + "</b>" +
             "<i class='iterateNode-sanitize-key-typeof-value'>"+ typeNode + "</i>";

        if( typeof options.obj[k] === "object" && options.obj[k] ) // all javascript objects
        {
            var settingsChildren = merge({
                obj:options.obj[k],
                stringModel:newStringModel,
                countObj:newCountObject
            },options,true);
            var caretA = createCaret(li,settingsChildren);
            li.appendChild(caretA);
        }
        else if ( sanitizedObjects.indexOf(k) < 0 ) // all javascript values except sanitizedObjects array values
            li.innerHTML += settings.obj[k] ? "<span class='iterateNode-sanitize-separator2'>"+ options.Separator2 +"</span>" + settings.obj[k] : " null";
        else if ( sanitizedObjects.indexOf(k) > -1 ) {// sanitizedObjects
            var sanitizedHTML = sanitize( options.obj[k] );
            li.innerHTML += "<pre class='iterateNode-sanitizedHTML'>" + sanitizedHTML + "</pre>";
        }
        ul.appendChild(li);
        count++;
        //})(k);
    }
    docfrag.appendChild(ul);
    return docfrag;
};