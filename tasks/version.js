/**
 * -----------------------------------------------------------------------------
 * MAKE TASK: version
 * -----------------------------------------------------------------------------
 * @file Use `$ node make version` to access this file.
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2015 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';

require('../helpers/vitals')(); // appends helpers to global obj

/** @type {!Object<string, function>} */
var retrieve = require('../helpers/retrieve');
/** @type {function} */
var makeTask = require('../helpers/task');


////////////////////////////////////////////////////////////////////////////////
// DEFINE THE TASK METHODS
////////////////////////////////////////////////////////////////////////////////

/** @type {!Object<string, function>} */
var methods = {};

/**
 * @param {string} version
 */
methods.all = function(version) {

  /** @type {!Array<string>} */
  var filepaths;
  /** @type {!RegExp} */
  var regex;

  regex = /^[0-9][0-9]?\.[0-9][0-9]?\.[0-9][0-9]?$/;
  ( version && regex.test(version) ) || log.error(
    'Invalid `version.all` Task Call',
    'a new semantic version was not provided',
    { argMap: true, version: version }
  );

  filepaths = retrieve.files('.', {
    validExts: '.js',
    validDirs: 'parts|tests'
  }, true);

  filepaths = retrieve.files('.', {
    validExts: '.js',
    validDirs: 'random'
  }, true);

  regex = /\b(v?)[0-9][0-9]?\.[0-9][0-9]?\.[0-9][0-9]?\b/g;
  each(filepaths, function(/** string */ filepath) {
    retrieve.file(filepath)
      .replace(regex, '$1' + version)
      .to(filepath);
  });

  log.pass('Completed `version.all` Task');
};


////////////////////////////////////////////////////////////////////////////////
// EXPORT THE TASK
////////////////////////////////////////////////////////////////////////////////

/** @type {!Task} */
module.exports = makeTask('version', 'all', methods);
