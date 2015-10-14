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
module.exports = newTask('minify', 'are-nodeAre', {

  are: function are() {

    /** @type {string} */
    var source;
    /** @type {string} */
    var dest;

    source = 'src/are.js';
    dest = 'src/are.min.js';

    copy.file(source, dest);
    minify(dest);

    log.pass('Completed `minify.are` Task');
  },

  nodeAre: function nodeAre() {

    /** @type {string} */
    var source;
    /** @type {string} */
    var dest;

    source = 'src/node-are.js';
    dest = 'src/node-are.min.js';

    copy.file(source, dest);
    minify(dest);

    log.pass('Completed `minify.nodeAre` Task');
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

  filepath = filepath.replace(/^(?:\.\/)?src\/([a-z-]+)\..*$/i, '$1.js');

  return (
    '/* ' + filepath + ' v0.1.0 (https://github.com/imaginate/are)\n' +
    ' * Copyright (c) 2015 Adam A Smith <adam@imaginate.life>\n'      +
    ' * The Apache License (github.com/imaginate/are/blob/master/LICENSE.md) */'
  );
}
