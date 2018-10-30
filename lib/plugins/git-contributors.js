"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _remarkGitContributors = _interopRequireDefault(require("remark-git-contributors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = ({
  plugins: {
    gitContributors: gitContributorsConfig
  }
}) => {
  if (!gitContributorsConfig) {
    return () => {};
  }

  return () => (0, _remarkGitContributors.default)(gitContributorsConfig);
};

exports.default = _default;