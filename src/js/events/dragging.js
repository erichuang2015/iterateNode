function dragging(HandlerEl) {
        var $super = this;
        var dragging = false;
        var target, cloneNodes = [],targetLi,targetType;
        var dummy = document.querySelector(".iterate_node__dummy");
        if(!dummy) {
            dummy = document.createElement("div");
            dummy.classList.add("iterate_node__dummy");
            document.body.appendChild(dummy);
        }
        var highlight = document.querySelector(".iterate-node__drag-position");
        if(!highlight) {
            var highlight = document.createElement("div");
            highlight.classList.add("iterate-node__drag-position");
            document.body.appendChild(highlight);
        }

        function Down(e){
            if(dragging
                || !e.target.classList.contains("iterate-node__drag")
                || !isDescendant(HandlerEl,e.target))
                return;
            dragging = true;
            var key = e.target.parentElement;
            var clone = e.target.parentElement.cloneNode(true);
            if(clone.querySelector("ul") ) clone.removeChild(clone.querySelector("ul"));
            cloneNodes.push(clone);
            for(var k in cloneNodes)
                dummy.appendChild(cloneNodes[k]);
            dummy.style.transform = "translate(" + e.x + "px," + e.y + "px)";
        }
        function Move(e){
            if(!dragging
                || !isDescendant(HandlerEl,e.target))
                return;

            target = e.target;
            targetLi = e.target.hasAttribute("data-iterate-node-path") ?
                e.target :
                ( e.target.parentElement.hasAttribute("data-iterate-node-path") ?
                    e.target.parentElement :
                false);
            if(!targetLi)
                return;

            targetType = targetLi.getAttribute("data-iterate-node-path") == "" ?
                "[object Object]" :
                targetLi.querySelector(".iterate-node__type-node").innerText;

            var height = 0;
            if(((targetType == "[object Array]" || targetType == "[object Object]") &&
                target.nodeName.toLowerCase() == "ul") ||
                targetLi.classList.contains("iterate-node__root")){
                var caret = targetLi.querySelector('.iterate-node__caret');
                if(caret && caret.parentElement == targetLi  && !caret.classList.contains('open')){
                    caret.click();
                }
                height = targetLi.offsetHeight;
            }
            dummy.style.transform = "translate(" + (e.x + 1) + "px," + (e.y +1) + "px)";
            var position = offset(targetLi);
            highlight.style.width = ( targetLi.offsetWidth + position.left ) + "px";
            highlight.style.transform = "translate(0," + ( position.top + height ) + "px)";
        }
        function Up(e){
            if(!dragging)
                return;
            if(isDescendant(HandlerEl,e.target))
                for(var k in cloneNodes) {
                    var path = cloneNodes[k].getAttribute("data-iterate-node-path");
                    var targetLiAttr = targetLi.getAttribute("data-iterate-node-path");
                    var originalObjectToDrag = $super.targetElement.querySelector("[data-iterate-node-path='" + path + "']");
                    if(path == targetLiAttr  || isDescendant(originalObjectToDrag,targetLi))
                        continue;
                    var JSel = JSON.parse(JSON.stringify($super.returnParamFromString(path)));
                    var key = cloneNodes[k].querySelector(".iterate-node__key").innerText;
                    $super.deleteParamFromString(path);
                    if(target.nodeName.toLowerCase() == "ul" ||
                        targetLi.classList.contains("iterate-node__root")) {
                        var elm = $super.returnParamFromString(targetLiAttr);
                        var keyCreate = Array.isArray(elm) ? elm.length : key;
                        $super.createKeyFromString(targetLiAttr,keyCreate, JSel);
                    }
                    else
                        $super.assignKeyFromString(targetLiAttr,key,JSel,0);

                }
            dragging = false;
            dummy.innerHTML = "";
            cloneNodes = [];
            dummy.style.transform = "translate(-9999px,-9999px)";
            highlight.style.transform = "translate(-9999px,-9999px)";
        }

        // desktop case
        var desktop = function(){
            function mousedown(e){
                var ev = {
                    x : e.pageX,
                    y : e.pageY,
                    target : e.target
                };
                Down(ev);
            }
            HandlerEl.addEventListener("mousedown",mousedown);
            function mouseup(e){
                var ev = {
                    x : e.pageX,
                    y : e.pageY,
                    target : e.target
                };
                Up(ev);
            }
            document.addEventListener("mouseup",mouseup);
            function mousemove(e){
                var ev = {
                    x : e.pageX,
                    y : e.pageY,
                    target : e.target
                };
                Move(ev);
            }
            document.addEventListener('mousemove',mousemove);
            $super.destroy = function(){
                HandlerEl.removeEventListener("mousedown",mousedown);
                document.removeEventListener("mouseup",mouseup);
                document.removeEventListener('mousemove',mousemove);
            }
        };

        // Mobile case
        var mobile = function() {

            function touchstart(e){
                var ev = {
                    x : e.changedTouches[0].pageX,
                    y : e.changedTouches[0].pageY,
                    target : e.target
                };
                Down(ev);
            }

            // listeners
            HandlerEl.addEventListener('touchstart', touchstart,{passive:true});
            function touchmove(e){
                var ev = {
                    x : e.changedTouches[0].pageX,
                    y : e.changedTouches[0].pageY,
                    target : document.elementFromPoint(e.changedTouches[0].pageX, e.changedTouches[0].pageY)
                };
                Move(ev);
            }
            document.addEventListener('touchmove',touchmove,{passive:true});
            function touchend(e){
                var ev = {
                    x : e.changedTouches[0].pageX,
                    y : e.changedTouches[0].pageY,
                    target : e.target
                };
                Up(ev);
            }
            document.addEventListener('touchend', touchend,false);
            $super.destroy = function(){
                HandlerEl.removeEventListener('touchstart', touchstart);
                document.removeEventListener('touchend', touchend);
                document.removeEventListener('touchmove',touchmove,{passive:false});
            }
        };



        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )
            mobile();
        else
            desktop();
}