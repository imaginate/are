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

require('../node_helpers/vitals')(); // appends helpers to global obj

/** @type {function} */
var makeTask = require('../node_helpers/task');


////////////////////////////////////////////////////////////////////////////////
// DEFINE THE TASK METHODS
////////////////////////////////////////////////////////////////////////////////

/** @type {!Object<string, function>} */
var methods = {};

/** @type {function} */
methods.js = function() {

  /** @type {string} */
  var source;
  /** @type {string} */
  var dest;
  /** @type {string} */
  var compiler;
  /** @type {string} */
  var copyright;
  /** @type {string} */
  var cmd;

  source = 'src/are.js';
  dest = 'src/are.min.js';
  compiler = 'vendor/closure-compiler.jar';
  copyright = (
    '/* are.js v0.0.1 (https://github.com/imaginate/are)\n' +
    ' * Copyright (c) 2015 Adam A Smith <adam@imaginate.life>\n' +
    ' * The Apache License (github.com/imaginate/are/blob/master/LICENSE.md) */'
  );

  is.file(compiler) || log.error(
    'Failed `minify` Task',
    'missing compiler: `' + compiler + '`'
  );

  copy(source, dest);
  cmd = 'java -jar ' + compiler + ' --js ' + dest + ' -W QUIET';
  exec(cmd, { silent: true }).output
    .replace(/\r\n?/g, '\n')
    .replace(/^(.)/, copyright + '\n$1')
    .to(dest);

  log.pass('Completed `minify.js` Task');
};


////////////////////////////////////////////////////////////////////////////////
// EXPORT THE TASK
////////////////////////////////////////////////////////////////////////////////

/** @type {!Task} */
module.exports = makeTask('minify', 'js', methods);
