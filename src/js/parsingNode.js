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