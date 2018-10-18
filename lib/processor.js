"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _unified = _interopRequireDefault(require("unified"));

var _remarkParse = _interopRequireDefault(require("remark-parse"));

var _remarkStringify = _interopRequireDefault(require("remark-stringify"));

var _sortByStars = _interopRequireDefault(require("./plugins/sort-by-stars"));

var _fetchStars = _interopRequireDefault(require("./plugins/fetch-stars"));

var _toc = _interopRequireDefault(require("./plugins/toc"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createProcessor = opts => (0, _unified.default)().use(_remarkParse.default).use((0, _fetchStars.default)(opts)).use((0, _toc.default)()).use(_remarkStringify.default, {
  bullet: '*',
  listItemIndent: 1
}).use((0, _sortByStars.default)(opts));

var _default = createProcessor;
exports.default = _default;