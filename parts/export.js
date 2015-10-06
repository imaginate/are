/**
 * -----------------------------------------------------------------------------
 * EXPORT ARE LIBRARIES
 * -----------------------------------------------------------------------------
 * @version 0.0.1
 * @see [are]{@link https://github.com/imaginate/are}
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2015 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

;(function(/** Object */ root, /** function(Object) */ setupAre) {

  /** @type {(Object|?function)} */
  var exports = _isObj(typeof exports) && _getObj(exports, true);
  /** @type {(Object|?function)} */
  var module = _isObj(typeof module) && _getObj(module, true);
  /** @type {(Object|?function)} */
  var window = _isObj(typeof window) && _getObj(window);

  root = (function(global, window, self) {
    return global || window || self || root;
  })(
    exports && module && _isObj(typeof global, true) && _getObj(global),
    ( window && root && window === root.window ? null : window ),
    _isObj(typeof self) && _getObj(self)
  );

  setupAre(root || {});

  // AMD
  if (typeof define === 'function' && define.amd &&
      typeof define.amd === 'object') {
    define('are', function() {
      return null;
    });
  }

  /**
   * @private
   * @param {string} typeOf
   * @param {boolean=} noFunc
   * @return {?boolean}
   */
  function _isObj(typeOf, noFunc) {
    return typeOf === 'object' || (!noFunc && typeOf === 'function') || null;
  }

  /**
   * @private
   * @param {(Object|?function)} obj
   * @param {boolean=} testNodeType
   * @return {boolean}
   */
  function _getObj(obj, testNodeType) {
    obj = obj && testNodeType && obj.nodeType ? null : obj;
    return obj && !testNodeType && !obj.Object ? null : obj;
  }

})(this, function setupAre(/** Object */ root) {

  "use strict";

  /** @type {!Object} */
  var console = typeof console === 'object' && console ? console : {};
  console.log = console.log || function() {};

  /** @type {function} */
  var _toStr = Object.prototype.toString;

  // INSERT is-main-func.js

  // INSERT is-methods.js

  // INSERT are-main-func.js

  // INSERT are-methods.js

  root.is = is;
  root.Is = is;
  root.are = are;
  root.Are = are;
});