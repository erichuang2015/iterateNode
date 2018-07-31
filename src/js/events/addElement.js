function addElement(templateGlobals,e){
    var $super = this;
    var thisTarget = e.target;
    var parent = e.target.parentElement;
    var path = parent.getAttribute("data-iterate-node-path");
    var elm = $super.returnParamFromString(path);
    var newValue,newKey;
    if(templateGlobals.typeNode == "[object Array]") {
        newValue = "value";
        newKey = elm.length;
    }
    if(templateGlobals.typeNode == "[object Object]"){
        // every newItem key must have "newItem" + maxNumber as key
        var number = 0;
        for(var k in elm){
            if( k.indexOf("newItem") === 0 ) {
                var itemNumber = Number(k.replace("newItem", ""));
                number = !isNaN(itemNumber) && number < itemNumber ? itemNumber : number;
            }
        }
        // open the caret
        var caret = parent.querySelector('.iterate-node__caret');
        if( caret && !caret.classList.contains('open') && parent.querySelector("ul"))
            parent.querySelector('.iterate-node__caret').click();

        newValue = "value";
        newKey = "newItem" + ( number + 1 );
    }
    $super.createKeyFromString(path,newKey,newValue);
}