#!/usr/bin/env node
"use strict";

var _yargs = _interopRequireDefault(require("yargs"));

var _fs = _interopRequireDefault(require("fs"));

var _processor = _interopRequireDefault(require("./processor"));

var _text = _interopRequireDefault(require("./formatters/text"));

var _json = _interopRequireDefault(require("./formatters/json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const formatters = {
  text: _text.default,
  json: _json.default
};

const _yargs$usage$options = _yargs.default.usage('Usage: $0 <commands> [options]').options({
  file: {
    alias: 'f',
    describe: 'input file',
    demandOption: true
  },
  out: {
    alias: 'o',
    describe: 'File to output to'
  },
  report: {
    alias: 'r',
    describe: 'Report format',
    choices: Object.keys(formatters)
  }
}),
      argv = _yargs$usage$options.argv;

const content = _fs.default.readFileSync(argv.file).toString();

const out = argv.out ? _fs.default.openSync(argv.out, 'w') : 1;
const processor = (0, _processor.default)({
  log: formatters[argv.report]
});

function main() {
  return _main.apply(this, arguments);
}

function _main() {
  _main = _asyncToGenerator(function* () {
    const res = yield processor.process(content);
    yield _fs.default.write(out, res, () => {});
  });
  return _main.apply(this, arguments);
}

main();