"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _unistUtilVisit = _interopRequireDefault(require("unist-util-visit"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const brokenLinks = ({
  logger: {
    log
  },
  plugins: {
    dedupLinks: dedupLinksConfig
  }
}) => () => node => {
  if (!dedupLinksConfig) {
    return null;
  }

  const linkmap = {};
  (0, _unistUtilVisit.default)(node, 'link', link => {
    const url = link.url;

    if (linkmap[url]) {
      log({
        type: 'dedup-links/dupe',
        level: 'error',
        payload: {
          url
        }
      });
    }

    linkmap[url] = true;
  });
};

var _default = brokenLinks;
exports.default = _default;