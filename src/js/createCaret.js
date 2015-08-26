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