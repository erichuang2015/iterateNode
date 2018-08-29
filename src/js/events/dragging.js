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
            highlight = document.createElement("div");
            highlight.classList.add("iterate-node__drag-position");
            document.body.appendChild(highlight);
        }

        function Down(e){
            if(dragging
                || !e.target.classList.contains("iterate-node__drag")
                || !isDescendant(HandlerEl,e.target))
                return;
            dragging = true;
            var li = e.target.parentElement;
            var clone = li.cloneNode(true);
            if(clone.querySelector("ul") ) clone.removeChild(clone.querySelector("ul"));
            cloneNodes.push({
                original : li,
                clone : clone
            });
            for(var k in cloneNodes)
                dummy.appendChild(cloneNodes[k].clone);
            dummy.style.transform = "translate(" + e.x + "px," + e.y + "px)";
        }
        function Move(e){
            if(!dragging
                || !isDescendant(HandlerEl,e.target))
                return;

            target = e.target;
            var targetNodeName = target.nodeName.toLowerCase();
            var parentNodeName = target.parentElement.nodeName.toLowerCase();
            targetLi = targetNodeName == "li" ?
                target :
                ( parentNodeName == "li" ?
                    target.parentElement :
                    false);
            if(!targetLi)
                return;

            var height = 0;
            if( targetNodeName == "ul"){
                var caret = targetLi.querySelector('.iterate-node__caret');
                height = targetLi.offsetHeight;
            }
            dummy.style.transform = "translate(" + (e.x + 1) + "px," + (e.y +1) + "px)";
            var position = offset(targetLi);
            highlight.style.width = ( targetLi.offsetWidth + position.left ) + "px";
            highlight.style.transform = "translate(0," + ( position.top + height ) + "px)";
        }
        function Up(e){
            if(!dragging )
                return;
            if(isDescendant(HandlerEl,e.target) && targetLi)
                for(var k in cloneNodes) {
                    var original = cloneNodes[k].original;
                    if(original == targetLi  || isDescendant(original,targetLi))
                        continue;

                    var key = original[defaults.dataKeyOnDOM].key;
                    deleteElement(original);
                    var value = original[defaults.dataKeyOnDOM].value;
                    var liToPrepend = target.nodeName.toLowerCase() == "ul" ?
                        false :
                        targetLi;
                    var li = typeof targetLi[defaults.dataKeyOnDOM].key === "undefined" ||
                        target.nodeName.toLowerCase() == "ul" ?
                        targetLi :
                        targetLi.parentElement.parentElement;

                    addElement(li,liToPrepend,value,key,original);

                }
            dragging = false;
            dummy.innerHTML = "";
            cloneNodes = [];
            dummy.style.transform = "translate(-9999px,-9999px)";
            highlight.style.transform = "translate(-9999px,-9999px)";
        }

        // TO DO : MOVE IN A SEPARATE FILE ( CORE FUNCTIONALITY OF MANY ELEMENTS )
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
                document.addEventListener('touchend', touchend,false);
                document.addEventListener('touchmove', touchend,false);
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
            function touchend(e){
                var ev = {
                    x : e.changedTouches[0].pageX,
                    y : e.changedTouches[0].pageY,
                    target : e.target
                };
                Up(ev);
                document.removeEventListener('touchend', touchend);
                document.removeEventListener('touchmove',touchmove,{passive:false});
            }

            $super.destroy = function(){
                HandlerEl.removeEventListener('touchstart', touchstart);
            }
        };



        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )
            mobile();
        else
            desktop();
}