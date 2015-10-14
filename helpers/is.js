/**
 * -----------------------------------------------------------------------------
 * IS LIBRARY
 * -----------------------------------------------------------------------------
 * @file This "is" library is unrelated to the "is" library found in
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

'use strict';

/** @type {!Object} */
var fs = require('fs');


//////////////////////////////////////////////////////////////////////////////
// DEFINE IS OBJ
//////////////////////////////////////////////////////////////////////////

/** @type {!Object<string, function>} */
var is = {};


//////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPERS
//////////////////////////////////////////////////////////////////////////

/** @type {function} */
var toStr = Object.prototype.toString;


//////////////////////////////////////////////////////////////////////////////
// IS METHODS - PRIMITIVES
//////////////////////////////////////////////////////////////////////////

/**
 * @param {*} val
 * @return {boolean}
 */
is.null = function(val) {
  return val === null;
};
is.nil = is.null;

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
 * @param {boolean=} empty - the return value for empty strings [default= true]
 * @return {boolean}
 */
is.string = function(val, empty) {
  return (empty !== false || !!val) && typeof val === 'string';
};
is.str = is.string;

/**
 * Empty strings return false in this method.
 * @param {*} val
 * @return {boolean}
 */
is._string = function(val) {
  return is.string(val, false);
};
is._str = is._string;

/**
 * @param {*} val
 * @param {boolean=} zero - the return value for 0 [default= true]
 * @return {boolean}
 */
is.number = function(val, zero) {
  return (zero !== false || !!val) && typeof val === 'number';
};
is.num = is.number;

/**
 * Zeros return false in this method.
 * @param {*} val
 * @return {boolean}
 */
is._number = function(val) {
  return is.number(val, false);
};
is._num = is._number;


//////////////////////////////////////////////////////////////////////////////
// IS METHODS - JS OBJECTS
//////////////////////////////////////////////////////////////////////////

/**
 * @param {*} val
 * @param {boolean=} funcs - the return value for functions [default= false]
 * @return {boolean}
 */
is.object = function(val, funcs) {
  val = !!val && typeof val;
  return val && ( val === 'object' || (funcs === true && val === 'function') );
};
is.obj = is.object;

/**
 * Functions return true in this method.
 * @param {*} val
 * @return {boolean}
 */
is._object = function(val) {
  return is.obj(val, true);
};
is._obj = is._object;

/**
 * @param {*} val
 * @return {boolean}
 */
is.function = function(val) {
  return !!val && typeof val === 'function';
};
is.func = is.function;
is.fn = is.function;

/**
 * @param {*} val
 * @param {boolean=} args - the return value for arguments [default= false]
 * @return {boolean}
 */
is.array = function(val, args) {
  val = is.obj(val) && toStr.call(val);
  return val && (
    val === '[object Array]' || (args === true && val === '[object Arguments]')
  );
};
is.arr = is.array;

/**
 * Arguments return true in this method.
 * @param {*} val
 * @return {boolean}
 */
is._array = function(val) {
  return is.arr(val, true);
};
is._arr = is._array;

/**
 * @param {*} val
 * @return {boolean}
 */
is.regexp = function(val) {
  return is.obj(val) && toStr.call(val) === '[object RegExp]';
};
is.regex = is.regexp;

/**
 * @param {*} val
 * @return {boolean}
 */
is.args = function(val) {
  return is.obj(val) && toStr.call(val) === '[object Arguments]';
};


//////////////////////////////////////////////////////////////////////////////
// IS METHODS - OTHERS
//////////////////////////////////////////////////////////////////////////

/**
 * Checks if a value is considered empty. For a list of empty values see below.
 *   empty values: 0, "", {}, [], null, undefined, false, NaN, function(){...}
 *   note: for functions this method checks whether it has any defined params:
 *     function(){} => true | function(param){} => false
 * @param {*} val
 * @return {boolean}
 */
is.empty = function(val) {

    /** @type {string} */
    var prop;

    // return: 0, "", null, undefined, false, NaN => true
    if ( !is._obj(val) ) {
      return !val;
    }

    // return: [], function(){} => true
    if ( is.arr(val) || is.func(val) ) {
      return !val.length;
    }

    // return: {} => true
    for (prop in val) {
      if ( val.hasOwnProperty(prop) ) {
        return false;
      }
    }
    return true;
};

/**
 * @param {*} val
 * @return {boolean}
 */
is.buffer = function(val) {
  return Buffer.isBuffer(val);
};
is.buff = is.buffer;

/**
 * @param {string} dirpath
 * @return {boolean}
 */
is.directory = function(dirpath) {

  /** @type {boolean} */
  var result;

  if ( !is._string(dirpath) ) {
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
 * @param {!Array<string>} dirpaths
 * @param {string=} rootdir [default= '']
 * @return {boolean}
 */
is.directories = function(dirpaths, rootdir) {

  /** @type {function} */
  var check;
  /** @type {number} */
  var i;

  if ( !is.array(dirpaths) ) {
    return false;
  }

  rootdir = is._string(rootdir) ? rootdir.replace(/([^\/]$)/, '$1/') : '';
  check = is.directory;
  i = dirpaths.length;
  while (i--) {
    if ( !check( dirpaths[i] ) ) {
      return false;
    }
  }
  return true;
};
is.directorys = is.directories;
is.dirs = is.directories;

/**
 * @param {string} filepath
 * @return {boolean}
 */
is.file = function(filepath) {

  /** @type {boolean} */
  var result;

  if ( !is._string(filepath) ) {
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

  /** @type {function} */
  var check;
  /** @type {number} */
  var i;

  if ( !is.array(filepaths) ) {
    return false;
  }

  rootdir = is._string(rootdir) ? rootdir.replace(/([^\/]$)/, '$1/') : '';
  check = is.file;
  i = filepaths.length;
  while (i--) {
    if ( !check( filepaths[i] ) ) {
      return false;
    }
  }
  return true;
};


////////////////////////////////////////////////////////////////////////////////
// EXPORT LIBRARY
////////////////////////////////////////////////////////////////////////////////

module.exports = is;
