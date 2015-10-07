/**
 * -----------------------------------------------------------------------------
 * IS LIBRARY
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2015 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';

/** @type {!Object} */
var fs = require('fs');


////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPERS
////////////////////////////////////////////////////////////////////////////////

/** @type {function} */
var toStr = Object.prototype.toString;


////////////////////////////////////////////////////////////////////////////////
// IS METHODS - PRIMITIVES
////////////////////////////////////////////////////////////////////////////////

/** @type {!Object} */
var is = {};

/**
 * @param {*} val
 * @return {boolean}
 */
is.null = function(val) {
  return val === null;
};

/**
 * @param {*} val
 * @return {boolean}
 */
is.undefined = function(val) {
  return typeof val === 'undefined';
};

/**
 * @param {*} val
 * @return {boolean}
 */
is.boolean = function(val) {
  return typeof val === 'boolean';
};
is.bool = is.boolean;

/**
 * @param {*} val
 * @param {boolean=} empty - the return value for empty strings [default= false]
 * @return {boolean}
 */
is.string = function(val, empty) {
  return (empty === true || !!val) && typeof val === 'string';
};
is.str = is.string;

/**
 * @param {*} val
 * @param {boolean=} zero - the return value for 0 [default= false]
 * @return {boolean}
 */
is.number = function(val, zero) {
  return (zero === true || !!val) && typeof val === 'number';
};
is.num = is.number;


////////////////////////////////////////////////////////////////////////////////
// IS METHODS - OBJECTS
////////////////////////////////////////////////////////////////////////////////

/**
 * @param {*} val
 * @return {boolean}
 */
is.object = function(val) {
  return !!val && typeof val === 'object';
};
is.obj = is.object;

/**
 * @param {*} val
 * @return {boolean}
 */
is.func = function(val) {
  return !!val && typeof val === 'function';
};

/**
 * @param {*} val
 * @return {boolean}
 */
is.array = function(val) {
  return is.obj(val) && toStr.call(val) === '[object Array]';
};
is.arr = is.array;

/**
 * @param {*} val
 * @return {boolean}
 */
is.regexp = function(val) {
  return is.obj(val) && toStr.call(val) === '[object RegExp]';
};
is.regex = is.regexp;


////////////////////////////////////////////////////////////////////////////////
// IS METHODS - OTHERS
////////////////////////////////////////////////////////////////////////////////

/**
 * @param {*} val
 * @return {boolean}
 */
is.buffer = function(val) {
  return Buffer.isBuffer(val);
};
is.buf = is.buffer;

/**
 * @param {string} dirpath
 * @return {boolean}
 */
is.directory = function(dirpath) {

  /** @type {boolean} */
  var result;

  if ( !is.str(dirpath) ) {
    return false;
  }

  try {
    result = fs.statSync(dirpath).isDirectory();
  }
  catch (e) {
    result = false;
  }
  finally {
    return result;
  }
};
is.dir = is.directory;

/**
 * @param {string} filepath
 * @return {boolean}
 */
is.file = function(filepath) {

  /** @type {boolean} */
  var result;

  if ( !is.str(filepath) ) {
    return false;
  }

  try {
    result = fs.statSync(filepath).isFile();
  }
  catch (e) {
    result = false;
  }
  finally {
    return result;
  }
};

/**
 * @param {!Array<string>} filepaths
 * @param {string=} rootdir [default= '']
 * @return {boolean}
 */
is.files = function(filepaths, rootdir) {
  rootdir = is.str(rootdir) ? rootdir.replace(/([^\/]$)/, '$1/') : '';
  return filepaths.every(function(/** string */ filepath) {
    return is.file(rootdir + filepath);
  });
};


////////////////////////////////////////////////////////////////////////////////
// EXPORT LIBRARY
////////////////////////////////////////////////////////////////////////////////

module.exports = is;
