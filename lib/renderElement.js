'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RenderEl = RenderEl;

var _events = require('./events');

var _dataType = require('./dataType');

function DataTypes(instance, treeKey) {
    function returnDataTypes() {
        var row = [];
        for (var k in _dataType.dataTypes) {
            row.push(React.createElement(
                'option',
                { value: k, key: k },
                _dataType.dataTypes[k].label
            ));
        }
        return row;
    }
    return returnDataTypes();
}

function RenderElInner(instance, k, typeNode, isInnerText, treeKey) {
    console.log(treeKey);
    return React.createElement(
        'span',
        { className: isInnerText },
        React.createElement(
            'i',
            { className: 'iterateNode-sanitize-key' },
            instance.options.key
        ),
        React.createElement(
            'b',
            { className: 'iterateNode-sanitize-key-value',
                contentEditable: instance.options.contentEditable && typeNode != "[object Array]",
                suppressContentEditableWarning: true,
                onBlur: function onBlur(e) {
                    return _events.Events.changeKeyOrValue(e, treeKey, "key", instance, typeNode);
                } },
            k
        ),
        React.createElement(
            'span',
            { className: 'iterateNode-sanitize-separator1' },
            instance.options.Separator1
        ),
        React.createElement(
            'span',
            { className: 'iterateNode-sanitize-key-typeof' },
            instance.options.Typeof
        ),
        React.createElement(
            'i',
            { className: 'iterateNode-sanitize-key-typeof-value', onClick: function onClick(e) {
                    return _events.Events.changeTypeEnable(e);
                },
                'data-value': typeNode },
            typeNode
        ),
        instance.options.contentEditable && React.createElement(
            'select',
            { className: 'simpleHide', onBlur: function onBlur(e) {
                    return _events.Events.changeType(e, treeKey, instance);
                } },
            React.createElement(DataTypes, null)
        )
    );
}

function RenderEl(key, value, treeKey, instance) {
    // filtro della vista
    /*if( instance.typeOfFilter){
        var newValues = options.typeOfFilter(typeNode,value);
        var typeOfValue = newValues.typeofValue;
        value = newValues.node;
        typeNode = Object.prototype.toString.call(value);
    }*/
    var typeNode = Object.prototype.toString.call(value);
    var isInnerText = instance.options.sanitizedObjects.indexOf(key) > -1 ? "node-iterator-text-content" : "";
    if (typeNode == "[object Object]" || typeNode == "[object Array]") {
        return React.createElement(
            'li',
            { 'data-string-model': treeKey, key: treeKey },
            RenderElInner(instance, key, typeNode, isInnerText, treeKey),
            Object.keys(value).length > 0 && React.createElement('a', { href: 'javascript:void(0)', className: 'caret', onClick: function onClick(e) {
                    return _events.Events.openObject(e, value);
                } }),
            instance.options.contentEditable && React.createElement(
                'i',
                { className: 'iterateNode-delete-item', onClick: function onClick(e) {
                        return _events.Events.removeElement(e, treeKey, instance);
                    } },
                '-'
            ),
            instance.options.contentEditable && React.createElement(
                'span',
                { className: 'add-items', onClick: function onClick(e) {
                        return _events.Events.addElement(e, treeKey, instance, typeNode, value);
                    } },
                '+'
            ),
            React.createElement(
                'ul',
                { className: 'simpleHide' },
                instance.RenderObj(value, treeKey)
            )
        );
    } else return React.createElement(
        'li',
        { 'string-model': treeKey, key: treeKey },
        RenderElInner(instance, key, typeNode, isInnerText, treeKey),
        React.createElement(
            'span',
            { className: 'iterateNode-sanitize-separator2' },
            instance.options.Separator2
        ),
        React.createElement(
            'b',
            { className: 'iterateNode-sanitize-value',
                contentEditable: instance.options.contentEditable && value != null,
                suppressContentEditableWarning: true,
                onBlur: function onBlur(e) {
                    return _events.Events.changeKeyOrValue(e, treeKey, "value", instance, typeNode);
                } },
            "" + value
        ),
        instance.options.contentEditable && React.createElement(
            'i',
            { className: 'iterateNode-delete-item', onClick: function onClick(e) {
                    return _events.Events.removeElement(e, treeKey, instance);
                } },
            '-'
        )
    );
}