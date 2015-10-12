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

require('./vitals')(); // appends helper methods and objects to global obj


////////////////////////////////////////////////////////////////////////////////
// DEFINE TASK CONSTRUCTOR
////////////////////////////////////////////////////////////////////////////////

/**
 * @param {string} name
 * @param {(string|!Array<string>)} defaultOpts
 * @param {!Object<string, function>} methods
 * @return {!Object}
 */
function makeTask(name, defaultOpts, methods) {

  defaultOpts = is.str(defaultOpts) ? defaultOpts.split('-') : defaultOpts;

  ( is.str(name) && is.arr(defaultOpts) && is.obj(methods) ) || log.error(
    'Invalid `makeTask` Call',
    'invalid type for `name`, `defaultOpts`, or `methods` param',
    { argMap: true, name: name, defaultOpts: defaultOpts, methods: methods }
  );

  /**
   * @param {string} opt
   */
  var run = function(opt) {
    has(methods, opt) || log.error(
      'Invalid `Task.run` Call',
      'invalid argument name (i.e. prop did not exist in the task\'s methods)',
      { argMap: true, task: name, invalidArg: opt }
    );
    methods[opt]();
  };

  return {
    run: run,
    name: name,
    methods: methods,
    defaultOpts: defaultOpts
  };
}


////////////////////////////////////////////////////////////////////////////////
// EXPORT TASK CONSTRUCTOR
////////////////////////////////////////////////////////////////////////////////

module.exports = makeTask;
