describe('iterateNode object testing suite', function() {
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
    function findPath(str,root){
        var model = str.split(separatore);
        var actualModel = root;
        for (var i = 0; i < model.length; i++)
            actualModel = actualModel[model[i]];
        return actualModel;
    }
    function iteration(obj,DOMobjRepr){
        var count = 0;
        for(var key in obj){
            var $this = DOMobjRepr.children[count];
            var path = $this.getAttribute('data-iterate-node-path');
            expect(findPath(path,mainObject)).toEqual(obj[key]);
            console.log("path passed",path);
            var $thisKey = $this.querySelector('.iterate-node__key').textContent.trim();
            //console.log("$thisKey,key",$thisKey,key);
            expect($thisKey).toBe(key);
            console.log("key :" + $thisKey + " = key : " + key);
            var $thistype = $this.querySelector('.iterate-node__key_typeof').textContent.trim();
            var typeNode = Object.prototype.toString.call(obj[key]);
            expect($thistype).toBe(typeNode);
            console.log("type :" + $thistype + " = type : " + typeNode);
            if (typeNode == "[object Object]" || typeNode == "[object Array]") {
                var caret = $this.querySelector('.iterate-node__caret');
                expect(caret).not.toBe(null);
                console.log("case object, caret expected");

                caret.click();
                expect(caret.classList.contains('open')).toBe(true);
                console.log("case object, caret on click should have class open");
                caret.click();
                expect(caret.classList.contains('open')).toBe(false);
                console.log("another click, no class open");
                caret.click();
                expect(caret.classList.contains('open')).toBe(true);
                console.log("another click, class open should be appended");

                var ul = $this.querySelector('ul');
                var display = window.getComputedStyle(ul, null).getPropertyValue('display');
                expect(display).toBe("block");
                console.log("case JSON object, ul should be in display block");
                iteration(obj[key],ul);
            }
            else{
                var value = $this.querySelector('.iterate-node__value').textContent.trim();
                expect(value).toBe("" + obj[key]);
                console.log("case other values: value ", value, " == ", ""+obj[key] )
            }
            count++;
        }
    }
    var separatore = ".";
    var root;
    var testDiv = document.createElement("div");
    testDiv.id = "testDiv";
    document.body.appendChild(testDiv);
    var iterateNodeObj;
    beforeEach(function() {
        document.body.innerHTML = "";
        document.body.appendChild(testDiv);
        iterateNodeObj = window.iterateNode(testDiv, mainObject, {separator:separatore});
    });
    it('separator path must be "' + separatore + '"', function () {
        expect(iterateNodeObj.options.separator).toBe(separatore);
    });
    it('root element should have a children with tag ul', function () {
        root = testDiv.children[0];
        expect(root.tagName.toLowerCase()).toBe("ul");
    });
    it('should represent the structure', function () {
        iteration(mainObject,root);
    });

});