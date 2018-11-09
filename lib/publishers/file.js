"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fsExtra = _interopRequireDefault(require("fs-extra"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const createFilePublisher = ({
  logger: {
    log
  },
  publishers: {
    file
  }
}) =>
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* (params) {
    if (!file) {
      return;
    }

    if (!params.path || !params.contents) {
      throw new Error(`Not all params given ${JSON.stringify(params)}`);
    }

    log({
      level: 'info',
      type: 'file-publisher/publishing',
      payload: {
        path: params.path,
        len: params.contents.length
      }
    }); // write to temp file and move

    yield _fsExtra.default.writeFile(params.path, params.contents);
    log({
      level: 'info',
      type: 'file-publisher/done',
      payload: {
        path: params.path
      }
    });
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = createFilePublisher;
exports.default = _default;