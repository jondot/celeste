"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _chalk = _interopRequireDefault(require("chalk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const levels = {
  info: {
    icon: 'ℹ',
    color: _chalk.default.white
  },
  debug: {
    icon: '…',
    color: _chalk.default.gray
  },
  warn: {
    icon: '⚠',
    color: _chalk.default.yellow
  },
  error: {
    icon: '✖',
    color: _chalk.default.red
  }
};

const printWithMessage = msg => str => levels[msg.level].color(`${levels[msg.level].icon} [${msg.type}] ${str}`);

const formatMessage = msg => {
  const print = printWithMessage(msg);

  switch (msg.type) {
    case 'fetch-stars/update':
      return print(`${msg.payload.title}\t +${msg.payload.diff} (${msg.payload.from} -> ${msg.payload.to})`);

    case 'fetch-stars/url-error':
      return print(`${msg.payload.url} ${msg.payload.res}`);

    case 'fetch-stars/progress':
      return print(`link(s): ${msg.payload.counter}`);

    case 'broken-links/url-error':
      return print(`${msg.payload.url} ${msg.payload.res}`);

    case 'broken-links/progress':
      return print(`link(s): ${msg.payload.counter}`);

    case 'sort-by-stars/exclude-link':
      return print(`excluding <${msg.payload.link}>`);

    case 'magic-strings/flagged':
      return print(`found '${msg.payload.value}' at Ln ${msg.payload.position.start.line}, Col ${msg.payload.position.start.column}`);

    case 'dedup-links/dupe':
      return print(`duplicate link: '${msg.payload.url}`);

    case 'celeste/error-summary':
      return print(`found ${msg.payload.errors.length} error(s):\n${msg.payload.errors.map(formatMessage).join('\n')}`);

    case 'celeste':
      return print(`<${msg.payload.err}>`);

    default:
      return `no formatter for: ${msg.type}`;
  }
};

const format = msg => {
  console.log(formatMessage(msg));
};

var _default = format;
exports.default = _default;