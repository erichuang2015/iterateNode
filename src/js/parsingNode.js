/**
 * Created by Simone on 02/09/15.
 */
function parsingNode(k,node,options,count){
    var typeNode = Object.prototype.toString.call(node);
    var newStringModel = !options.stringModel.length ? k : options.stringModel + "?" + k;
    var newCountObject = options.countObj + count;
    var isInnerText = options.sanitizedObjects.indexOf(k) > -1 ? "node-iterator-text-content" : "";
    var li = document.createElement("li");
    li.id="iterateNode-object-" + newCountObject;
    li.setAttribute("data-string-model", newStringModel);
    li.className="iterateNode-object";
    li.innerHTML = "<span class='" + isInnerText +"'><i class='iterateNode-sanitize-key'>" + options.key + "</i><b class='iterateNode-sanitize-key-value'>"+ k +
        "</b><span class='iterateNode-sanitize-separator1'>" + options.Separator1 + "</span>" +
        "<span class='iterateNode-sanitize-key-typeof'>" + options.Typeof + "</span>" +
        "<i class='iterateNode-sanitize-key-typeof-value'>"+ typeNode + "</i></span>";

    if( typeof node === "object" && node ) // all javascript objects
    {
        var settingsChildren = merge({
            obj:node,
            stringModel:newStringModel,
            countObj:newCountObject
        },options,true);
        var caretA = createCaret(li,settingsChildren);
        li.appendChild(caretA);
    }
    else if ( options.sanitizedObjects.indexOf(k) < 0 ) // all javascript values except sanitizedObjects array values
        li.innerHTML += node[k] ? "<span class='iterateNode-sanitize-separator2'>"+ options.Separator2 +"</span><b class='iterateNode-sanitize-value'>" + node[k] + "</b>" : " null";
    else if ( options.sanitizedObjects.indexOf(k) > -1 ) {// sanitizedObjects
        var sanitizedHTML = sanitize( node );
        li.innerHTML += "<pre class='iterateNode-sanitizedHTML'>" + sanitizedHTML + "</pre>";
    }
    return li;
}