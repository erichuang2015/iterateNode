'use strict';

var _changeModel = require('./changeModel');

var _offset = require('./offset');

function dragging(instance) {
	var dragged = false;
	var draggedRef = {
		treeKey: "",
		el: {}
	};
	var target = false;
	/* events fired on the draggable target */
	document.addEventListener("drag", function (event) {
		event.preventDefault();
		event.stopPropagation();
	}, false);

	document.addEventListener("dragstart", function (event) {
		if (event.target.nodeName.toLowerCase() != "li" && !event.target.getAttribute("data-string-model").length) // TODO CHANGE IT
			return;
		// store a ref. on the dragged elem
		dragged = event.target;
		var treeKey = event.target.getAttribute("data-string-model");
		draggedRef.treeKey = treeKey;
		draggedRef.el = _changeModel.changeModel.returnParamFromString(treeKey, instance);
		// make it half transparent
		event.dataTransfer.dropEffect = "move";
		event.target.style.opacity = .5;
	}, false);

	document.addEventListener("dragend", function (event) {
		// reset the transparency
		event.target.style.opacity = "";
		dummy.style.display = "none";
		event.dataTransfer.setData("dragging", "false");
		console.log("dragend");
	}, false);

	document.addEventListener("dragexit", function (event) {
		// reset the transparency
		event.target.style.opacity = "";
		dummy.style.display = "none";
		event.dataTransfer.setData("dragging", "false");
		console.log("dragexit");
	}, false);

	/* events fired on the drop targets */
	document.addEventListener("dragover", function (event) {
		// prevent default to allow drop
		event.preventDefault();
		event.stopPropagation();
		event.dataTransfer.dropEffect = "move";
	}, false);

	document.addEventListener("dragenter", function (event) {
		event.preventDefault();
		event.stopPropagation();
		if (target) target.style.background = "";
		// highlight potential drop target when the draggable element enters it
		if (event.target.nodeName.toLowerCase() != "li") target = findUpTag(event.target, "li");else target = event.target;

		if (event.target) event.dataTransfer.setData("dragging", "true");
	}, false);

	document.addEventListener("dragleave", function (event) {}, false);

	document.addEventListener("drop", drop, false);

	function drop(event) {
		// prevent default action (open as link for some elements)
		event.preventDefault();
		event.stopPropagation();

		var draggedStringModel = dragged.getAttribute("data-string-model");
		var key = draggedStringModel.split(stringModelSeparator);
		var draggedValue = returnParamFromString(draggedStringModel, originalObject);
		/* DROP is fired multiple times in nested elements */
		/* TODO is this possibile to avoid? */
		if (typeof draggedValue === "undefined") return;
		var eventTargetStringModel = target.getAttribute("data-string-model");
		var lastTargetStringModel = eventTargetStringModel.split(stringModelSeparator);
		var parentStringNode = lastTargetStringModel.slice(0, lastTargetStringModel.length - 1).join(stringModelSeparator);

		/* console.log */
		console.log("draggedStringModel, eventTargetStringModel", draggedStringModel, eventTargetStringModel);
		console.log("draggedValue", draggedValue);
		console.log("key", key[key.length - 1]);
		console.log("targetElement", target);
		console.log("draggedElement", dragged);
		console.log("parentStringNode", parentStringNode);
		console.log("originalObject", originalObject);
		console.log("draggedElementObj, eventTargetElementObj", returnParamFromString(draggedStringModel, originalObject), returnParamFromString(eventTargetStringModel, originalObject));
		console.log("parentStringElement", returnParamFromString(parentStringNode, originalObject));
		console.log("eventTargetElementObj", Array.isArray(returnParamFromString(eventTargetStringModel, originalObject)));
		console.log("parentStringElement", Array.isArray(returnParamFromString(parentStringNode, originalObject)));
		/* console.log */

		deleteParamFromString(draggedStringModel, originalObject);
		createKeyFromString(eventTargetStringModel, originalObject, key[key.length - 1], draggedValue);
		dragged.parentNode.removeChild(dragged);
		target.querySelector("ul").appendChild(dragged);

		/* reset styles */
		dragged.style.opacity = "";
		target.style.background = "";
		dummy.style.display = "none";
	}
}