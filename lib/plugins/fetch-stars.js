"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _unistUtilVisit = _interopRequireDefault(require("unist-util-visit"));

var _pQueue = _interopRequireDefault(require("p-queue"));

var _cheerio = _interopRequireDefault(require("cheerio"));

var _ast = require("../ast");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const fetchStars = ({
  log,
  fetch,
  plugins: {
    fetchStars: fetchStarsConfig
  }
}) => () => node => {
  if (!fetchStarsConfig) {
    return null;
  }

  const queue = new _pQueue.default({
    concurrency: 4
  });
  const starmap = {};
  (0, _unistUtilVisit.default)(node, 'link', link => {
    const url = link.url;
    if (!url || !url.match(`https://github.com/([^/]*?)/([^/]*?)/?$`)) return;
    queue.add(() => fetch(url)).then(({
      body
    }) => {
      const $ = _cheerio.default.load(body);

      const stars = parseInt($('.js-social-count').text().toString().replace(',', '').trim(), 10);
      starmap[url] = stars;
    }).catch(res => {
      log({
        type: 'fetch-stars/url-error',
        level: 'error',
        payload: {
          url,
          res
        }
      });
    });
  });
  return queue.onIdle().then(() => {
    (0, _unistUtilVisit.default)(node, 'link', link => {
      const url = link.url;
      const stars = starmap[url];

      if (stars) {
        const _starsFromLink = (0, _ast.starsFromLink)(link),
              desc = _starsFromLink.desc,
              oldStars = _starsFromLink.stars;

        if (desc && oldStars) {
          (0, _ast.starsToLink)(link, {
            desc,
            stars: stars.toString()
          });
          const from = parseInt(oldStars, 10);
          log({
            type: 'fetch-stars/update',
            level: 'info',
            payload: {
              title: link.children[0].value,
              diff: stars - from,
              from,
              to: stars
            }
          });
        }
      }

      return link;
    });
  });
};

var _default = fetchStars;
exports.default = _default;