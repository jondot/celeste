"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _globby = _interopRequireDefault(require("globby"));

var _vfile = _interopRequireDefault(require("vfile"));

var _processors = require("./processors/processors");

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
      processors: config.processors,
      fetch: (0, _cachedFetch.default)({})
    };
    const processor = (0, _processors.createProcessor)(opts);
    const publisher = (0, _publishers.createPublisher)(opts);
    const files = yield (0, _globby.default)(args.input); // eslint-disable-next-line

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = files[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        const path = _step.value;

        try {
          // eslint-disable-next-line
          const contents = (yield _fsExtra.default.readFile(path)).toString();
          const vf = (0, _vfile.default)({
            path,
            contents
          }); // eslint-disable-next-line

          const res = yield processor(vf); // console.log(report(res))
          // eslint-disable-next-line

          yield publisher(vf);
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
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return logger;
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = _default;