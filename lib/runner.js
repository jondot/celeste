"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _processors = require("./processors");

var _formatters = _interopRequireDefault(require("./formatters"));

var _cachedFetch = _interopRequireDefault(require("./cached-fetch"));

var _logger = _interopRequireDefault(require("./logger"));

var _publishers = require("./publishers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* (args, config) {
    const formatter = _formatters.default[args.format] || _formatters.default.text;
    const logger = new _logger.default(formatter);
    const opts = {
      logger,
      publishers: config.publishers,
      plugins: config.plugins,
      fetch: (0, _cachedFetch.default)({})
    };
    const content = (yield _fsExtra.default.readFile(args.input)).toString();
    const processor = (0, _processors.createProcessor)(opts);
    const publisher = (0, _publishers.createPublisher)(opts);

    try {
      const res = yield processor(content);
      const publishContent = {
        path: args.output,
        content: res
      };
      yield publisher(publishContent);
    } catch (err) {
      logger.log({
        type: 'celeste',
        level: 'error',
        payload: {
          err,
          stack: err.stack
        }
      });
    }

    return logger;
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = _default;