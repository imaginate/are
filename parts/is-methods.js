/**
 * -----------------------------------------------------------------------------
 * IS METHODS
 * -----------------------------------------------------------------------------
 * @version 0.0.1
 * @see [is]{@link https://github.com/imaginate/are/blob/master/parts/is-methods.js}
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2015 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */


////////////////////////////////////////////////////////////////////////////////
// DEFINE PUBLIC METHODS - PRIMITIVES
////////////////////////////////////////////////////////////////////////////////

/**
 * @param {*} val
 * @return {boolean}
 */
is.null = function(val) {
  return val === null;
};

/**
 * @param {*} val
 * @return {boolean}
 */
is.undefined = function(val) {
  return typeof val === 'undefined';
};

/**
 * @param {*} val
 * @return {boolean}
 */
is.boolean = function(val) {
  return typeof val === 'boolean';
};
is.bool = is.boolean;

/**
 * @param {*} val
 * @param {boolean=} empty - the return value for empty strings [default= false]
 * @return {boolean}
 */
is.string = function(val, empty) {
  return (empty === true || !!val) && typeof val === 'string';
};
is.str = is.string;

/**
 * @param {*} val
 * @param {boolean=} zero - the return value for 0 [default= false]
 * @return {boolean}
 */
is.number = function(val, zero) {
  return (zero === true || !!val) && typeof val === 'number';
};
is.num = is.number;


////////////////////////////////////////////////////////////////////////////////
// DEFINE PUBLIC METHODS - JS OBJECTS
////////////////////////////////////////////////////////////////////////////////

/**
 * @param {*} val
 * @return {boolean}
 */
is.object = function(val) {
  return !!val && typeof val === 'object';
};
is.obj = is.object;

/**
 * @param {*} val
 * @return {boolean}
 */
is.func = function(val) {
  return !!val && typeof val === 'function';
};
try {
  is.function = is.func;
}
catch(e) {
  console.log(
    'Your JS engine does not support is.function(). Use is.func() instead.'
  );
}

/**
 * @param {*} val
 * @return {boolean}
 */
is.array = function(val) {
  return is.obj(val) && toStr.call(val) === '[object Array]';
};
is.arr = is.array;

/**
 * @param {*} val
 * @return {boolean}
 */
is.regexp = function(val) {
  return is.obj(val) && toStr.call(val) === '[object RegExp]';
};
is.regex = is.regexp;


////////////////////////////////////////////////////////////////////////////////
// DEFINE PUBLIC METHODS - DOM OBJECTS
////////////////////////////////////////////////////////////////////////////////

/**
 * @param {*} val
 * @return {boolean}
 */
is.document = function(val) {
  return is.obj(val) && obj.nodeType === 9;
};
is.doc = is.document;

/**
 * @param {*} val
 * @return {boolean}
 */
is.element = function(val) {
  return is.obj(val) && obj.nodeType === 1;
};
is.elem = is.element;
