"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _rest = _interopRequireDefault(require("@octokit/rest"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const b64 = c => Buffer.from(c.toString()).toString('base64');

const createGitPublisher = ({
  logger: {
    log
  },
  publishers: {
    github
  }
}) =>
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* (params) {
    if (!github) {
      return;
    }

    if (!params.path || !params.contents) {
      throw new Error(`Not all params given ${JSON.stringify(params)}`);
    }

    const auth = github.auth,
          context = github.context,
          client = github.client;
    const gh = new _rest.default(client || {});

    if (auth) {
      gh.authenticate(auth);
    }

    log({
      level: 'info',
      type: 'git-publisher/publishing',
      payload: {
        path: params.path,
        len: params.contents.length
      }
    });
    const content = yield gh.repos.getContent(_objectSpread({
      ref: 'master'
    }, context, {
      path: params.path
    }));
    yield gh.repos.updateFile(_objectSpread({
      ref: 'master'
    }, context, {
      sha: content.data.sha,
      path: params.path,
      content: b64(params.contents),
      message: params.messages && params.messages.join('\n') || context.defaultCommitMessage
    }));
    log({
      level: 'info',
      type: 'git-publisher/done',
      payload: {
        path: params.path
      }
    });
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = createGitPublisher;
exports.default = _default;