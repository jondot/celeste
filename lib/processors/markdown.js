"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _unified = _interopRequireDefault(require("unified"));

var _remarkParse = _interopRequireDefault(require("remark-parse"));

var _remarkStringify = _interopRequireDefault(require("remark-stringify"));

var _plugins = require("../plugins");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = opts => (0, _unified.default)().use(_remarkParse.default).use((0, _plugins.dedupLinks)(opts)).use((0, _plugins.brokenLinks)(opts)).use((0, _plugins.fetchStars)(opts)).use(_remarkStringify.default, {
  bullet: '*',
  listItemIndent: 1
}).use((0, _plugins.createToc)(opts)).use((0, _plugins.sortByStars)(opts)).use((0, _plugins.createGitContributors)(opts)).use((0, _plugins.createAddLicense)(opts));

exports.default = _default;