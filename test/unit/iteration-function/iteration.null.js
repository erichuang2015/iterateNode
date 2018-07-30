
describe('iteration.js unit test: test case {"null":null}', function() {
    var state = {"null" : null};
    var test = ITERATION.call({state:state,options:window.defaults},state, "");
    var divTest = document.createElement("div");
    divTest.appendChild(test);
    document.body.appendChild(divTest);
    var elmUL = divTest.children[0];
    var elm = elmUL.children[0];
    it("should return a <ul> element:",function() {
        expect(elmUL.tagName.toLowerCase()).toBe("ul");
    });
    it("first children is <li> element:",function() {
        expect(elm.tagName.toLowerCase()).toBe("li");
    });
    it("expecting li has attribute data-iterate-node-path=null",function() {
        expect(elm.getAttribute("data-iterate-node-path") == "null");
    });
    it("expect first children to be span with class 'iterate-node__key', and innerText = null",
        function(){
        var children = elm.children[0];
        expect(children.classList.contains("iterate-node__key")).toBe(true);
        expect(children.innerText).toBe("null");
    });
    it("expect second children to be span with class 'iterate-node__type-node', and innerText = [object Null]",
        function(){
            var children = elm.children[1];
            expect(children.classList.contains("iterate-node__type-node")).toBe(true);
            expect(children.innerText).toBe("[object Null]");
    });
    it("expect third children to be span with class 'iterate-node__separator' and innerText = ':'",
        function(){
            var children = elm.children[2];
            expect(children.classList.contains("iterate-node__separator")).toBe(true);
            expect(children.innerText).toBe(":");
    });
    it("expect fourth children to be span with class 'iterate-node__value', and innerText = null",
        function(){
            var children = elm.children[3];
            expect(children.classList.contains("iterate-node__value")).toBe(true);
            expect(children.innerText).toBe("null");
    });
});