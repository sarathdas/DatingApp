var arity = require('fn-arity');

module.exports = function (arity, efn, gfn) {
  if ('function' == typeof arity) {
    gfn = efn;
    efn = arity;
    arity = false;
  }
  var rt = function (err) {
    if (err) return efn.apply(this, arguments);
    else return gfn.apply(this, Array.prototype.slice.call(arguments, 1));
  };
  if (arity === 0) return arity(0, rt);
  else if (arity === 1) arity(1, rt);
  else if (arity === 2) arity(2, rt);
  else if (arity === 3) arity(3, rt);
  else if (arity === 4) arity(4, rt);
  else if (arity === 5) arity(5, rt);
  else if (arity === 6) arity(6, rt);
  else if (arity === 7) arity(7, rt);
  else if (arity === 8) arity(8, rt);
  else if (arity === 9) arity(9, rt);
  else if (arity === 10) arity(10, rt);
  else return rt;
};
