"use strict";

/*
    import(merge.js);
 */
(function () {
    var defaults = {
        separator: "?",
        contentEditable: {
            add: false,
            delete: false,
            key: false,
            value: false,
            selection: false,
            drag: false,
            type: false
        },
        renderChildren: false
    };
    function TEMPLATE(key, value, path) {
        var options = this.options;
        var valueEl,
            path = path.length ? path + options.separator + key : key,
            parentpath = path.split(options.separator),
            parent = returnParamFromString(parentpath.slice(0, parentpath.length - 1).join(options.separator), this.state),
            typeNode = Object.prototype.toString.call(value);

        if (typeNode == "[object Object]" || typeNode == "[object Array]") {
            valueEl = "\n                " + (value.length || Object.keys(value).length ? "<span class=\"iterate-node__caret\"></span>" : "") + "\n                " + (options.contentEditable.add ? "<span class=\"iterate-node__add-item\">+</span>" : "") + "\n                ";
        } else valueEl = "\n            <span class=\"iterate-node__value\" " + (options.contentEditable.value ? "contentEditable" : "") + ">" + ("" + value) + "</span>\n            ";

        valueEl += "" + (options.contentEditable.delete ? "<span class=\"iterate-node__delete-item\">-</span>" : "");

        var objDom = "\n        <li data-iterate-node-path=\"" + path + "\">\n            <span class=\"iterate-node__key\"\n            " + (options.contentEditable.key && !Array.isArray(parent) && "contentEditable") + ">\n            " + key + "\n            </span>\n            <span class=\"iterate-node__key_typeof\">" + typeNode + "</span>\n            " + (options.contentEditable.type && returnDataTypes()) + "\n            <span class=\"iterate-node__separator\">:</span>\n            " + valueEl + "\n        </li>";

        return objDom;
    }
    function MAIN(targetElement, obj, settings) {
        this.state = obj;
        this.iteration = ITERATION;
        this.template = TEMPLATE;
        var options = this.options = merge(settings, defaults, true);
        var DOMrepresentation = this.iteration.call(this, obj, "", options);
        targetElement.className += " iterateNode-obj";
        targetElement.insertAdjacentHTML('beforeend', DOMrepresentation);
        iterateNodeEvents.call(this, targetElement);
        return this;
    }
    function ITERATION(obj, path) {
        var DOMrepresentation = "";
        for (var k in obj) {
            DOMrepresentation += TEMPLATE.call(this, k, obj[k], path);
        }return "<ul>" + DOMrepresentation + "</ul>";
    }

    window.iterateNode = MAIN;
})();