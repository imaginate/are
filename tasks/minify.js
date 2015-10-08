/**
 * -----------------------------------------------------------------------------
 * MAKE TASK: minify
 * -----------------------------------------------------------------------------
 * @file Use `$ node make minify` to access this file.
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2015 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 * Requires:
 * @see [Closure Compiler Java App]{@link https://dl.google.com/closure-compiler/compiler-latest.zip}
 * @see [Java Runtime Environment 7+]{@link https://java.com/en/download/}
 */

'use strict';

require('../helpers/vitals'); // appends helpers to global obj

/** @type {function} */
var makeTask = require('../helpers/task');


////////////////////////////////////////////////////////////////////////////////
// DEFINE PRIVATE METHODS
////////////////////////////////////////////////////////////////////////////////

function minify(filepath, copyright) {

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
    .replace(/^\/\*[\s\S]*?\*\//, copyright)
    .to(filepath);
}


////////////////////////////////////////////////////////////////////////////////
// DEFINE THE TASK METHODS
////////////////////////////////////////////////////////////////////////////////

/** @type {!Object<string, function>} */
var methods = {};

/** @type {function} */
methods.are = function() {

  /** @type {string} */
  var source;
  /** @type {string} */
  var dest;
  /** @type {string} */
  var copyright;

  source = 'src/are.js';
  dest = 'src/are.min.js';
  copyright = (
    '/* are.js v0.0.1 (https://github.com/imaginate/are)\n' +
    ' * Copyright (c) 2015 Adam A Smith <adam@imaginate.life>\n' +
    ' * The Apache License (github.com/imaginate/are/blob/master/LICENSE.md) */'
  );

  copy(source, dest);
  minify(dest, copyright);

  log.pass('Completed `minify.are` Task');
};

/** @type {function} */
methods.nodeAre = function() {

  /** @type {string} */
  var source;
  /** @type {string} */
  var dest;
  /** @type {string} */
  var copyright;

  source = 'src/node-are.js';
  dest = 'src/node-are.min.js';
  copyright = (
    '/* node-are.js v0.0.1 (https://github.com/imaginate/are)\n' +
    ' * Copyright (c) 2015 Adam A Smith <adam@imaginate.life>\n' +
    ' * The Apache License (github.com/imaginate/are/blob/master/LICENSE.md) */'
  );

  copy(source, dest);
  minify(dest, copyright);

  log.pass('Completed `minify.nodeAre` Task');
};


////////////////////////////////////////////////////////////////////////////////
// EXPORT THE TASK
////////////////////////////////////////////////////////////////////////////////

/** @type {!Task} */
module.exports = makeTask('minify', 'are-nodeAre', methods);
