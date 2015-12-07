/**
 * -----------------------------------------------------------------------------
 * EXPORT NODE-ARE LIBRARIES
 * -----------------------------------------------------------------------------
 * @version 0.1.3
 * @see [are]{@link https://github.com/imaginate/are}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2015 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */


;(function(/** !{ is: function, are: function } */ _are) {

  _applyAre(setupAre);
  module.exports = setupAre;

  /**
   * @public
   * @type {function}
   */
  function setupAre() {
    _applyAre(global);
  }

  /**
   * @private
   * @param {(!Object|function)} obj
   */
  function _applyAre(obj) {
    obj.is = _are.is;
    obj.Is = _are.Is;
    obj.are = _are.are;
    obj.Are = _are.Are;
  }

})((function setupAre(undefined) {

  /** @type {boolean} */
  var _log = true;
  /** @type {function} */
  var toStr = Object.prototype.toString;
  /** @type {function} */
  var sliceArr = Array.prototype.slice;
  /** @type {function} */
  var has = (function(hasOwn) {
    return function has(obj, prop) {
      return hasOwn.call(obj, prop);
    };
  })(Object.prototype.hasOwnProperty);
  /** @type {function} */
  var logSupportMsg = function(lib, avoid, use) {
    console.log(
      'Your JS engine does not support ' + lib + '.' + avoid + '(). ' +
      'Use ' + lib + '.' + use + '() instead.'
    );
  };

  // INSERT is-methods.js

  // INSERT are-methods.js

  // INSERT node-methods.js

  // INSERT main-func-helpers.js

  // INSERT is-main-func.js

  // INSERT are-main-func.js


// *****************************************************************************
// SECTION: END
// *****************************************************************************

  return {
    is:  is,
    Is:  is,
    are: are,
    Are: are
  };
})());
