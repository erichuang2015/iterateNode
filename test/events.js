describe('iterateNode events suite', function() {
    var mainObject = {
        "undefined": undefined,
        "Null": null,
        "boolean": true,
        "number": 10,
        "string": "String",
        "noJSONOBject": document.body,
        "object object": {"pippo": 1, "bb": true},
        "object array": [0, 1, {"pippo": 1, "bb": true}]
    };

    var contentEditable = {
        add : true,
        delete : true,
        key : true,
        value : true,
        selection : false,
        drag : false
    };
    var root;
    var testDiv = document.createElement("div");
    testDiv.id = "testDiv";
    document.body.appendChild(testDiv);
    var iterateNodeObj;
    beforeEach(function() {
        document.body.innerHTML = "";
        document.body.appendChild(testDiv);
        iterateNodeObj = window.iterateNode(testDiv, mainObject, {contentEditable:contentEditable});
    });
    it('root element should have a children with tag ul', function () {
        root = testDiv.children[0];
        expect(root.tagName.toLowerCase()).toBe("ul");
    });
    it('must have contentEditable.key = true', function () {
        expect(iterateNodeObj.options.contentEditable.key).toBe(true);
    });
    it('must have contentEditable.value = true', function () {
        expect(iterateNodeObj.options.contentEditable.value).toBe(true);
    });
    it('key must be editable, except for arrays', function () {
        for(var i = 0;i<root.children.length;i++) {
            var children = root.children[i];
            var key = children.querySelector('.iterate-node__key');
            if(("" + root.children[i]) != "[object Array]" )
                expect(key.hasAttribute("contenteditable")).toBe(true);
        }
    });
    it('key of array elements in this example (children 7 ) must not be editable', function () {
        var children = root.children[7];
        var caret = children.querySelector('iterate-node__caret');
        caret.click();
        var arrayChildren = children.querySelector('ul');
        for(var i=0;i<arrayChildren.children.length;i++ ) {
            var key = arrayChildren.children[i].querySelector('.iterate-node__key');
            expect(key.hasAttribute("contenteditable")).toBe(false);
        }
    });
    it('value, if exists, must be editable', function () {
        for(var i = 0;i<root.children.length;i++) {
            var children = root.children[i];
            var value = children.querySelector('.iterate-node__value');
            if(value)
                expect(value.hasAttribute("contenteditable")).toBe(true);
        }
    });
    it('changing key ( not in an array ) must be reflected on iterateNodeObj.state  ', function () {
        for(var i = 0;i<root.children.length;i++) {
            var children = root.children[i];
            var key = children.querySelector('.iterate-node__key');

            if(("" + root.children[i]) != "[object Array]" )
                continue;

            var path = children.getAttribute(" data-iterate-node-path");
            var oldElement = returnParamFromString(path,iterateNodeObj.state);
            var evt = new Event("keyup",{"bubbles":true});
            key.innerText = "mobile";
            key.dispatchEvent(evt);
            var newPath = path.split(iterateNodeObj.options.separator);
            newPath[newPath.length-1] = key.innerText;
            var newElement = returnParamFromString(newPath.join(iterateNodeObj.options.separator),iterateNodeObj.state);
            expect(newElement).toEqual(oldElement);
        }
    });
});