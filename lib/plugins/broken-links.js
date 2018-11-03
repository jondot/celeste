"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _unistUtilVisit = _interopRequireDefault(require("unist-util-visit"));

var _pQueue = _interopRequireDefault(require("p-queue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const brokenLinks = ({
  logger: {
    log
  },
  fetch,
  plugins: {
    brokenLinks: brokenLinksConfig
  }
}) => () => node => {
  if (!brokenLinksConfig) {
    return null;
  }

  const queue = new _pQueue.default({
    concurrency: 4
  });
  (0, _unistUtilVisit.default)(node, 'link', link => {
    const url = link.url;
    if (!url || !url.match(`https?://.*`)) return;
    queue.add(() => fetch(url)).then(() => {}).catch(res => {
      log({
        type: 'broken-links/url-error',
        level: 'error',
        payload: {
          url,
          res
        }
      });
    });
  });
  return queue.onIdle();
};

var _default = brokenLinks;
exports.default = _default;