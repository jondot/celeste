"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _remarkToc = _interopRequireDefault(require("remark-toc"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = ({
  plugins: {
    toc: tocConfig
  }
}) => {
  if (!tocConfig) {
    return () => {};
  }

  return _remarkToc.default;
};

exports.default = _default;