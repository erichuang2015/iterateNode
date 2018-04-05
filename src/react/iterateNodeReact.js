import React from 'react';
import {RenderEl} from './RenderElement';

class IterateNode extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.filterFunction ? props.filterFunction(props.obj) : props.obj;
    this.options = props.options;
    this.typeOfFilter = props.typeOfFilter;
  }


  RenderObj(obj, treeKey) {
    var rows = [];
    for (var key in obj) {
      var value = obj[key];
      var keyName = !treeKey.length ? key : treeKey + "?" + key;
      rows.push(RenderEl(key,value,keyName,this));
    }
    return rows;
  }

  render() {
    return (
        <ul>
          {this.RenderObj(this.state,"")}
        </ul>
    );
  }
}

window.IterateNode = IterateNode;