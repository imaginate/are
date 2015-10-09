/**
 * -----------------------------------------------------------------------------
 * MAKE TASK: test
 * -----------------------------------------------------------------------------
 * @file Use `$ node make test` to access this file.
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
// DEFINE PRIVATE HELPERS
////////////////////////////////////////////////////////////////////////////////

/** @type {string} */
var mocha = (
  'node ./node_modules/mocha/bin/mocha ' +
  '--colors '         +
  '--reporter dot '   +
  '--slow 5 '         +
  '--timeout 1000 '   +
  '--globals is,are ' +
  '--require '
);

/** @type {function} */
function configLog() {
  log.setConfig('pass.spaceAfter', 3);
  log.setConfig('debug.spaceBefore', 0);
  log.setConfig('debug.spaceAfter', 0);
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
  var tests;

  tests = './tests/*.js';

  configLog();
  log.debug('Starting `test.are` Task');

  source = './src/are.js';
  exec(mocha + source + ' ' + tests);

  source = './src/are.min.js';
  exec(mocha + source + ' ' + tests);

  log.pass('Completed `test.are` Task');
  log.resetConfig();
};

/** @type {function} */
methods.nodeAre = function() {

  /** @type {string} */
  var source;
  /** @type {string} */
  var tests;

  tests = './tests/*.js';

  configLog();
  log.debug('Starting `test.nodeAre` Task');

  source = './src/node-are.js';
  exec(mocha + source + ' ' + tests);

  source = './src/node-are.min.js';
  exec(mocha + source + ' ' + tests);

  log.pass('Completed `test.nodeAre` Task');
  log.resetConfig();
};


////////////////////////////////////////////////////////////////////////////////
// EXPORT THE TASK
////////////////////////////////////////////////////////////////////////////////

/** @type {!Task} */
module.exports = makeTask('minify', 'are-nodeAre', methods);
