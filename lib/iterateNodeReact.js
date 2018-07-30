'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _RenderElement = require('./RenderElement');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IterateNode = function (_React$Component) {
  _inherits(IterateNode, _React$Component);

  function IterateNode(props) {
    _classCallCheck(this, IterateNode);

    var _this = _possibleConstructorReturn(this, (IterateNode.__proto__ || Object.getPrototypeOf(IterateNode)).call(this, props));

    _this.state = props.obj;
    _this.options = props.options;
    _this.typeOfFilter = props.typeOfFilter;
    return _this;
  }

  _createClass(IterateNode, [{
    key: 'RenderObj',
    value: function RenderObj(obj, treeKey) {
      var rows = [];
      for (var key in obj) {
        var value = obj[key];
        var keyName = !treeKey.length ? key : treeKey + "?" + key;
        console.log(keyName);
        rows.push((0, _RenderElement.RenderEl)(key, value, keyName, this));
      }
      return rows;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'ul',
        null,
        this.RenderObj(this.state, "")
      );
    }
  }]);

  return IterateNode;
}(_react2.default.Component);

window.IterateNode = IterateNode;