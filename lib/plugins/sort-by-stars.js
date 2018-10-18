"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _ast = require("../ast");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const sortByStars = ({
  log
}) => {
  function sortByStarsFn() {
    const self = this;
    const visitors = self.Compiler.prototype.visitors;
    const original = visitors.list;

    visitors.list = function list(node) {
      // eslint-disable-next-line
      node.children = _lodash.default.sortBy(node.children, listItem => {
        const link = listItem.children[0].children[0];

        if (link.type === 'link') {
          const _starsFromLink = (0, _ast.starsFromLink)(link),
                stars = _starsFromLink.stars;

          if (stars) {
            const s = -1 * parseInt(stars, 10);
            return s;
          }

          log({
            type: 'plugins/sort-by-stars/exclude-link',
            level: 'debug',
            payload: {
              link
            }
          });
          return 0;
        }
      }); // eslint-disable-next-line

      return original.apply(this, arguments);
    };
  }

  return sortByStarsFn;
};

var _default = sortByStars;
exports.default = _default;