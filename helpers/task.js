/**
 * -----------------------------------------------------------------------------
 * TASK LIBRARY
 * -----------------------------------------------------------------------------
 * @file A helper library for makefile tasks.
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2015 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';

require('./vitals'); // appends helper methods and objects to global obj


////////////////////////////////////////////////////////////////////////////////
// DEFINE TASK CONSTRUCTOR
////////////////////////////////////////////////////////////////////////////////

/**
 * @param {string} name
 * @param {(string|!Array<string>)} defaultArgs
 * @param {!Object<string, function>} methods
 * @return {!Object}
 */
function makeTask(name, defaultArgs, methods) {

  defaultArgs = is.str(defaultArgs) ? defaultArgs.split('-') : defaultArgs;

  ( is.str(name) && is.arr(defaultArgs) && is.obj(methods) ) || log.error(
    'Invalid `makeTask` Call',
    'invalid type for `name`, `defaultArgs`, or `methods` param',
    { argMap: true, name: name, defaultArgs: defaultArgs, methods: methods }
  );

  /**
   * @param {string} arg
   */
  var run = function(arg) {
    has(methods, arg) || log.error(
      'Invalid `Task.run` Call',
      'invalid argument name (i.e. prop did not exist in the task\'s methods)',
      { argMap: true, task: name, invalidArg: arg }
    );
    methods[arg]();
  };

  return {
    run: run,
    name: name,
    methods: methods,
    defaultArgs: defaultArgs
  };
}


////////////////////////////////////////////////////////////////////////////////
// EXPORT TASK CONSTRUCTOR
////////////////////////////////////////////////////////////////////////////////

module.exports = makeTask;
