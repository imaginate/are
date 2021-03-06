/**
 * -----------------------------------------------------------------------------
 * TASK LIBRARY
 * -----------------------------------------------------------------------------
 * @file A helper library for makefile tasks.
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2015 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [Lodash]{@link https://github.com/lodash/lodash}
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';


////////////////////////////////////////////////////////////////////////////////
// EXPORT TASK FACTORY
////////////////////////////////////////////////////////////////////////////////

/**
 * @param {string=} name
 * @param {(string|!Array<string>)=} defaultMethods
 * @param {!Object<string, function>} methods
 * @return {!Task}
 */
module.exports = function newTask(name, defaultMethods, methods) {
  return new Task(name, defaultMethods, methods);
};


////////////////////////////////////////////////////////////////////////////////
// DEFINE TASK CONSTRUCTOR
////////////////////////////////////////////////////////////////////////////////

/**
 * @param {string=} name
 * @param {(string|!Array<string>)=} defaultMethods
 * @param {!Object<string, function>} methods
 * @constructor
 */
function Task(name, defaultMethods, methods) {

  if (arguments.length === 2) {
    methods = defaultMethods;
    defaultMethods = name;
    name = '';
  }
  else if (arguments.length === 1) {
    methods = name;
    defaultMethods = [];
    name = '';
  }

  isFuncMap(methods) || log.error(
    'Invalid `newTask` Call',
    'invalid `methods` param (must be an object with "name => function" props)',
    { argMap: true, name: name, defaultMethods: defaultMethods,
      methods: methods }
  );

  is.empty(methods) && log.error(
    'Invalid `newTask` Call',
    'empty `methods` param (must have at least one method defined)',
    { argMap: true, name: name, defaultMethods: defaultMethods,
      methods: methods }
  );

  defaultMethods = is.str(defaultMethods) ?
    defaultMethods.split('-') : defaultMethods;

  isStrArr(defaultMethods) || log.error(
    'Invalid `newTask` Call',
    'invalid type for `defaultMethods` param',
    { argMap: true, name: name, defaultMethods: defaultMethods,
      methods: methods }
  );

  name = is.str(name) ? name : '';

  this.name = name;
  this.defaultMethods = defaultMethods;
  this.methods = methods;
}

Task.prototype.constructor = Task;


////////////////////////////////////////////////////////////////////////////////
// DEFINE PUBLIC METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * @param {string} method
 * @param {string=} val
 */
Task.prototype.run = function run(method, val) {

  /** @type {string} */
  var name;

  name = this.name;
  has(this.methods, method) || log.error(
    'Invalid `make` Command',
    'invalid task method (i.e. method did not exist in the task\'s methods)',
    { argMap: true, task: name, invalidMethod: method }
  );

  this.methods[method](val);
};


////////////////////////////////////////////////////////////////////////////////
// DEFINE PRIVATE HELPERS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
function isStrArr(arr) {

  /** @type {number} */
  var i;

  if ( !is.arr(arr) ) {
    return false;
  }

  i = arr.length;
  while (i--) {
    if ( !is.str( arr[i] ) ) {
      return false;
    }
  }
  return true;
}

/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
function isFuncMap(obj) {

  /** @type {string} */
  var prop;

  if ( !is.obj(obj) ) {
    return false;
  }

  for (prop in obj) {
    if( has(obj, prop) && !is.func( obj[prop] ) ) {
      return false;
    }
  }
  return true;
}
