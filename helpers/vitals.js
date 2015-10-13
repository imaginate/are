/**
 * -----------------------------------------------------------------------------
 * VITALS LIBRARY
 * -----------------------------------------------------------------------------
 * @file Functional shortcuts and helpers.
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2015 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [Lodash]{@link https://github.com/lodash/lodash}
 * @see [ShellJS]{@link https://github.com/shelljs/shelljs}
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';

/** @type {!Object} */
var fs = require('fs');
/** @type {!Object<string, function>} */
var is = require('./is');
/** @type {!Function<string, function>} */
var log = require('./log');
/** @type {!Object} */
var shell = require('shelljs');
/** @type {function} */
var forOwn = require('lodash/object/forOwn');


////////////////////////////////////////////////////////////////////////////////
// DEFINE MAIN FUNCTION
////////////////////////////////////////////////////////////////////////////////

/** @type {!Function<string, function>} */
function Vitals() {
  forOwn(Vitals, function(/** function */ method, /** string */ key) {
    global[key] = method;
  });
  global.is = is;
  global.log = log;
}


////////////////////////////////////////////////////////////////////////////////
// DEFINE PUBLIC METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * Executes a function for a set number of times.
 * @param {number} cycles
 * @param {function} action
 * @return {boolean}
 */
Vitals.loop = function(cycles, action) {

  is.num(cycles, true) || log.error(
    'Invalid `Vitals.loop` Call',
    'invalid type for `cycles` param',
    { argMap: true, cycles: cycles }
  );

  is.func(action) || log.error(
    'Invalid `Vitals.loop` Call',
    'invalid type for `action` param',
    { argMap: true, action: action }
  );

  cycles = cycles < 0 ? Math.abs(cycles) : cycles;
  while(cycles--) {
    action();
  }
  return true;
};

/**
 * A shortcut for Object.prototype.hasOwnProperty that accepts null objects.
 * @param {?(Object|function)} obj
 * @param {*} prop
 * @return {boolean}
 */
Vitals.has = function(obj, prop) {

  ( is.null(obj) || is.obj(obj) || is.func(obj) ) || log.error(
    'Invalid `Vitals.has` Call',
    'invalid type for `obj` param',
    { argMap: true, obj: obj, prop: prop }
  );

  prop = is.str(prop) || is.num(prop) ? prop : String(prop);
  return !!obj && obj.hasOwnProperty(prop);
};

/**
 * @see https://lodash.com/docs#merge
 * @param {!Object} dest
 * @param {!Object...} sources
 * @param {function=} customizer
 * @param {Object=} thisArg
 * @return {!Object}
 */
Vitals.merge = require('lodash/object/merge');

/**
 * A shortcut for iterating over object maps and arrays.
 * @see https://lodash.com/docs#forOwn
 * @param {!(Object|function|Array)} obj
 * @param {function} action
 * @param {Object=} thisArg
 */
Vitals.each = function(obj, action, thisArg) {

  ( is.null(obj) || is.obj(obj) || is.func(obj) ) || log.error(
    'Invalid `Vitals.each` Call',
    'invalid type for `obj` param',
    { argMap: true, obj: obj }
  );

  is.func(action) || log.error(
    'Invalid `Vitals.each` Call',
    'invalid type for `action` param',
    { argMap: true, action: action }
  );

  thisArg = is.obj(thisArg) || is.func(thisArg) ? thisArg : null;

  if ( is.arr(obj) ) {
    obj.forEach(action, thisArg);
  }
  else {
    obj && forOwn(obj, action, thisArg);
  }
};

/**
 * @see https://lodash.com/docs#slice
 * @param {!Array} arr
 * @param {number=} start [default= 0]
 * @param {number=} end [default= arr.length]
 * @return {!Array}
 */
Vitals.slice = require('lodash/array/slice');

/**
 * @see https://lodash.com/docs#fill
 * @param {!Array} arr
 * @param {*} val
 * @param {number=} start [default= 0]
 * @param {number=} end [default= arr.length]
 * @return {!Array}
 */
Vitals.fill = require('lodash/array/fill');

/**
 * @see https://github.com/shelljs/shelljs#execcommand--options--callback
 * @param {string} command
 * @param {Object=} options
 * @param {boolean=} options.async [default= callback ? true : false]
 * @param {boolean=} options.silent [default= false]
 * @param {function=} callback
 */
Vitals.exec = shell.exec;

/**
 * @param {string} source
 * @param {string} dest
 * @param {boolean=} force [default= true]
 */
Vitals.copy = function(source, dest, force) {

  is.file(source) || log.error(
    'Invalid `Vitals.copy` Call',
    'invalid `source` param (i.e. must be a valid filepath string)',
    { argMap: true, source: source }
  );

  is.str(dest) || log.error(
    'Invalid `Vitals.copy` Call',
    'invalid type for `dest` param',
    { argMap: true, dest: dest }
  );

  if (force === false) {
    shell.cp(source, dest)
  }
  else {
    shell.cp('-f', source, dest);
  }
};

/**
 * @param {string} filepath
 * @param {?string=} encoding [default= 'utf8']
 * @return {(string|Buffer)}
 */
Vitals.retrieve = function(filepath, encoding) {

  is.file(filepath) || log.error(
    'Invalid `Vitals.retrieve` Call',
    'invalid `filepath` param (i.e. must be a valid file)',
    { argMap: true, filepath: filepath }
  );

  encoding = is.str(encoding) || is.null(encoding) ? encoding : 'utf8';
  return ( encoding ?
    fs.readFileSync(filepath, encoding) : fs.readFileSync(filepath)
  );
};


////////////////////////////////////////////////////////////////////////////////
// EXPORT LIBRARY
////////////////////////////////////////////////////////////////////////////////

module.exports = Vitals;
