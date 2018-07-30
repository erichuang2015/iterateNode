describe('iteration.js unit test: test case {"object object pippo " : { "pippo" : 1, "bb" : true }}', function() {
    var state = {"object object pippo " : { "pippo" : 1, "bb" : true }};
    var test = ITERATION.call(
        {state:state,iteration:ITERATION,options:window.defaults}
        ,state,"");
    var divTest = document.createElement("div");
    divTest.appendChild(test);
    document.body.appendChild(divTest);
    var elm = divTest.children[0];
    var elmli = elm.children[0];
    it("should return a <ul> element:",function() {
        expect(elm.tagName.toLowerCase()).toBe("ul");
    });
    it("first children is <li> element:",function() {
        expect(elmli.tagName.toLowerCase()).toBe("li");
    });
    it("expecting li has attribute data-iterate-node-path=object object pippo ",function() {
        expect(elmli.getAttribute("data-iterate-node-path")).toBe("object object pippo ");
    });
    it("expect first children to be span with class 'iterate-node__key', and innerText = object object pippo ",
        function(){
        var children = elmli.children[0];
        expect(children.classList.contains("iterate-node__key")).toBe(true);
        expect(children.innerText).toBe("object object pippo ");
    });
    it("expect second children to be span with class 'iterate-node__type-node', and innerText = [object Object]",
        function(){
            var children = elmli.children[1];
            expect(children.classList.contains("iterate-node__type-node")).toBe(true);
            expect(children.innerText).toBe("[object Object]");
    });
    it("expect third children to be span with class 'iterate-node__separator' and innerText = ':'",
        function(){
            var children = elmli.children[2];
            expect(children.classList.contains("iterate-node__separator")).toBe(true);
            expect(children.innerText).toBe(":");
    });
    it("expect fourth children to be span with class 'iterate-node__caret'",
        function(){
            var children = elmli.children[3];
            expect(children.classList.contains("iterate-node__caret")).toBe(true);
    });

    elmli.children[3].click();
    var elmLiInner = elmli.children[4].children[0];
    // number
    it("expect a <li> element as first children of the fourth children:",function() {
        expect(elmLiInner.tagName.toLowerCase()).toBe("li");
    });
    it("expecting li has attribute data-iterate-node-path=object object pippo ?pippo",function() {
        expect(elmLiInner.getAttribute("data-iterate-node-path")).toBe("object object pippo ?pippo");
    });
    it("expect first children to be span with class 'iterate-node__key', and innerText = pippo",
        function(){
            var children = elmLiInner.children[0];
            expect(children.classList.contains("iterate-node__key")).toBe(true);
            expect(children.innerText).toBe("pippo");
        });
    it("expect second children to be span with class 'iterate-node__type-node', and innerText = [object Number]",
        function(){
            var children = elmLiInner.children[1];
            expect(children.classList.contains("iterate-node__type-node")).toBe(true);
            expect(children.innerText).toBe("[object Number]");
        });
    it("expect third children to be span with class 'iterate-node__separator' and innerText = ':'",
        function(){
            var children = elmLiInner.children[2];
            expect(children.classList.contains("iterate-node__separator")).toBe(true);
            expect(children.innerText).toBe(":");
        });
    it("expect fourth children to be span with class 'iterate-node__value', and innerText = 1",
        function(){
            var children = elmLiInner.children[3];
            expect(children.classList.contains("iterate-node__value")).toBe(true);
            expect(children.innerText).toBe("1");
        });

    // end number
    // boolean
    var elmLiInnerBool = elmli.children[4].children[1];
    it("second children is <li> element:",function() {
        expect(elmLiInnerBool.tagName.toLowerCase()).toBe("li");
    });
    it("expecting li has attribute data-iterate-node-path=object object pippo ?bb",function() {
        expect(elmLiInnerBool.getAttribute("data-iterate-node-path")).toBe("object object pippo ?bb");
    });
    it("expect first children to be span with class 'iterate-node__key', and innerText = bb",
        function(){
            var children = elmLiInnerBool.children[0];
            expect(children.classList.contains("iterate-node__key")).toBe(true);
            expect(children.innerText).toBe("bb");
        });
    it("expect second children to be span with class 'iterate-node__type-node', and innerText = [object Boolean]",
        function(){
            var children = elmLiInnerBool.children[1];
            expect(children.classList.contains("iterate-node__type-node")).toBe(true);
            expect(children.innerText).toBe("[object Boolean]");
        });
    it("expect third children to be span with class 'iterate-node__separator' and innerText = ':'",
        function(){
            var children = elmLiInnerBool.children[2];
            expect(children.classList.contains("iterate-node__separator")).toBe(true);
            expect(children.innerText).toBe(":");
        });
    it("expect fourth children to be span with class 'iterate-node__value', and innerText = true",
        function(){
            var children = elmLiInnerBool.children[3];
            expect(children.classList.contains("iterate-node__value")).toBe(true);
            expect(children.innerText).toBe("true");
        });
    // end boolean
});

describe('object caret suite test', function() {
    var state = {"object object pippo " : { "pippo" : 1, "bb" : true }};
    var test = ITERATION.call(
        {state:state,iteration:ITERATION,options:window.defaults}
        ,state,"");
    var divTest = document.createElement("div");
    divTest.appendChild(test);
    document.body.appendChild(divTest);
    var elm = divTest.children[0];
    var elmli = elm.children[0];
    it("expect 'iterate-node__caret' on click add class 'open', and ul is visible ad fourth children, then another click remove open class",
        function(){
            var children = elmli.children[3];
            children.click();
            expect(children.classList.contains("open")).toBe(true);
            expect(elmli.children[4].tagName.toLowerCase()).toBe("ul");
            var display = window.getComputedStyle(elmli.children[4], null).getPropertyValue('display');
            expect(display).toBe('block');
            children.click();
            expect(children.classList.contains("open")).toBe(false);
        });
});