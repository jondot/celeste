"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const formatMessage = msg => {
  switch (msg.type) {
    case 'plugins/fetch-stars/update':
      return `${msg.payload.title}\t +${msg.payload.diff} (${msg.payload.from} -> ${msg.payload.to})`;

    case 'plugins/fetch-stars/url-error':
      return `error: ${msg.payload.url} ${msg.payload.res}`;

    case 'plugins/sort-by-stars/exclude-link':
      return `excluding ${msg.payload.link}`;

    default:
      return `no formatter for: ${msg.type}`;
  }
};

const format = msg => {
  console.log(formatMessage(msg));
};

var _default = format;
exports.default = _default;