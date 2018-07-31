function returnParamFromString(string) {
    var $self = this;
    if ( !string )
        return $self.state;

    var $self = this;
    var model = string.split($self.options.separator);
    var actualModel = $self.state;
    for (var i = 0; i < model.length; i++)
        actualModel = actualModel[model[i]];

    return actualModel;
}