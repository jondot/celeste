"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "createFilePublisher", {
  enumerable: true,
  get: function get() {
    return _file.default;
  }
});
Object.defineProperty(exports, "createGitPublisher", {
  enumerable: true,
  get: function get() {
    return _git.default;
  }
});
exports.createPublisher = void 0;

var _file = _interopRequireDefault(require("./file"));

var _git = _interopRequireDefault(require("./git"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const createPublisher = opts => {
  const fp = (0, _file.default)(opts);
  const gp = (0, _git.default)(opts);
  return (
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(function* (params) {
        yield fp(params);
        yield gp(params);
      });

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }()
  );
};

exports.createPublisher = createPublisher;