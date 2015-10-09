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

/** @type {!Object<string, function} */
var are = {};


////////////////////////////////////////////////////////////////////////////
// ARE HELPERS
////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} method
 * @param {!Arguments} args
 * @return {boolean}
 */
function _checkAreArr(method, args) {

  /** @type {function} */
  var check;
  /** @type {number} */
  var i;

  args = args.length > 1 ? _sliceArr.call(args, 0) : args[0];
  if ( !is.array(args) ) {
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


////////////////////////////////////////////////////////////////////////////
// ARE METHODS - PRIMITIVES
////////////////////////////////////////////////////////////////////////

/**
 * @param {*...} vals
 * @return {boolean}
 */
are.null = function() {
  return _checkAreArr('null', arguments);
};
are.nil = are.null;

/**
 * @param {*...} vals
 * @return {boolean}
 */
are.undefined = function() {
  return _checkAreArr('undefined', arguments);
};

/**
 * @param {*...} vals
 * @return {boolean}
 */
are.boolean = function() {
  return _checkAreArr('boolean', arguments);
};
are.bool = are.boolean;

/**
 * @param {*...} vals
 * @return {boolean}
 */
are.string = function() {
  return _checkAreArr('string', arguments);
};
are.str = are.string;

/**
 * Empty strings return false in this method.
 * @param {*...} vals
 * @return {boolean}
 */
are._string = function() {
  return _checkAreArr('_string', arguments);
};
are._str = are._string;

/**
 * @param {*...} vals
 * @return {boolean}
 */
are.number = function() {
  return _checkAreArr('number', arguments);
};
are.num = are.number;

/**
 * Zeros return false in this method.
 * @param {*...} vals
 * @return {boolean}
 */
are._number = function() {
  return _checkAreArr('_number', arguments);
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
  return _checkAreArr('object', arguments);
};
are.obj = are.object;

/**
 * Functions return true in this method.
 * @param {*...} vals
 * @return {boolean}
 */
are._object = function() {
  return _checkAreArr('_object', arguments);
};
are._obj = are._object;

/**
 * @param {*...} vals
 * @return {boolean}
 */
are.func = function() {
  return _checkAreArr('func', arguments);
};
are.fn = are.func;
try {
  are.function = are.func;
}
catch(e) {
  console.log(
    'Your JS engine does not support are.function(). Use are.func() instead.'
  );
}

/**
 * @param {*...} vals
 * @return {boolean}
 */
are.array = function() {
  return _checkAreArr('array', arguments);
};
are.arr = are.array;

/**
 * @param {*...} vals
 * @return {boolean}
 */
are.regexp = function() {
  return _checkAreArr('regexp', arguments);
};
are.regex = are.regexp;


////////////////////////////////////////////////////////////////////////////
// ARE METHODS - DOM OBJECTS
////////////////////////////////////////////////////////////////////////

/**
 * @param {*...} vals
 * @return {boolean}
 */
are.document = function() {
  return _checkAreArr('document', arguments);
};
are.doc = are.document;

/**
 * @param {*...} vals
 * @return {boolean}
 */
are.element = function() {
  return _checkAreArr('element', arguments);
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
  return _checkAreArr('empty', arguments);
};
