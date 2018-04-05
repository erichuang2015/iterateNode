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
export var dataTypes = {
    "[object Number]": {
        label: "number",
        converter: function () {
            return Number();
        }
    },
    "[object String]": {
        label: "string",
        converter: function () {
            return String();
        }
    },
    "[object Boolean]": {
        label: "boolean",
        converter: function () {
            return Boolean();
        }
    },
    "[object Array]": {
        label: "list of values",
        converter: function (obj) {
            return [];
        }
    },
    "[object Object]": {
        label: "list of elements",
        converter: function (obj) {
            return {};
        }
    },
    "[object Null]": {
        label: "null",
        converter: function (obj) {
            return null;
        }
    }
};