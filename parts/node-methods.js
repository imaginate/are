/**
 * -----------------------------------------------------------------------------
 * NODE.JS ONLY - IS & ARE METHODS
 * -----------------------------------------------------------------------------
 * @version 0.0.1
 * @see [node methods]{@link https://github.com/imaginate/are/blob/master/parts/node-methods.js}
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2015 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

/** @type {!Object} */
var fs = require('fs');


////////////////////////////////////////////////////////////////////////////////
// IS METHODS
////////////////////////////////////////////////////////////////////////////////

/** @type {!Object} */
var is = {};

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

  if ( !isStr(dirpath) ) {
    return false;
  }

  try {
    result = fs.statSync(dirpath).isDirectory();
  }
  catch (e) {
    result = false;
  }
  return result;
};
is.dir = is.directory;

/**
 * @param {!Array<string>} dirpaths
 * @param {string=} rootdir [default= '']
 * @return {boolean}
 */
is.directories = function(dirpaths, rootdir) {
  rootdir = isStr(rootdir) ? rootdir.replace(/([^\/]$)/, '$1/') : '';
  return dirpaths.every(function(/** string */ dirpath) {
    return is.dir(rootdir + dirpath);
  });
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

  if ( !isStr(filepath) ) {
    return false;
  }

  try {
    result = fs.statSync(filepath).isFile();
  }
  catch (e) {
    result = false;
  }
  return result;
};

/**
 * @param {!Array<string>} filepaths
 * @param {string=} rootdir [default= '']
 * @return {boolean}
 */
is.files = function(filepaths, rootdir) {
  rootdir = isStr(rootdir) ? rootdir.replace(/([^\/]$)/, '$1/') : '';
  return filepaths.every(function(/** string */ filepath) {
    return is.file(rootdir + filepath);
  });
};


////////////////////////////////////////////////////////////////////////////////
// ARE METHODS
////////////////////////////////////////////////////////////////////////////////

/** @type {!Object} */
var are = {};

/**
 * @param {*...} vals
 * @return {boolean}
 */
are.buffer = function() {
  return checkArr(is.buffer, parseArgs('buffer', arguments));
};
are.buff = are.buffer;

/**
 * @param {*...} vals
 * @return {boolean}
 */
are.directory = function() {
  return checkArr(is.directory, parseArgs('directory', arguments));
};
are.dir = are.directory;

/**
 * @param {*...} vals
 * @return {boolean}
 */
are.file = function() {
  return checkArr(is.file, parseArgs('file', arguments));
};


////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPERS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
function isArr(val) {
  return !!val && typeof val === 'object' &&
         Object.prototype.toString.call(val) === '[object Array]';
}

/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
function isStr(val) {
  return !!val && typeof val === 'string';
}

/**
 * @private
 * @param {string} method
 * @param {!Arguments} args
 * @return {!Array<*>}
 */
function parseArgs(method, args) {
  args = args.length > 1 ? Array.prototype.slice.call(args, 0) : args[0];
  if ( !isArr(args) ) {
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


////////////////////////////////////////////////////////////////////////////////
// EXPORT THE NODE METHODS
////////////////////////////////////////////////////////////////////////////////

module.exports = {
  is:  is,
  are: are
};
