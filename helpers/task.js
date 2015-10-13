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
 * @param {(string|!Array<string>)} defaultMethods
 * @param {!Object<string, function>} methods
 * @return {!Object}
 */
function makeTask(name, defaultMethods, methods) {

  defaultMethods = is.str(defaultMethods) ?
    defaultMethods.split('-') : defaultMethods;

  ( is.str(name) && is.arr(defaultMethods) && is.obj(methods) ) || log.error(
    'Invalid `makeTask` Call',
    'invalid type for `name`, `defaultMethods`, or `methods` param',
    { argMap: true, name: name, defaultMethods:defaultMethods, methods:methods }
  );

  /**
   * @param {string} method
   */
  var run = function(method) {
    
    /** @type {(string|boolean)} */
    var val;

    val = /=/.test(method) && method.split('=');
    method = val ? val[0] : method;
    val = val && val[1];

    has(methods, method) || log.error(
      'Invalid `Task.run` Call',
      'invalid method (i.e. method did not exist in the task\'s methods)',
      { argMap: true, task: name, invalidMethod: method }
    );
    methods[method](val);
  };

  return {
    run: run,
    name: name,
    methods: methods,
    defaultMethods: defaultMethods
  };
}


////////////////////////////////////////////////////////////////////////////////
// EXPORT TASK CONSTRUCTOR
////////////////////////////////////////////////////////////////////////////////

module.exports = makeTask;
