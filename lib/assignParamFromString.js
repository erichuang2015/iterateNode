"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.assignParamFromString = assignParamFromString;
exports.assignKeyFromString = assignKeyFromString;
exports.createKeyFromString = createKeyFromString;
exports.returnParamFromString = returnParamFromString;
exports.deleteParamFromString = deleteParamFromString;
function assignParamFromString(string, instance, value, separatore) {
    var separator = separatore || "?";
    var model = string.split(separator);
    var actualModel = instance.state;
    for (var i = 0; i < model.length - 1; i++) {
        actualModel = actualModel[model[i]];
    }actualModel[model[model.length - 1]] = value;
    instance.setState(instance.state);
}

function assignKeyFromString(string, instance, value, separatore) {
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

function createKeyFromString(string, instance, key, value, separatore) {
    var separator = separatore || "?";
    var model = string.split(separator);
    var actualModel = instance.state;
    for (var i = 0; i < model.length - 1; i++) {
        actualModel = actualModel[model[i]];
    }var finalModel = actualModel[model[model.length - 1]];
    finalModel[key] = value;
    instance.setState(instance.state);
}

function returnParamFromString(string, instance, separatore) {
    if (!string) return root;

    var separator = separatore || "?";
    var model = string.split(separator);
    var actualModel = instance.state;
    for (var i = 0; i < model.length; i++) {
        actualModel = actualModel[model[i]];
    }return actualModel;
}

function deleteParamFromString(string, instance, separatore) {
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