
    /**
     *
     * @param string - the string representation of object
     * @param root - the root object
     * @param value - value to assign
     */
    function assignParamFromString(string, root, value, separatore) {
        var separator = separatore || "?";
        var model = string.split(separator);
        var actualModel = root;
        for (var i = 0; i < model.length - 1; i++)
            actualModel = actualModel[model[i]];

        actualModel[model[model.length - 1]] = value;
    }

    function assignKeyFromString(string, root, value, separatore) {
        var separator = separatore || "?";
        var model = string.split(separator);
        var actualModel = root;
        for (var i = 0; i < model.length - 1; i++)
            actualModel = actualModel[model[i]];

        var temp = actualModel[model[model.length - 1]];
        delete actualModel[model[model.length - 1]];
        actualModel[value] = temp;
    }

    function createKeyFromString(string, root, key, value, separatore) {
        var separator = separatore || "?";
        var model = string.split(separator);
        var actualModel = root;
        for (var i = 0; i < model.length - 1; i++)
            actualModel = actualModel[model[i]];

        var finalModel = actualModel[model[model.length - 1]];
        finalModel[key] = value;
    }

    function returnParamFromString(string, root,separatore) {
        if ( !string )
            return root;

        var separator = separatore || "?";
        var model = string.split(separator);
        var actualModel = root;
        for (var i = 0; i < model.length; i++)
            actualModel = actualModel[model[i]];

        return actualModel;
    }

    function deleteParamFromString(string, root,separatore) {
        var separator = separatore || "?";
        var model = string.split(separator);
        var actualModel = root;
        for (var i = 0; i < model.length - 1; i++)
            actualModel = actualModel[model[i]];

        //var temp = actualModel[model[model.length - 1]];
        if( Array.isArray( actualModel ) ){
            var index = actualModel.indexOf( actualModel[model[model.length - 1]] );
            actualModel.splice(index, 1);
        }
        else
            delete actualModel[model[model.length - 1]];

    }