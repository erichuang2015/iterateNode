(function(){
function createCaret(li,jsObject,countObj,stringModel,filterFunction){
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
            var newId = countObj+"-";
            if ( filterFunction ){
                var newjsObject = filterFunction(li.getAttribute("data-string-model"),
                    function(newObject){
                        li.appendChild( iterateNode(newObject, filterFunction,newId,stringModel) );
                    }
                );

            }
            else
                li.appendChild( iterateNode(jsObject, filterFunction,newId,stringModel) );
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
var iterateNode = function(jsObject,filterFunction, countObj,stringModel){
    var docfrag = document.createDocumentFragment();
    var ul = document.createElement("ul");
    var typeNode = "";
    var sanitizedObjects = [
        "outerText",
        "innerText",
        "innerHTML",
        "outerHTML"
    ];
    var count = 0;
    var countObj = countObj ? countObj : "";
    var stringModel = stringModel ? stringModel : "";
    for(var k in jsObject){
        (function(k){
            //typeNode = Object.prototype.toString.call(jsObject[k]);
            typeNode = Object.prototype.toString.call(jsObject[k]);
            //var syntax = Array.isArray( jsObject ) ? "[" + k + "]" : "." + k;
            var newStringModel = !stringModel.length ? k : stringModel + "?" + k;
            var li = document.createElement("li");
            li.id="iterateNode-object-" + countObj + count;
            li.setAttribute("data-string-model", newStringModel);
            li.className="iterateNode-object";
            //<b class='iterateNode-sanitize-key'>key:</b>
            //<b class='iterateNode-sanitize-key-typeof'>typeof:</b>
            li.innerHTML = "<b class='iterateNode-sanitize-key'>key:</b><i class='iterateNode-sanitize-key-value'>"+ k +
                 "</i><span class='iterateNode-sanitize-separator1'> -- </span>" +
                 "<b class='iterateNode-sanitize-key-typeof'>typeof:</b>" +
                 "<i class='iterateNode-sanitize-key-typeof-value'>"+ typeNode + "</i>";

            if( typeof jsObject[k] === "object" && jsObject[k] )
            {
                var caretA = createCaret(li,jsObject[k],countObj + count,newStringModel,filterFunction);
                li.appendChild(caretA);
            }
            else if ( sanitizedObjects.indexOf(k) < 0 ){
                li.innerHTML += jsObject[k] ? "<span class='iterateNode-sanitize-separator2'> -- </span>" + jsObject[k] : " null";
            }
            else if ( sanitizedObjects.indexOf(k) > -1 )
            {
                var sanitizedHTML = sanitize( jsObject[k] );
                li.innerHTML += "<pre class='iterateNode-sanitizedHTML'>" + sanitizedHTML + "</pre>";
            }
            ul.appendChild(li);
            count++;
        })(k);
    }

    docfrag.appendChild(ul);
    return docfrag;
};
/**
 * Created by Simone on 26/07/15.
 */
var sanitize = function(html){
    var newHTML = html.replace(/</g,"&lt")
    .replace(/>/g,"&gt")
    .replace(/&/g,"&amp");
    return newHTML;
};

window.iterateNode = iterateNode;
})();