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
                nodeIteratorSettings.asyncFunction(nodeIteratorSettings.obj,li.getAttribute("data-string-model"),
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