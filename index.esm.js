"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _reactShadowDomRetargetEvents = _interopRequireDefault(require("react-shadow-dom-retarget-events"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var _default = function _default(Component) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return (
    /*#__PURE__*/
    function (_HTMLElement) {
      _inherits(NewElement, _HTMLElement);

      _createClass(NewElement, null, [{
        key: "observedAttributes",
        get: function get() {
          return Object.keys(options.attributes || {});
        }
      }]);

      function NewElement() {
        var _this;

        _classCallCheck(this, NewElement);

        _this = _possibleConstructorReturn(this, _getPrototypeOf(NewElement).call(this));
        _this._reference = null;
        _this.props = {};
        Object.keys(options.methods || {}).forEach(function (methodName) {
          NewElement.prototype[methodName] = options.methods[methodName];
        }); // Connect attributes to properties automatically

        Object.keys(options.attributes || {}).forEach(function (propKey) {
          Object.defineProperty(_assertThisInitialized(_this), propKey, {
            get: function get() {
              return _this.getAttribute(propKey);
            },
            set: function set(value) {
              _this.setAttribute(propKey, value);
            }
          });
        }); // Add getters and setters for properties

        Object.keys(options.properties || {}).forEach(function (propKey) {
          _this.props[propKey] = options.properties[propKey]["default"];
          Object.defineProperty(_assertThisInitialized(_this), propKey, {
            get: function get() {
              return _this.props[propKey];
            },
            set: function set(value) {
              _this.props[propKey] = value;

              _this.render();
            }
          });
        });
        return _this;
      }

      _createClass(NewElement, [{
        key: "connectedCallback",
        value: function connectedCallback() {
          this.attachShadow({
            mode: 'open'
          });
          this.render();
          (0, _reactShadowDomRetargetEvents["default"])(this.shadowRoot);
        }
      }, {
        key: "disconnectedCallback",
        value: function disconnectedCallback() {
          _reactDom["default"].unmountComponentAtNode(this.shadowRoot);
        }
      }, {
        key: "render",
        value: function render() {
          if (this.shadowRoot) {
            this._reference = _reactDom["default"].render(_react["default"].createElement(Component, this.reactProps), this.shadowRoot);
          }
        }
      }, {
        key: "attributeChangedCallback",
        value: function attributeChangedCallback() {
          this.render();
        }
      }, {
        key: "reactProps",
        get: function get() {
          var currentProps = _objectSpread({}, this.props, {}, options.attributes || {});

          var attrs = this.attributes;

          for (var i = attrs.length - 1; i >= 0; i -= 1) {
            currentProps[attrs[i].name] = attrs[i].value;
          }

          return currentProps;
        }
      }]);

      return NewElement;
    }(_wrapNativeSuper(HTMLElement))
  );
};

exports["default"] = _default;
