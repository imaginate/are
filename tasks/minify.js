/**
 * -----------------------------------------------------------------------------
 * MAKE TASK: minify
 * -----------------------------------------------------------------------------
 * @file Use `$ node make minify` to access this file.
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2015 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 *
 * Requires:
 * @see [Closure Compiler Java App]{@link https://dl.google.com/closure-compiler/compiler-latest.zip}
 * @see [Java Runtime Environment 7+]{@link https://java.com/en/download/}
 */

'use strict';


////////////////////////////////////////////////////////////////////////////////
// DEFINE & EXPORT THE TASK
////////////////////////////////////////////////////////////////////////////////

/** @type {!Task} */
module.exports = newTask('minify', 'src', {

  /**
   * @param {string=} filename
   */
  src: function src(filename) {

    /** @type {string} */
    var source;
    /** @type {string} */
    var dest;

    filename = stripFileExt(filename);
    filename = hyphenate(filename);
    filename = filename || 'are';

    source = 'src/' + filename + '.js';
    dest = 'src/' + filename + '.min.js';

    is.file(source) || log.error(
      'Failed `minify.src` Task',
      'invalid `filename` param (must be a valid file in the `src` dir)',
      { argMap: true, filename: filename }
    );

    copy.file(source, dest);
    minify(dest);

    log.pass('Completed `minify.src` Task');
  }
});


////////////////////////////////////////////////////////////////////////////////
// DEFINE PRIVATE HELPERS
////////////////////////////////////////////////////////////////////////////////

/**
 * @param {string} filepath
 */
function minify(filepath) {

  /** @type {string} */
  var compiler;
  /** @type {string} */
  var cmd;

  compiler = 'vendor/closure-compiler.jar';

  is.file(compiler) || log.error(
    'Failed `minify` Task',
    'missing compiler: `' + compiler + '`'
  );

  cmd = 'java -jar ' + compiler + ' --js ' + filepath + ' -W QUIET';
  exec(cmd, { silent: true }).output
    .replace(/\r\n?/g, '\n')
    .replace(/^\/\*[\s\S]*?\*\//, getCopyright(filepath))
    .to(filepath);
}

/**
 * @param {string} filepath
 * @return {string}
 */
function getCopyright(filepath) {

  filepath = filepath.replace(/^(?:.*\/)?([a-z-]+)\..*$/i, '$1.js');

  return (
    '/* ' + filepath + ' v0.2.0 (https://github.com/imaginate/are)\n' +
    ' * Copyright (c) 2015 Adam A Smith <adam@imaginate.life>\n'      +
    ' * The Apache License (github.com/imaginate/are/blob/master/LICENSE.md) */'
  );
}

/**
 * @param {string} filename
 * @return {string}
 */
function stripFileExt(filename) {
  return filename && filename.replace(/^(.*)(?:\.js)?$/, '$1');
}

/**
 * @param {string} filename
 * @return {string}
 */
function hyphenate(filename) {
  return filename && filename.replace(/([A-Z])/g, '-$1').toLowerCase();
}
