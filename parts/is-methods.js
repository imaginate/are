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


// *****************************************************************************
// SECTION: IS METHODS
// *****************************************************************************

/** @type {!Object<string, function} */
var is = {};


//////////////////////////////////////////////////////////////////////////////
// IS METHODS - PRIMITIVES
//////////////////////////////////////////////////////////////////////////

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
 * @param {boolean=} empty - the return value for empty strings [default= true]
 * @return {boolean}
 */
is.string = function(val, empty) {
  return (empty !== false || !!val) && typeof val === 'string';
};
is.str = is.string;

/**
 * Empty strings return false in this method.
 * @param {*} val
 * @return {boolean}
 */
is._string = function(val) {
  return is.string(val, false);
};
is._str = is._string;

/**
 * @param {*} val
 * @param {boolean=} zero - the return value for 0 [default= true]
 * @return {boolean}
 */
is.number = function(val, zero) {
  return (zero !== false || !!val) && typeof val === 'number';
};
is.num = is.number;

/**
 * Zeros return false in this method.
 * @param {*} val
 * @return {boolean}
 */
is._number = function(val) {
  return is.number(val, false);
};
is._num = is._number;


//////////////////////////////////////////////////////////////////////////////
// DEFINE PUBLIC IS METHODS - JS OBJECTS
//////////////////////////////////////////////////////////////////////////

/**
 * @param {*} val
 * @param {boolean=} funcs - the return value for functions [default= false]
 * @return {boolean}
 */
is.object = function(val, funcs) {
  return !!val && (typeof val === 'object' || (
    funcs === true && typeof val === 'function'
  ));
};
is.obj = is.object;

/**
 * Functions return true in this method.
 * @param {*} val
 * @return {boolean}
 */
is._object = function(val) {
  return is.object(val, true);
};
is._obj = is._object;

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
  return is.obj(val) && _toStr.call(val) === '[object Array]';
};
is.arr = is.array;

/**
 * @param {*} val
 * @return {boolean}
 */
is.regexp = function(val) {
  return is.obj(val) && _toStr.call(val) === '[object RegExp]';
};
is.regex = is.regexp;


//////////////////////////////////////////////////////////////////////////////
// DEFINE PUBLIC IS METHODS - DOM OBJECTS
//////////////////////////////////////////////////////////////////////////

/**
 * @param {*} val
 * @return {boolean}
 */
is.document = function(val) {
  return is.obj(val) && val.nodeType === 9;
};
is.doc = is.document;

/**
 * @param {*} val
 * @return {boolean}
 */
is.element = function(val) {
  return is.obj(val) && val.nodeType === 1;
};
is.elem = is.element;
