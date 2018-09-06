function addElement(li,liToPrepend,value,key,liToClone,alias){
    var elm = li[defaults.dataKeyOnDOM].value;
    // if no container, create
    var container = li.querySelector("ul");
    // open the caret
    var caret = li.querySelector('.iterate-node__caret');
    if( caret ) {
        if(!container) {
            caret.click();
            container = li.querySelector("ul");
        }
        if (!caret.classList.contains('open'))
            caret.classList.add('open');
    }

    var index,newValue,newKey;

    if(Array.isArray(elm)) {
        if(typeof key === "undefined") {
            value = "value";
            key = elm.length;
        }

        if(liToPrepend) {
            index = Array.prototype.indexOf.call(
                liToPrepend.parentElement.children, liToPrepend);
            var parentElementLength = liToPrepend.parentElement.children.length;
            for (var ii = index; ii < parentElementLength; ii++) {
                var childLI = liToPrepend.parentElement.children[ii];
                childLI[defaults.dataKeyOnDOM].key = ii+1;
                childLI.querySelector(".iterate-node__key").innerText = ii+1;
            }
            elm.splice(index, 0, value);
            if(liToClone) {
                liToClone.querySelector(".iterate-node__key").innerText = index;
                liToClone[defaults.dataKeyOnDOM].key = index;
            }
            key = index;
        }
        else {
            if(liToClone) {
                liToClone.querySelector(".iterate-node__key").innerText = elm.length;
                liToClone[defaults.dataKeyOnDOM].key = elm.length;
            }
            elm[elm.length] = value;
        }
    }
    else {
        if(typeof key === "undefined") {
            // every newItem key must have "newItem" + maxNumber as key
            var number = 0;
            for (var k in elm) {
                if (k.indexOf("newItem") === 0) {
                    var itemNumber = Number(k.replace("newItem", ""));
                    number = !isNaN(itemNumber) && number < itemNumber ? itemNumber : number;
                }
            }
            value = "value";
            key = "newItem" + ( number + 1 );
        }
        else {
            //coerce key to string
            key = typeof key === "number" ? "0" + key : key;
            while (Object.keys(elm).indexOf(key) > -1)
                key = key + Math.floor(Math.random() * (9007199254740991));

            if(liToClone) {
                liToClone.querySelector(".iterate-node__key").innerText = key;
                liToClone[defaults.dataKeyOnDOM].key = key;
            }
        }
        // insertment
        if(liToPrepend) {
            prependObjectElement(elm, key,
                value, liToPrepend[defaults.dataKeyOnDOM].key);
            var children = container.children;
            for(var ch = 0;ch<children.length;ch++) {
                var chi = children[ch][defaults.dataKeyOnDOM];
                chi.value = elm[chi.key];
                chi.parentElement = elm;
            }

        }
        else
            elm[key] = value;
    }

    if(liToClone)
        liToClone[defaults.dataKeyOnDOM].parentElement = elm;

    var newElementDOM = liToClone ? liToClone :
        TEMPLATE(key, value, elm, alias || null);
    if(liToPrepend) {
        liToPrepend.parentElement.insertBefore(
            newElementDOM,
            liToPrepend
        );
    }
    else {
        container.appendChild(newElementDOM)
    }
    defaults.addElementListener &&
    defaults.addElementListener(newElementDOM[defaults.dataKeyOnDOM],
        li[defaults.dataKeyOnDOM],
        liToPrepend ? liToPrepend[defaults.dataKeyOnDOM] : false);
}