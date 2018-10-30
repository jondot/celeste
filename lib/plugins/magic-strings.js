"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _unistUtilVisit = _interopRequireDefault(require("unist-util-visit"));

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const magicStrings = ({
  log,
  plugins: {
    magicStrings: magicStringsConfig
  }
}) => () => node => {
  if (!magicStringsConfig) {
    return null;
  }

  const replacements = magicStringsConfig.replacements;
  (0, _unistUtilVisit.default)(node, 'TextNode', t => {
    const k = _lodash.default.find(Object.keys(replacements), r => t.value.match(r));

    if (k != null) {
      log({
        type: 'magic-strings/flagged',
        level: 'warn',
        payload: {
          value: t.value,
          position: t.position
        }
      }); // eslint-disable-next-line

      t.value = replacements[k](t.value, k);
    }
  });
  return null;
};

var _default = magicStrings;
exports.default = _default;