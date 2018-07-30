
describe('template.js unit test: test case {"noJSONOBject":document.body}', function() {
    var state = {"noJSONOBject" : document.body};
    var test = TEMPLATE.call({state:state,options:window.defaults},"noJSONOBject", document.body, "");
    var divTest = document.createElement("div");
    divTest.appendChild(test);
    document.body.appendChild(divTest);
    var elm = divTest.children[0];
    it("should return a <li> element:",function() {
        expect(elm.tagName.toLowerCase()).toBe("li");
    });
    it("expecting li has attribute data-iterate-node-path=noJSONOBject",function() {
        expect(elm.getAttribute("data-iterate-node-path")).toBe("noJSONOBject");
    });
    it("expect first children to be span with class 'iterate-node__key', and innerText = noJSONOBject",
        function(){
        var children = elm.children[0];
        expect(children.classList.contains("iterate-node__key")).toBe(true);
        expect(children.innerText).toBe("noJSONOBject");
    });
    it("expect second children to be span with class 'iterate-node__type-node', and innerText = [object HTMLBodyElement]",
        function(){
            var children = elm.children[1];
            expect(children.classList.contains("iterate-node__type-node")).toBe(true);
            expect(children.innerText).toBe("[object HTMLBodyElement]");
    });
    it("expect third children to be span with class 'iterate-node__separator' and innerText = ':'",
        function(){
            var children = elm.children[2];
            expect(children.classList.contains("iterate-node__separator")).toBe(true);
            expect(children.innerText).toBe(":");
    });
    it("expect fourth children to be span with class 'iterate-node__value', and innerText = [object HTMLBodyElement]",
        function(){
            var children = elm.children[3];
            expect(children.classList.contains("iterate-node__value")).toBe(true);
            expect(children.innerText).toBe("[object HTMLBodyElement]");
    });
});