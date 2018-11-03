"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _text = _interopRequireDefault(require("./text"));

var _json = _interopRequireDefault(require("./json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const formatters = {
  text: _text.default,
  json: _json.default
};
var _default = formatters;
exports.default = _default;