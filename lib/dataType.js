"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/*
 JSON Value
 It includes ?

 number (integer or floating point)
 string
 boolean
 array
 object
 null
 */
var dataTypes = exports.dataTypes = {
    "[object Number]": {
        label: "number",
        converter: function converter() {
            return Number();
        }
    },
    "[object String]": {
        label: "string",
        converter: function converter() {
            return String();
        }
    },
    "[object Boolean]": {
        label: "boolean",
        converter: function converter() {
            return Boolean();
        }
    },
    "[object Array]": {
        label: "list of values",
        converter: function converter(obj) {
            return [];
        }
    },
    "[object Object]": {
        label: "list of elements",
        converter: function converter(obj) {
            return {};
        }
    },
    "[object Null]": {
        label: "null",
        converter: function converter(obj) {
            return null;
        }
    }
};