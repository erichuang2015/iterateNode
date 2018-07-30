"use strict";

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
var iterateNodeDataTypes = {
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
//render in select
function returnDataTypes(elem) {

    var row = "";
    for (var k in iterateNodeDataTypes) {
        row += '<option value="' + k + '" >' + iterateNodeDataTypes[k].label + '</option>';
    }
    console.log(row);
    var select = "<select class=\"iterate-node__hide\">\n        <option selected disabled>Choose here</option>\n        " + row + "\n    </select>";

    return select;
}