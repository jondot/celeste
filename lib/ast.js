"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.starsFromLink = exports.starsToLink = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

const starsFromLink = link => {
  const text = link.children[0].value;
  const res = text.match(`(.* )★(.*)`);

  if (res) {
    const _res = _slicedToArray(res, 3),
          desc = _res[1],
          stars = _res[2];

    return {
      desc,
      stars: stars || '0'
    };
  }

  return {
    desc: '',
    stars: ''
  };
};

exports.starsFromLink = starsFromLink;

const starsToLink = (link, {
  desc,
  stars
}) => {
  // if (desc && stars) {
  // eslint-disable-next-line
  link.children[0].value = `${desc}★${stars}`; // }

  return link;
};

exports.starsToLink = starsToLink;