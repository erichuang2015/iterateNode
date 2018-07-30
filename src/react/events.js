import {changeModel} from './changeModel';
import {dataTypes} from './dataType';

export class Events {

    static openObject(e, value) {
        var ulTarget = e.target.parentNode.querySelector('ul');
        e.target.classList.toggle('open');
        ulTarget.classList.toggle('simpleHide');
    }

    static changeKeyOrValue(e, treeKey, type, instance,typeNode) {
        var innerText = e.target.innerText;
        switch (type) {
            case "key":
                changeModel.assignKeyFromString(treeKey, instance, innerText);
                break;
            case "value":
                // number sanitation
                var value = ( typeNode == "[object Number]" ) ? isNaN( Number(innerText) ) ? 0 : Number(innerText) : innerText;
                // boolean sanitation
                value = ( typeNode == "[object Boolean]" ) ? ( innerText.toLowerCase() == "true" ) : value;
                // react doesn't seem to update in some cases...
                if(value != e.target.innerText)
                    e.target.innerText = value;

                changeModel.assignParamFromString(treeKey, instance, value);
                break;
        }
    }

    static changeTypeEnable(e){
        e.target.classList.add('simpleHide');
        e.target.nextSibling.classList.remove('simpleHide');
    }

    static changeType(e,treeKey,instance){
        var newValue = dataTypes[e.target.value].converter();
        changeModel.assignParamFromString(treeKey, instance, newValue);
        e.target.classList.add('simpleHide');
        e.target.previousSibling.classList.remove('simpleHide');
    }

    static removeElement(e,treeKey,instance){
        changeModel.deleteParamFromString(treeKey, instance);
    }

    static addElement(e,treeKey,instance,typeNode,value){
        if(typeNode == "[object Array]")
            changeModel.createKeyFromString(treeKey, instance, value.length, "value");
        if(typeNode == "[object Object]"){
            // every newItem key must have "newItem" + maxNumber as key
            var number = 0;
            for(var k in value){
                if( k.startsWith("newItem") ) {
                    var itemNumber = Number(k.replace("newItem", ""));
                    number = !isNaN(itemNumber) && number < itemNumber ? itemNumber : number;
                }
            }
            // open the caret
            var caret = e.target.parentNode.querySelector('.caret');
            if( caret && !caret.classList.contains('open') )
                e.target.parentNode.querySelector('.caret').click();

            changeModel.createKeyFromString(treeKey, instance, "newItem" + ( number + 1 ), "value");
        }
    }

}