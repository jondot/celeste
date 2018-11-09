"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _unified = _interopRequireDefault(require("unified"));

var _retextLatin = _interopRequireDefault(require("retext-latin"));

var _retextStringify = _interopRequireDefault(require("retext-stringify"));

var _plugins = require("../plugins");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = opts => (0, _unified.default)().use(_retextLatin.default).use((0, _plugins.magicStrings)(_objectSpread({}, opts, {
  replacements: {
    '\\d\\d\\d\\d': () => '***'
  }
}))).use(_retextStringify.default);

exports.default = _default;