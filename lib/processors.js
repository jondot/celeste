"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTextProcessor = exports.createMarkdownProcessor = exports.createProcessor = void 0;

var _unified = _interopRequireDefault(require("unified"));

var _remarkParse = _interopRequireDefault(require("remark-parse"));

var _retextLatin = _interopRequireDefault(require("retext-latin"));

var _retextStringify = _interopRequireDefault(require("retext-stringify"));

var _remarkStringify = _interopRequireDefault(require("remark-stringify"));

var _sortByStars = _interopRequireDefault(require("./plugins/sort-by-stars"));

var _fetchStars = _interopRequireDefault(require("./plugins/fetch-stars"));

var _dedupLinks = _interopRequireDefault(require("./plugins/dedup-links"));

var _toc = _interopRequireDefault(require("./plugins/toc"));

var _addLicense = _interopRequireDefault(require("./plugins/add-license"));

var _gitContributors = _interopRequireDefault(require("./plugins/git-contributors"));

var _magicStrings = _interopRequireDefault(require("./plugins/magic-strings"));

var _brokenLinks = _interopRequireDefault(require("./plugins/broken-links"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const createTextProcessor = opts => (0, _unified.default)().use(_retextLatin.default).use((0, _magicStrings.default)(_objectSpread({}, opts, {
  replacements: {
    '\\d\\d\\d\\d': () => '***'
  }
}))).use(_retextStringify.default);

exports.createTextProcessor = createTextProcessor;

const createMarkdownProcessor = opts => (0, _unified.default)().use(_remarkParse.default).use((0, _dedupLinks.default)(opts)).use((0, _brokenLinks.default)(opts)).use((0, _fetchStars.default)(opts)).use(_remarkStringify.default, {
  bullet: '*',
  listItemIndent: 1
}).use((0, _toc.default)(opts)).use((0, _sortByStars.default)(opts)).use((0, _gitContributors.default)(opts)).use((0, _addLicense.default)(opts));

exports.createMarkdownProcessor = createMarkdownProcessor;

const createProcessor = opts =>
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* (content) {
    const textProcessor = createTextProcessor(opts);
    const markdownProcessor = createMarkdownProcessor(opts);
    return markdownProcessor.process((yield textProcessor.process(content)));
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.createProcessor = createProcessor;