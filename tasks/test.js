/**
 * -----------------------------------------------------------------------------
 * MAKE TASK: test
 * -----------------------------------------------------------------------------
 * @file Use `$ node make test` to access this file.
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2015 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';


////////////////////////////////////////////////////////////////////////////////
// DEFINE & EXPORT THE TASK
////////////////////////////////////////////////////////////////////////////////

/** @type {!Task} */
module.exports = newTask('test', 'are-nodeAre', {

  /**
   * @param {string=} options
   */
  are: function are(options) {

    /** @type {string} */
    var source;
    /** @type {string} */
    var tests;

    tests = './tests/*.js';
    options = getOptions(options);
    options += ' --require ';

    configLog();

    source = './src/are.js';
    logStart(source);
    runTests(options + source, tests);
    logFinish(source);

    source = './src/are.min.js';
    logStart(source);
    runTests(options + source, tests);
    logFinish(source);

    resetLog();
  },

  /**
   * @param {string=} options
   */
  nodeAre: function nodeAre(options) {

    /** @type {string} */
    var source;
    /** @type {string} */
    var tests;

    options = getOptions(options);

    configLog();

    tests = './tests/node-methods/*.js';
    source = './src/node-are.js';
    logStart(source);
    runTests(options, tests);
    logFinish(source);

    tests = './tests/node-methods/min/*.js';
    source = './src/node-are.min.js';
    logStart(source);
    runTests(options, tests);
    logFinish(source);

    resetLog();
  }
});


////////////////////////////////////////////////////////////////////////////////
// DEFINE PRIVATE HELPERS
////////////////////////////////////////////////////////////////////////////////

/**
 * @param {string=} options
 * @return {string}
 */
function getOptions(options) {

  /** @type {!Object} */
  var defaults;
  /** @type {string} */
  var result;

  options = is.str(options) ? options.split('+') : [];

  defaults = {
    reporter: 'dot',
    slow: 5,
    timeout: 1000
  };
  result = '--colors ';

  each(options, function(/** string */ option) {
    if ( /=/.test(option) ) {
      defaults[option] = option.split('=', 1)[1];
    }
    else {
      result += '--' + option + ' ';
    }
  });

  each(defaults, function(/** * */ val, /** string */ option) {
    result += '--' + option + ' ' + val + ' ';
  });

  return result + '--globals is,are';
}

/**
 * @param {string} options
 * @param {string} tests
 */
function runTests(options, tests) {
  exec('node ./node_modules/mocha/bin/mocha ' + options + ' ' + tests);
}

/**
 * @param {string} source
 */
function logStart(source) {
  log.debug('Testing `' + source + '`');
}

/**
 * @param {string} source
 */
function logFinish(source) {
  log.pass('Finished testing `' + source + '`');
}

/** @type {function} */
function configLog() {
  log.setConfig('pass.spaceAfter', 3);
  log.setConfig('debug.spaceBefore', 0);
  log.setConfig('debug.spaceAfter', 0);
}

/** @type {function} */
function resetLog() {
  log.resetConfig();
}
