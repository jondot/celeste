"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _processors = require("./processors");

var _text = _interopRequireDefault(require("./formatters/text"));

var _json = _interopRequireDefault(require("./formatters/json"));

var _cachedFetch = _interopRequireDefault(require("./cached-fetch"));

var _logger = _interopRequireDefault(require("./logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const formatters = {
  text: _text.default,
  json: _json.default
};

var _default =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* (args, config) {
    const out = args.out ? _fs.default.openSync(args.out, 'w') : 1;
    const formatter = formatters[args.report] || _text.default;
    const logger = new _logger.default(formatter);
    const opts = {
      logger,
      plugins: config.plugins,
      fetch: (0, _cachedFetch.default)({})
    };

    const content = _fs.default.readFileSync(args.file).toString();

    const processor = (0, _processors.createProcessor)(opts);

    try {
      const res = yield processor(content);
      yield _fs.default.write(out, res, () => {});
    } catch (err) {
      logger.log({
        type: 'celeste',
        level: 'error',
        payload: {
          err
        }
      });
    }

    return logger.errors;
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = _default;