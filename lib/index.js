"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Foobar {
  constructor() {
    _defineProperty(this, "state", {
      yes: 1
    });
  }

}

const foo =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* () {
    const res = yield Promise.resolve(new Foobar());
    return res;
  });

  return function foo() {
    return _ref.apply(this, arguments);
  };
}();

const p = () => {
  var _;

  return _ = 2, console.log(_);
};

console.log('hello', {
  foo: foo()
});
p();