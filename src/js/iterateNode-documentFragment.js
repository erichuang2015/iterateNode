/**
 * iterateNode constructor
 *
 * @param settings {jsObject} - javascript object
 * @param stringModel {String} - Optional. the json string model inserted in the "data-string-model" attribute of the element. Default is builded under the hood.
 * @property obj {jsObject|JSON} - Specify the element to parse
 * @property filterFunction {function} - Optional. A function called when a caret is clicked, designed for async calls
 * @property Include {jsObject} - Optional. Print key results including only the values of this object
 * @property Exclude {jsObject} - Optional. Print key results ignoring the values of this object
 * @property Key {String} - Optional. text on element .iterateNode-sanitize-key. Default 'key:'
 * @property Separator1 {String} - Optional. text on element .iterateNode-sanitize-separator1. Default ' -- '
 * @property KeyTypeof {String} - Optional. text on element .iterateNode-sanitize-key-typeof. Default 'typeof:'
 * @property Separator2 {String} - Optional. text on element .iterateNode-sanitize-separator2. Default ' -- '
 * @property countObj {String} - Optional. the id of the list element after 'iterateNode-object-'. Default is ""
 * @returns {documentFragment} - See {@link https://developer.mozilla.org/it/docs/Web/API/DocumentFragment}
 */
//var iterateNode = function(jsObject,filterFunction, countObj,stringModel){

var iterateNode = function(settings,stringModel){
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
    var countObj = settings.countObj ? settings.countObj : "";
    var stringModel = stringModel ? stringModel : "";
    for(var k in settings.obj){
        //(function(k){
        typeNode = Object.prototype.toString.call(settings.obj[k]);
        var newStringModel = !stringModel.length ? k : stringModel + "?" + k;
        var li = document.createElement("li");
        li.id="iterateNode-object-" + countObj + count;
        li.setAttribute("data-string-model", newStringModel);
        li.className="iterateNode-object";
        li.innerHTML = "<b class='iterateNode-sanitize-key'>" + ( typeof settings.Key !== 'undefined' ? settings.Key  : "key:") + "</b><i class='iterateNode-sanitize-key-value'>"+ k +
             "</i><span class='iterateNode-sanitize-separator1'> -- </span>" +
             "<b class='iterateNode-sanitize-key-typeof'>typeof:</b>" +
             "<i class='iterateNode-sanitize-key-typeof-value'>"+ typeNode + "</i>";

        if( typeof settings.obj[k] === "object" && settings.obj[k] )
        {
            var caretA = createCaret(li,settings.obj[k],countObj + count,newStringModel,settings.filterFunction);
            li.appendChild(caretA);
        }
        else if ( sanitizedObjects.indexOf(k) < 0 )
            li.innerHTML += settings.obj[k] ? "<span class='iterateNode-sanitize-separator2'> -- </span>" + settings.obj[k] : " null";
        else if ( sanitizedObjects.indexOf(k) > -1 )
        {
            var sanitizedHTML = sanitize( settings.obj[k] );
            li.innerHTML += "<pre class='iterateNode-sanitizedHTML'>" + sanitizedHTML + "</pre>";
        }
        ul.appendChild(li);
        count++;
        //})(k);
    }
    docfrag.appendChild(ul);
    return docfrag;
};