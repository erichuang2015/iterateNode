
    /**
     *
     * @param string - the string representation of object
     * @param root - the root object
     * @param value - value to assign
     */
    function assignParamFromString(string, root, value) {
        var model = string.split('.');
        var actualModel = root;
        for (var i = 0; i < model.length - 1; i++)
            actualModel = actualModel[model[i]];

        actualModel[model[model.length - 1]] = value;
    }

    function returnParamFromString(string, root) {
        if ( !string )
            return root;

        var model = string.split('.');
        var actualModel = root;
        for (var i = 0; i < model.length; i++)
            actualModel = actualModel[model[i]];

        return actualModel
    }