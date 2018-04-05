"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var changeModel = exports.changeModel = function () {
    function changeModel() {
        _classCallCheck(this, changeModel);
    }

    _createClass(changeModel, null, [{
        key: "assignParamFromString",
        value: function assignParamFromString(string, instance, value, separatore) {
            var separator = separatore || "?";
            var model = string.split(separator);
            var actualModel = instance.state;
            for (var i = 0; i < model.length - 1; i++) {
                actualModel = actualModel[model[i]];
            }actualModel[model[model.length - 1]] = value;
            instance.setState(instance.state);
        }
    }, {
        key: "assignKeyFromString",
        value: function assignKeyFromString(string, instance, value, separatore) {
            var separator = separatore || "?";
            var model = string.split(separator);
            var actualModel = instance.state;
            for (var i = 0; i < model.length - 1; i++) {
                actualModel = actualModel[model[i]];
            }var temp = actualModel[model[model.length - 1]];
            delete actualModel[model[model.length - 1]];
            actualModel[value] = temp;
            instance.setState(instance.state);
        }
    }, {
        key: "createKeyFromString",
        value: function createKeyFromString(string, instance, key, value, separatore) {
            var separator = separatore || "?";
            var model = string.split(separator);
            var actualModel = instance.state;
            for (var i = 0; i < model.length - 1; i++) {
                actualModel = actualModel[model[i]];
            }var finalModel = actualModel[model[model.length - 1]];
            finalModel[key] = value;
            instance.setState(instance.state);
        }
    }, {
        key: "returnParamFromString",
        value: function returnParamFromString(string, instance, separatore) {
            if (!string) return root;

            var separator = separatore || "?";
            var model = string.split(separator);
            var actualModel = instance.state;
            for (var i = 0; i < model.length; i++) {
                actualModel = actualModel[model[i]];
            }return actualModel;
        }
    }, {
        key: "deleteParamFromString",
        value: function deleteParamFromString(string, instance, separatore) {
            var separator = separatore || "?";
            var model = string.split(separator);
            var actualModel = instance.state;
            for (var i = 0; i < model.length - 1; i++) {
                actualModel = actualModel[model[i]];
            }if (Array.isArray(actualModel)) {
                var index = actualModel.indexOf(actualModel[model[model.length - 1]]);
                actualModel.splice(index, 1);
            } else delete actualModel[model[model.length - 1]];

            instance.setState(instance.state);
        }
    }]);

    return changeModel;
}();