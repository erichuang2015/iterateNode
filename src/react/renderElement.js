import {Events} from './events';
import {dataTypes} from './dataType';

function DataTypes(instance,treeKey){
    function returnDataTypes(){
        var row = [];
        for(var k in dataTypes){
            row.push(<option value={k} key={k}>{dataTypes[k].label}</option>);
        }
        return row;
    }
    return returnDataTypes();
}

function RenderElInner(instance,k,typeNode,typeOfValue,isInnerText,treeKey) {
    return (
    <span className={isInnerText}>
        <i className="iterateNode-sanitize-key">{instance.options.key}</i>
        <b className="iterateNode-sanitize-key-value"
           contentEditable={instance.options.contentEditable && typeNode != "[object Array]"}
           suppressContentEditableWarning
           onBlur={(e) => Events.changeKeyOrValue(e,treeKey,"key",instance,typeNode)}>{k}</b>
        <span className="iterateNode-sanitize-separator1">{instance.options.Separator1}</span>
        <span className="iterateNode-sanitize-key-typeof">{instance.options.Typeof}</span>
        <i className="iterateNode-sanitize-key-typeof-value" onClick={(e) => Events.changeTypeEnable(e)}
           data-value={typeNode}>{typeNode}</i>
        { instance.options.contentEditable  &&
            <select className="simpleHide" onBlur={(e) => Events.changeType(e,treeKey,instance)}>
                <DataTypes/>
            </select>
        }
    </span>
    );
}


export function RenderEl(key,value, treeKey,instance){
    // filtro della vista
    if( instance.typeOfFilter){
        var newValues = options.typeOfFilter(typeNode,value);
        var typeOfValue = newValues.typeofValue;
        value = newValues.node;
        typeNode = Object.prototype.toString.call(value);
    }
    var typeNode = typeNode || Object.prototype.toString.call(value);
    var typeOfValue = typeOfValue || typeNode;
    var isInnerText = instance.options.sanitizedObjects.indexOf(key) > -1 ? "node-iterator-text-content" : "";
    if( typeNode == "[object Object]" || typeNode == "[object Array]") {
        return (
        <li data-string-model={treeKey} key={treeKey}>
            {RenderElInner(instance,key,typeNode,isInnerText,treeKey)}
            {Object.keys(value).length > 0 &&
                <a href="javascript:void(0)" className="caret" onClick={(e) => Events.openObject(e,value)}>
                </a>
            }
            { instance.options.contentEditable &&
            <i className="iterateNode-delete-item" onClick={(e) => Events.removeElement(e,treeKey,instance)}>-</i>
            }
            { instance.options.contentEditable &&
            <span className="add-items" onClick={(e) => Events.addElement(e,treeKey,instance,typeNode,value)}>+</span>
            }
            <ul className="simpleHide">{instance.RenderObj(value,treeKey)}</ul>
        </li>
        );
    }
    else
        return (
            <li string-model={treeKey} key={treeKey}>
                {RenderElInner(instance,key,typeNode,isInnerText,treeKey)}
                <span className='iterateNode-sanitize-separator2'>{instance.options.Separator2}</span>
                <b className="iterateNode-sanitize-value"
                   contentEditable={(instance.options.contentEditable && value != null)}
                   suppressContentEditableWarning
                   onBlur={(e) => Events.changeKeyOrValue(e,treeKey,"value",instance,typeNode)}>{"" + value}</b>
                { instance.options.contentEditable &&
                    <i className="iterateNode-delete-item" onClick={(e) => Events.removeElement(e,treeKey,instance)}>-</i>
                }
            </li>
        );
}