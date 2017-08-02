	var dummy = document.getElementById("drag-highlight");
	function dragging(options) {
		var dragged = false;
		var target = false;
		var dropAfter = false;
		/* events fired on the draggable target */
		document.addEventListener("drag", function( event ) {
			event.preventDefault();
			event.stopPropagation();
		}, false);

		document.addEventListener("dragstart", function( event ) {
			if(event.target.nodeName.toLowerCase() != "li" )
				return;
			// store a ref. on the dragged elem
			dragged = event.target;
			// make it half transparent
			event.target.style.opacity = .5;
			event.dataTransfer.dropEffect = "move";
		}, false);

		document.addEventListener("dragend", function( event ) {
			// reset the transparency
			event.target.style.opacity = "";
			dummy.style.display = "none";
			event.dataTransfer.setData("dragging", "false");
			console.log("dragend");
		}, false);

		document.addEventListener("dragexit", function( event ) {
			// reset the transparency
			event.target.style.opacity = "";
			dummy.style.display = "none";
			event.dataTransfer.setData("dragging", "false");
			console.log("dragexit");
		}, false);

		/* events fired on the drop targets */
		document.addEventListener("dragover", function( event ) {
			// prevent default to allow drop
			event.preventDefault();
			event.stopPropagation();
			event.dataTransfer.dropEffect = "move";

		}, false);

		document.addEventListener("dragenter", function( event ) {
			event.preventDefault();
			event.stopPropagation();
			if(target)
				target.style.background = "";
			// highlight potential drop target when the draggable element enters it
			if(event.target.nodeName.toLowerCase() != "li" ) {
					target = findUpTag(event.target, "li");
					if(!target) return;
					dropAfter = true;
			}
			else {
				target = event.target;
				dropAfter = false;
			}
			var position = offset(target);
			dummy.style.width = ( target.offsetWidth + position.left ) + "px";
			dummy.style.top = ( position.top + target.offsetHeight + 7 ) + "px";
			dummy.style.display = "block";
			target.style.background = "purple";
			event.dataTransfer.setData("dragging", "true");
		}, false);

		document.addEventListener("dragleave", function( event ) {
			// reset background of potential drop target when the draggable element leaves it
			//event.target.style.background = "";
			//if(dragged) dragged.style.opacity = "";
			//if(target) target.style.background = "";
			//event.dataTransfer.setData("dragging", "false");

			console.log("dragleave");

		}, false);

		document.addEventListener("drop", drop, true);

		function drop(event){
			// prevent default action (open as link for some elements)
			event.preventDefault();
			event.stopPropagation();

			/* non si possono droppare tutti gli elememti in un array, solo gli elementi che sono array */
			/*var targetIsArray = target.getAttribute("data-type-of") == "[object Array]";
			 var draggedIsArrayElement = window.getComputedStyle( dragged.querySelector("span > .iterateNode-sanitize-key-value") ).display != "none";
			 if( !targetIsArray && !draggedIsArrayElement){
			 event.dataTransfer.dropEffect = "none"
			 event.target.style.opacity = "";
			 if(target)
			 target.style.background = "";
			 dummy.style.display = "none";
			 return;
			 }*/
			// move dragged elem to the selected drop target
			var draggedStringModel = dragged.getAttribute("data-string-model");
			var key = draggedStringModel.split(stringModelSeparator);
			var draggedPosition = returnParamFromString(draggedStringModel,originalObject);
			/* DROP is fired multiple times in nested elements */
			/* TODO is this possibile to avoid? */
			if(typeof draggedPosition === "undefined")
				return;
			var eventTargetStringModel = target.getAttribute("data-string-model");
			var lastTargetStringModel = eventTargetStringModel.split(stringModelSeparator);
			console.log("draggedStringModel, eventTargetStringModel", draggedStringModel, eventTargetStringModel);
			console.log("draggedPosition", draggedPosition);

			deleteParamFromString(draggedStringModel, originalObject);
			dropAfter = !dropAfter && !target.querySelector("ul") ? true : dropAfter;

			if(dropAfter){
				var parentStringNode = lastTargetStringModel.slice(0,lastTargetStringModel.length-1).join(stringModelSeparator);
				console.log("parentStringNode",parentStringNode);
				createKeyFromString(parentStringNode, originalObject, key[key.length-1], draggedPosition);
				dragged.parentNode.removeChild( dragged );
				target.parentNode.appendChild( dragged );
			}
			else {
				createKeyFromString(eventTargetStringModel, originalObject, key[key.length - 1], draggedPosition);
				dragged.parentNode.removeChild( dragged );
				target.querySelector("ul").appendChild( dragged );
			}
			/* reset styles */
			dragged.style.opacity = "";
			target.style.background = "";
			dummy.style.display = "none";
		}
	}
