"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _got = _interopRequireDefault(require("got"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = cache => url => {
  if (cache[url]) {
    return Promise.resolve(cache[url]);
  }

  return (0, _got.default)(url);
};

exports.default = _default;