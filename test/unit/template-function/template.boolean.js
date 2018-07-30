
describe('template.js unit test: test case {"boolean":true}', function() {
    var state = {"boolean" : true};
    var test = TEMPLATE.call({state:state,options:window.defaults},"boolean", true, "");
    var divTest = document.createElement("div");
    divTest.appendChild(test);
    document.body.appendChild(divTest);
    var elm = divTest.children[0];
    it("should return a <li> element:",function() {
        expect(elm.tagName.toLowerCase()).toBe("li");
    });
    it("expecting li has attribute data-iterate-node-path=boolean",function() {
        expect(elm.getAttribute("data-iterate-node-path")).toBe("boolean");
    });
    it("expect first children to be span with class 'iterate-node__key', and innerText = null",
        function(){
        var children = elm.children[0];
        expect(children.classList.contains("iterate-node__key")).toBe(true);
        expect(children.innerText).toBe("boolean");
    });
    it("expect second children to be span with class 'iterate-node__type-node', and innerText = [object Null]",
        function(){
            var children = elm.children[1];
            expect(children.classList.contains("iterate-node__type-node")).toBe(true);
            expect(children.innerText).toBe("[object Boolean]");
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
            expect(children.innerText).toBe("true");
    });
});