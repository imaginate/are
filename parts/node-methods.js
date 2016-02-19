/**
 * -----------------------------------------------------------------------------
 * NODE.JS ONLY - IS & ARE METHODS
 * -----------------------------------------------------------------------------
 * @version 0.3.2
 * @see [node methods]{@link https://github.com/imaginate/are/blob/master/parts/node-methods.js}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2015 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */


// *****************************************************************************
// SECTION: NODE.JS ONLY IS & ARE METHODS
// *****************************************************************************


/** @type {!Object} */
var fs = require('fs');


////////////////////////////////////////////////////////////////////////////////
// IS METHODS
////////////////////////////////////////////////////////////////////////////////

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
// ARE METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * @param {*...} vals
 * @return {boolean}
 */
are.buffer = function() {
  return checkAreMethod('buffer', arguments);
};
are.buff = are.buffer;

/**
 * @param {*...} vals
 * @return {boolean}
 */
are.directory = function() {
  return checkAreMethod('directory', arguments);
};
are.dir = are.directory;

/**
 * @param {*...} vals
 * @return {boolean}
 */
are.file = function() {
  return checkAreMethod('file', arguments);
};
