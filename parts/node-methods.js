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
 * @param {string} path
 * @return {boolean}
 */
is.directory = function(path) {

  /** @type {boolean} */
  var result;

  if ( !is.str(path) ) {
    Log.error('Ivalid `is.directory` Call', 'invalid `path` param', {
      argMap: true,
      path:   path
    });
    return false;
  }

  try {
    result = Fs.statSync(path).isDirectory();
  }
  catch (e) {
    result = false;
  }
  return result;
};
is.dir = is.directory;

/**
 * @param {string} path
 * @return {boolean}
 */
is.file = function(path) {

  /** @type {boolean} */
  var result;

  if ( !is.str(path) ) {
    return false;
  }

  try {
    result = Fs.statSync(path).isFile();
  }
  catch (e) {
    result = false;
  }
  return result;
};

/**
 * @param {!Array<string>} files
 * @param {string=} root [default= '']
 * @return {boolean}
 */
is.files = function(files, root) {

  /** @type {boolean} */
  var result;

  root = is.str(root) ? root.replace(/([^\/]$)/, '$1/') : '';
  return files.every(function(/** string */ file) {
    if ( !is.str(file) ) {
      return false;
    }
    try {
      result = Fs.statSync(root + file).isFile();
    }
    catch (e) {
      result = false;
    }
    return result;
  });
};
