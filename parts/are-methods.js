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

;(function() {

  ////////////////////////////////////////////////////////////////////////////
  // DEFINE PRIVATE ARE HELPERS
  ////////////////////////////////////////////////////////////////////////

  /**
   * @private
   * @param {string} method
   * @param {!Arguments} args
   * @return {!Array<*>}
   */
  function parseArgs(method, args) {
    args = args.length > 1 ? _sliceArr.call(args, 0) : args[0];
    if ( !is.arr(args) ) {
      throw new Error(
        'An are.' + method + '(vals) call did not receive multiple vals to ' +
        'evaluate'
      );
      return [ args ];
    }
    return args;
  }

  /**
   * @private
   * @param {function} check
   * @param {!Array<*>} vals
   * @return {boolean}
   */
  function checkArr(check, vals) {

    /** @type {number} */
    var i;

    i = vals.length;
    while (i--) {
      if ( !check( vals[i] ) ) {
        return false;
      }
    }
    return true;
  }


  ////////////////////////////////////////////////////////////////////////////
  // DEFINE PUBLIC ARE METHODS - PRIMITIVES
  ////////////////////////////////////////////////////////////////////////

  /**
   * @param {*...} vals
   * @return {boolean}
   */
  are.null = function() {
    return checkArr(is.null, parseArgs('null', arguments));
  };

  /**
   * @param {*...} vals
   * @return {boolean}
   */
  are.undefined = function() {
    return checkArr(is.undefined, parseArgs('undefined', arguments));
  };

  /**
   * @param {*...} vals
   * @return {boolean}
   */
  are.boolean = function() {
    return checkArr(is.boolean, parseArgs('boolean', arguments));
  };
  are.bool = are.boolean;

  /**
   * @param {*...} vals
   * @return {boolean}
   */
  are.string = function() {
    return checkArr(is.string, parseArgs('string', arguments));
  };
  are.str = are.string;

  /**
   * @param {*...} vals
   * @return {boolean}
   */
  are.number = function() {
    return checkArr(is.number, parseArgs('number', arguments));
  };
  are.num = are.number;


  ////////////////////////////////////////////////////////////////////////////
  // DEFINE PUBLIC ARE METHODS - JS OBJECTS
  ////////////////////////////////////////////////////////////////////////

  /**
   * @param {*...} vals
   * @return {boolean}
   */
  are.object = function() {
    return checkArr(is.object, parseArgs('object', arguments));
  };
  are.obj = are.object;

  /**
   * @param {*...} vals
   * @return {boolean}
   */
  are.func = function() {
    return checkArr(is.func, parseArgs('function', arguments));
  };
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
    return checkArr(is.array, parseArgs('array', arguments));
  };
  are.arr = are.array;

  /**
   * @param {*...} vals
   * @return {boolean}
   */
  are.regexp = function() {
    return checkArr(is.regexp, parseArgs('regexp', arguments));
  };
  are.regex = are.regexp;


  ////////////////////////////////////////////////////////////////////////////
  // DEFINE PUBLIC ARE METHODS - DOM OBJECTS
  ////////////////////////////////////////////////////////////////////////

  /**
   * @param {*...} vals
   * @return {boolean}
   */
  are.document = function() {
    return checkArr(is.document, parseArgs('document', arguments));
  };
  are.doc = are.document;

  /**
   * @param {*...} vals
   * @return {boolean}
   */
  are.element = function() {
    return checkArr(is.element, parseArgs('element', arguments));
  };
  are.elem = are.element;

})();
