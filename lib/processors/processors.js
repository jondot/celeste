"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "createTextProcessor", {
  enumerable: true,
  get: function get() {
    return _text.default;
  }
});
Object.defineProperty(exports, "createMarkdownProcessor", {
  enumerable: true,
  get: function get() {
    return _markdown.default;
  }
});
exports.createProcessor = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _text = _interopRequireDefault(require("./text"));

var _markdown = _interopRequireDefault(require("./markdown"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const createProcessor = opts => {
  const textProcessor = (0, _text.default)(opts);
  const markdownProcessor = (0, _markdown.default)(opts);
  const processors = {
    text: textProcessor,
    markdown: markdownProcessor
  };
  return (
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(function* (vf) {
        // $FlowFixMe
        const pipe = _lodash.default.find(opts.processors, (v, k) => vf.path.match(k));

        if (!pipe) {
          return vf;
        }

        return _lodash.default.reduce(pipe, (p, x) => p.then(processors[x].process), Promise.resolve(vf));
      });

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }()
  );
};

exports.createProcessor = createProcessor;