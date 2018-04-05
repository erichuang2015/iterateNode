'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IterateNode = function (_React$Component) {
  _inherits(IterateNode, _React$Component);

  function IterateNode(props) {
    _classCallCheck(this, IterateNode);

    var _this = _possibleConstructorReturn(this, (IterateNode.__proto__ || Object.getPrototypeOf(IterateNode)).call(this, props));

    _this.state = JSON.parse(props.obj);
    return _this;
  }

  _createClass(IterateNode, [{
    key: 'handleClick',
    value: function handleClick(e, value) {
      e.target.classList.toggle('open');
      var isOpened = e.target.classList.contains('open');
      e.target.parentNode.querySelector('ul').classList.toggle('hide');
    }
  }, {
    key: 'RenderEl',
    value: function RenderEl(key, value, treeKey) {
      var _this2 = this;

      var typeNode = Object.prototype.toString.call(value);
      if (typeNode == "[object Object]" || typeNode == "[object Array]" && value.length) {
        return React.createElement(
          'li',
          { 'string-model': treeKey, key: treeKey },
          key,
          ' ',
          React.createElement('span', { className: 'caret',
            onClick: function onClick(e) {
              return _this2.handleClick(e, value);
            } }),
          React.createElement(
            'ul',
            { className: 'hide' },
            this.RenderObj(value, treeKey)
          )
        );
      } else return React.createElement(
        'li',
        { 'string-model': treeKey, key: treeKey },
        key,
        ' - ',
        "" + value
      );
    }
  }, {
    key: 'RenderObj',
    value: function RenderObj(obj, treeKey) {
      var rows = [];
      var i = 0;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = Object.entries(obj)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _ref = _step.value;

          var _ref2 = _slicedToArray(_ref, 2);

          var key = _ref2[0];
          var value = _ref2[1];

          var keyName = !treeKey.length ? key : treeKey + "?" + key;
          rows.push(this.RenderEl(key, value, keyName));
          i++;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return rows;
    }
  }, {
    key: 'assignParam',
    value: function assignParam(string, value, separatore) {
      var separator = separatore || "?";
      var model = string.split(separator);
      var actualModel = this.state;
      for (var i = 0; i < model.length - 1; i++) {
        actualModel = actualModel[model[i]];
      }actualModel[model[model.length - 1]] = value;
      this.setState(this.state);
      return this.state;
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'ul',
        null,
        this.RenderObj(this.state, "")
      );
    }
  }]);

  return IterateNode;
}(React.Component);

window.iterateNode = ReactDOM.render(React.createElement(IterateNode, { obj: JSON.stringify(myJSONObject) }), document.getElementById('root'));