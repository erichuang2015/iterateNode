var defaults = {
    separator : ".",
    contentEditable : {
        add : false,
        delete : false,
        key : false,
        value: false,
        selection : false,
        drag : false,
        type : false
    },
    map : false,
    dataKeyOnDOM : '__iterate-node-data__'
};

var methods = {
    addElement : addElement,
    changeKeyOrValue : changeKeyOrValue,
    changeType : changeType,
    deleteElement : deleteElement,
    openObject : openObject,
    iteration : ITERATION,
    template : TEMPLATE
}