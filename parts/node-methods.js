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
// DEFINE PUBLIC METHODS - OTHERS
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

  if ( !is.str(dirpath) ) {
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
  rootdir = is.str(rootdir) ? rootdir.replace(/([^\/]$)/, '$1/') : '';
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

  if ( !is.str(filepath) ) {
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
  rootdir = is.str(rootdir) ? rootdir.replace(/([^\/]$)/, '$1/') : '';
  return filepaths.every(function(/** string */ filepath) {
    return is.file(rootdir + filepath);
  });
};
