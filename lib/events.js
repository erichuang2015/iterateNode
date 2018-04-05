'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Events = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _changeModel = require('./changeModel');

var _dataType = require('./dataType');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Events = exports.Events = function () {
    function Events() {
        _classCallCheck(this, Events);
    }

    _createClass(Events, null, [{
        key: 'openObject',
        value: function openObject(e, value) {
            var ulTarget = e.target.parentNode.querySelector('ul');
            e.target.classList.toggle('open');
            ulTarget.classList.toggle('simpleHide');
        }
    }, {
        key: 'changeKeyOrValue',
        value: function changeKeyOrValue(e, treeKey, type, instance, typeNode) {
            var innerText = e.target.innerText;
            switch (type) {
                case "key":
                    _changeModel.changeModel.assignKeyFromString(treeKey, instance, innerText);
                    break;
                case "value":
                    // number sanitation
                    var value = typeNode == "[object Number]" ? isNaN(Number(innerText)) ? 0 : Number(innerText) : innerText;
                    // boolean sanitation
                    value = typeNode == "[object Boolean]" ? innerText.toLowerCase() == "true" : value;
                    // react doesn't seem to update in some cases...
                    if (value != e.target.innerText) e.target.innerText = value;

                    _changeModel.changeModel.assignParamFromString(treeKey, instance, value);
                    break;
            }
        }
    }, {
        key: 'changeTypeEnable',
        value: function changeTypeEnable(e) {
            e.target.classList.add('simpleHide');
            e.target.nextSibling.classList.remove('simpleHide');
        }
    }, {
        key: 'changeType',
        value: function changeType(e, treeKey, instance) {
            var newValue = _dataType.dataTypes[e.target.value].converter();
            _changeModel.changeModel.assignParamFromString(treeKey, instance, newValue);
            e.target.classList.add('simpleHide');
            e.target.previousSibling.classList.remove('simpleHide');
        }
    }, {
        key: 'removeElement',
        value: function removeElement(e, treeKey, instance) {
            _changeModel.changeModel.deleteParamFromString(treeKey, instance);
        }
    }, {
        key: 'addElement',
        value: function addElement(e, treeKey, instance, typeNode, value) {
            if (typeNode == "[object Array]") _changeModel.changeModel.createKeyFromString(treeKey, instance, value.length, "value");
            if (typeNode == "[object Object]") {
                // every newItem key must have "newItem" + maxNumber as key
                var number = 0;
                for (var k in value) {
                    if (k.startsWith("newItem")) {
                        var itemNumber = Number(k.replace("newItem", ""));
                        number = !isNaN(itemNumber) && number < itemNumber ? itemNumber : number;
                    }
                }
                // open the caret
                if (!e.target.parentNode.querySelector('.caret').classList.contains('open')) e.target.parentNode.querySelector('.caret').click();

                _changeModel.changeModel.createKeyFromString(treeKey, instance, "newItem" + (number + 1), "value");
            }
        }
    }]);

    return Events;
}();