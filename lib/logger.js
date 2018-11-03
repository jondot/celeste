"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class _default {
  constructor(formatter) {
    _defineProperty(this, "errors", []);

    _defineProperty(this, "formatter", () => {});

    _defineProperty(this, "log", msg => {
      if (msg.level === 'error') {
        this.errors.push(msg);
      }

      this.formatter(msg);
    });

    this.formatter = formatter;
  }

}

exports.default = _default;