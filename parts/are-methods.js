/**
 * -----------------------------------------------------------------------------
 * ARE METHODS
 * -----------------------------------------------------------------------------
 * @version 0.0.1
 * @see [are]{@link https://github.com/imaginate/are/blob/master/parts/are-methods.js}
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2015 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */


// *****************************************************************************
// SECTION: ARE METHODS
// *****************************************************************************

// Note for all are methods:
// @param {*...} vals - The values to evaluate. Must have at least two different
//   values to evaluate. The values can be provided in a single array or
//   multiple params.

// The helper, checkAreMethod, is defined at the bottom of this section.


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
are.func = function() {
  return checkAreMethod('func', arguments);
};
are.fn = are.func;
try {
  are.function = are.func;
}
catch(e) {
  logSupportMsg('are', 'function', 'func');
}

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
try {
  are.arguments = are.args;
}
catch (e) {
  logSupportMsg('are', 'arguments', 'args');
}


////////////////////////////////////////////////////////////////////////////
// ARE METHODS - DOM OBJECTS
////////////////////////////////////////////////////////////////////////

/**
 * @param {*...} vals
 * @return {boolean}
 */
are.document = function() {
  return checkAreMethod('document', arguments);
};
are.doc = are.document;

/**
 * @param {*...} vals
 * @return {boolean}
 */
are.element = function() {
  return checkAreMethod('element', arguments);
};
are.elem = are.element;


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

  args = args.length > 1 ? sliceArr.call(args, 0) : args[0];
  if ( !is.arr(args) ) {
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
