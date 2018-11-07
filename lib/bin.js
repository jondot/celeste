#!/usr/bin/env node
"use strict";

var _yargs = _interopRequireDefault(require("yargs"));

var _path = _interopRequireDefault(require("path"));

var _formatters = _interopRequireDefault(require("./formatters"));

var _runner = _interopRequireDefault(require("./runner"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function main() {
  return _main.apply(this, arguments);
}

function _main() {
  _main = _asyncToGenerator(function* () {
    const _yargs$usage$options = _yargs.default.usage('Usage: $0 <commands> [options]').options({
      input: {
        alias: 'i',
        describe: 'input file',
        demandOption: true
      },
      config: {
        alias: 'c',
        describe: 'configuration file'
      },
      output: {
        alias: 'o',
        describe: 'File to output to',
        demandOption: true
      },
      format: {
        alias: 'f',
        describe: 'Output format',
        choices: Object.keys(_formatters.default)
      }
    }),
          argv = _yargs$usage$options.argv; // eslint-disable-next-line


    const config = argv.config ? require(_path.default.join(process.cwd(), argv.config)) : {};
    const logger = yield (0, _runner.default)(argv, config);

    if (logger.errors.length > 0) {
      logger.log({
        type: 'celeste/error-summary',
        level: 'info',
        payload: {
          errors: logger.errors
        }
      });
      process.exit(1);
    }
  });
  return _main.apply(this, arguments);
}

main();