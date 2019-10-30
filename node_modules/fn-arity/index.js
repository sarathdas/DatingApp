/* npm install fn-arity
 * fn = require('fn-arity')(3, fn);
 * change functions's arity (which could be get by functionName.length)
 */

module.exports = function (arity, fn) {
  if (arity === 0) return function () { return fn.apply(this, arguments); };
  else if (arity === 1) return function (err) { return fn.apply(this, arguments); };
  else if (arity === 2) return function (err, a) { return fn.apply(this, arguments); };
  else if (arity === 3) return function (err, a, b) { return fn.apply(this, arguments); };
  else if (arity === 4) return function (err, a, b, c) { return fn.apply(this, arguments); };
  else if (arity === 5) return function (err, a, b, c, d) { return fn.apply(this, arguments); };
  else if (arity === 6) return function (err, a, b, c, d, e) { return fn.apply(this, arguments); };
  else if (arity === 7) return function (err, a, b, c, d, e, f) { return fn.apply(this, arguments); };
  else if (arity === 8) return function (err, a, b, c, d, e, f, g) { return fn.apply(this, arguments); };
  else if (arity === 9) return function (err, a, b, c, d, e, f, g, h) { return fn.apply(this, arguments); };
  else if (arity === 10) return function (err, a, b, c, d, e, f, g, h, i) { return fn.apply(this, arguments); };
  else return fn;
}
