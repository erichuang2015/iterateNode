export class changeModel {

    static assignParamFromString(string, instance, value, separatore) {
        var separator = separatore || "?";
        var model = string.split(separator);
        var actualModel = instance.state;
        for (var i = 0; i < model.length - 1; i++)
            actualModel = actualModel[model[i]];

        actualModel[model[model.length - 1]] = value;
        instance.setState(instance.state);
    }

    static assignKeyFromString(string, instance, value, separatore) {
        var separator = separatore || "?";
        var model = string.split(separator);
        var actualModel = instance.state;
        for (var i = 0; i < model.length - 1; i++)
            actualModel = actualModel[model[i]];

        var temp = actualModel[model[model.length - 1]];
        delete actualModel[model[model.length - 1]];
        actualModel[value] = temp;
        instance.setState(instance.state);
    }

    static createKeyFromString(string, instance, key, value, separatore) {
        var separator = separatore || "?";
        var model = string.split(separator);
        var actualModel = instance.state;
        for (var i = 0; i < model.length - 1; i++)
            actualModel = actualModel[model[i]];

        var finalModel = actualModel[model[model.length - 1]];
        finalModel[key] = value;
        instance.setState(instance.state);
    }

    static returnParamFromString(string, instance, separatore) {
        if (!string)
            return root;

        var separator = separatore || "?";
        var model = string.split(separator);
        var actualModel = instance.state;
        for (var i = 0; i < model.length; i++)
            actualModel = actualModel[model[i]];

        return actualModel;
    }

    static deleteParamFromString(string, instance, separatore) {
        var separator = separatore || "?";
        var model = string.split(separator);
        var actualModel = instance.state;
        for (var i = 0; i < model.length - 1; i++)
            actualModel = actualModel[model[i]];

        if (Array.isArray(actualModel)) {
            var index = actualModel.indexOf(actualModel[model[model.length - 1]]);
            actualModel.splice(index, 1);
        }
        else
            delete actualModel[model[model.length - 1]];

        instance.setState(instance.state);
    }
}