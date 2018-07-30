"use strict";

/*
    import(merge.js);
    import(events.js);
 */
(function () {
    var defaults = {
        contentEditable: {
            add: false,
            delete: false,
            keyvalue: false,
            selection: false,
            drag: false
        }
    };
    function TEMPLATE(key, value, path, options) {
        var valueEl,
            path = path.length ? path + "?" + key : key,
            typeNode = Object.prototype.toString.call(value);

        if (typeNode == "[object Object]" || typeNode == "[object Array]") {
            valueEl = "\n\t\t\t" + (value.length || Object.keys(value).length ? "<span class=\"caret\"></span>" : "") + "\n            " + (options.contentEditable.add ? "<span class=\"iterate-node__add-item\"></span>" : "") + "\n            ";
        } else valueEl = "\n            <span class=\"value\" " + (options.contentEditable.value ? "contentEditable" : "") + ">" + ("" + value) + "</span>\n            ";

        valueEl += "" + (options.contentEditable.delete ? "<span class=\"iterate-node__delete-item\">-</span>" : "");

        var objDom = "\n        <li data-iterate-node-path=\"" + path + "\">\n            " + (options.contentEditable.delete ? "<span class=\"iterate-node__delete-item\">-</span>" : "") + "\n            <span class=\"iterate-node__key\" " + (options.contentEditable.keyvalue && "contentEditable") + ">\n            " + key + "\n            </span>\n            <span class=\"iterate-node__key_typeof\">" + typeNode + "</span>\n            <span class=\"iterate-node__separator\">:</span>\n            " + valueEl + "\n        </li>";

        return objDom;
    }
    function MAIN(targetElement, obj, settings) {
        this.state = obj;
        var options = merge(settings, defaults, true);
        var DOMrepresentation = ITERATION.call(this, obj, "", options);
        targetElement.className += " iterate-node";
        targetElement.insertAdjacentHTML('beforeend', DOMrepresentation);
        return this;
    }
    function ITERATION(obj, path, options) {
        var DOMrepresentation = "";
        for (var k in obj) {
            DOMrepresentation += TEMPLATE.call(this, k, obj[k], path, options);
        }return "<ul>" + DOMrepresentation + "</ul>";
    }

    window.iterateNode = MAIN;
})();