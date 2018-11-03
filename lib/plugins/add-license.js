"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _remarkLicense = _interopRequireDefault(require("remark-license"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = ({
  logger: {
    log
  },
  plugins: {
    addLicense: addLicenseConfig
  }
}) => {
  if (!addLicenseConfig) {
    return () => {};
  }

  return () => {
    try {
      return (0, _remarkLicense.default)(addLicenseConfig);
    } catch (err) {
      log({
        type: 'add-license/error',
        level: 'error',
        payload: {
          err
        }
      });
    }
  };
};

exports.default = _default;