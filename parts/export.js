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

  /** @type {!{ is: !Object, are: !Object }} */
  var _are = setupAre();
  /** @type {!Object} */
  var checks = {
    exp: _isObj(typeof exports) && _getObj(exports, true),
    mod: _isObj(typeof module) && _getObj(module, true),
    glo: _isObj(typeof global, true) && _getObj(global),
    win: _isObj(typeof window) && _getObj(window),
    sel: _isObj(typeof self) && _getObj(self),
    roo: _isObj(typeof root) && _getObj(root)
  };
  checks.glo = checks.exp && checks.mod && checks.glo;

  root = ( checks.glo ?
    global : checks.win && window !== (root && root.window) ?
      window : checks.sel ?
        self : checks.roo ?
          root : Function('return this')()
  );

  // window | self | global | this
  checks.win && _applyAre(window);
  checks.sel && _applyAre(self);
  _applyAre(root);

  // exports
  if (checks.exp && checks.mod) {
    if (module.exports === exports) {
      module.exports = _are;
      _applyAre(module.exports);
    }
    else {
      _applyAre(exports);
    }
  }

  // AMD
  if (typeof define === 'function' && define.amd &&
      typeof define.amd === 'object') {
    define(function() {
      return _are;
    });
  }

  /**
   * @private
   * @param {string} typeOf
   * @param {boolean=} noFunc
   * @return {boolean}
   */
  function _isObj(typeOf, noFunc) {
    return typeOf === 'object' || (!noFunc && typeOf === 'function');
  }

  /**
   * @private
   * @param {(Object|?function)} obj
   * @param {boolean=} testNodeType
   * @return {boolean}
   */
  function _getObj(obj, testNodeType) {
    obj = obj && testNodeType && obj.nodeType ? false : obj;
    return obj && !testNodeType && obj.Object !== Object ? false : !!obj;
  }

  /**
   * @private
   * @param {(!Object|function)} obj
   * @return {boolean}
   */
  function _applyAre(obj) {
    obj.is = _are.is;
    obj.Is = _are.Is;
    obj.are = _are.are;
    obj.Are = _are.Are;
    return true;
  }

})(this, function setupAre() {

  "use strict";

  /** @type {function} */
  var _toStr = Object.prototype.toString;
  /** @type {function} */
  var _sliceArr = Array.prototype.slice;

  // INSERT is-main-func.js

  // INSERT is-methods.js

  // INSERT are-main-func.js

  // INSERT are-methods.js

  return {
    is:  is,
    Is:  is,
    are: are,
    Are: are
  };
});
