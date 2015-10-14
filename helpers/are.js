/**
 * -----------------------------------------------------------------------------
 * ARE LIBRARY
 * -----------------------------------------------------------------------------
 * @file This "are" library is unrelated to the "are" library found in
 *   "src/are.js". It is only used with the makefile, its tasks, and its
 *   helpers.
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2015 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

/** @type {!Object<string, function>} */
var is = require('./is');


//////////////////////////////////////////////////////////////////////////////
// DEFINE ARE OBJ
//////////////////////////////////////////////////////////////////////////

/** @type {!Object<string, function>} */
var are = {};


////////////////////////////////////////////////////////////////////////////
// ARE METHODS - PRIMITIVES
////////////////////////////////////////////////////////////////////////

/**
 * @param {*...} vals
 * @return {boolean}
 */
are.null = function() {
  return checkAreMethod('null', arguments);
};
are.nil = are.null;

/**
 * @param {*...} vals
 * @return {boolean}
 */
are.undefined = function() {
  return checkAreMethod('undefined', arguments);
};

/**
 * @param {*...} vals
 * @return {boolean}
 */
are.boolean = function() {
  return checkAreMethod('boolean', arguments);
};
are.bool = are.boolean;

/**
 * @param {*...} vals
 * @return {boolean}
 */
are.string = function() {
  return checkAreMethod('string', arguments);
};
are.str = are.string;

/**
 * Empty strings return false in this method.
 * @param {*...} vals
 * @return {boolean}
 */
are._string = function() {
  return checkAreMethod('_string', arguments);
};
are._str = are._string;

/**
 * @param {*...} vals
 * @return {boolean}
 */
are.number = function() {
  return checkAreMethod('number', arguments);
};
are.num = are.number;

/**
 * Zeros return false in this method.
 * @param {*...} vals
 * @return {boolean}
 */
are._number = function() {
  return checkAreMethod('_number', arguments);
};
are._num = are._number;


////////////////////////////////////////////////////////////////////////////
// ARE METHODS - JS OBJECTS
////////////////////////////////////////////////////////////////////////

/**
 * @param {*...} vals
 * @return {boolean}
 */
are.object = function() {
  return checkAreMethod('object', arguments);
};
are.obj = are.object;

/**
 * Functions return true in this method.
 * @param {*...} vals
 * @return {boolean}
 */
are._object = function() {
  return checkAreMethod('_object', arguments);
};
are._obj = are._object;

/**
 * @param {*...} vals
 * @return {boolean}
 */
are.function = function() {
  return checkAreMethod('function', arguments);
};
are.func = are.function;
are.fn = are.function;

/**
 * @param {*...} vals
 * @return {boolean}
 */
are.array = function() {
  return checkAreMethod('array', arguments);
};
are.arr = are.array;

/**
 * Arguments return true in this method.
 * @param {*...} vals
 * @return {boolean}
 */
are._array = function() {
  return checkAreMethod('_array', arguments);
};
are._arr = are._array;

/**
 * @param {*...} vals
 * @return {boolean}
 */
are.regexp = function() {
  return checkAreMethod('regexp', arguments);
};
are.regex = are.regexp;

/**
 * @param {*...} vals
 * @return {boolean}
 */
are.args = function() {
  return checkAreMethod('args', arguments);
};


//////////////////////////////////////////////////////////////////////////////
// ARE METHODS - OTHERS
//////////////////////////////////////////////////////////////////////////

/**
 * Checks if each value is considered empty. See below for all empty values.
 *   empty values: 0, "", {}, [], null, undefined, false, NaN, function(){...}
 *   note: for functions this method checks whether it has any defined params:
 *     function(){} => true | function(param){} => false
 * @param {*...} vals
 * @return {boolean}
 */
are.empty = function() {
  return checkAreMethod('empty', arguments);
};

/**
 * @param {*...} vals
 * @return {boolean}
 */
are.buffer = function() {
  return checkAreMethod('buffer', arguments);
};
are.buff = are.buffer;

/**
 * @param {*...} vals
 * @return {boolean}
 */
are.directory = function() {
  return checkAreMethod('directory', arguments);
};
are.dir = are.directory;

/**
 * @param {*...} vals
 * @return {boolean}
 */
are.file = function() {
  return checkAreMethod('file', arguments);
};


////////////////////////////////////////////////////////////////////////////
// ARE HELPERS
////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} method
 * @param {!Arguments} args
 * @return {boolean}
 */
function checkAreMethod(method, args) {

  /** @type {function} */
  var check;
  /** @type {number} */
  var i;

  args = args.length > 1 ? args : args[0];
  if ( !is._arr(args) ) {
    throw new Error(
      'An are.' + method + '(vals) call did not receive multiple vals to ' +
      'evaluate'
    );
    args = [ args ];
  }

  check = is[method];
  i = args.length;
  while (i--) {
    if ( !check( args[i] ) ) {
      return false;
    }
  }
  return true;
}
