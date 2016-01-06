/**
 * -----------------------------------------------------------------------------
 * IS METHODS
 * -----------------------------------------------------------------------------
 * @version 0.1.3
 * @see [is]{@link https://github.com/imaginate/are/blob/master/parts/is-methods.js}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2015 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */


// *****************************************************************************
// SECTION: IS METHODS
// *****************************************************************************


//////////////////////////////////////////////////////////////////////////////
// IS METHODS - PRIMITIVES
//////////////////////////////////////////////////////////////////////////

/**
 * @param {*} val
 * @return {boolean}
 */
is.nil = function(val) {
  return val === null;
};
try {
  is.null = is.nil;
}
catch (e) {
  logSupportMsg('is', 'null', 'nil');
}

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
is.bool = function(val) {
  return typeof val === 'boolean';
};
try {
  is.boolean = is.bool;
}
catch (e) {
  logSupportMsg('is', 'boolean', 'bool');
}

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
  return (zero !== false || !!val) && typeof val === 'number' && val === val;
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

/**
 * @param {*} val
 * @return {boolean}
 */
is.nan = function(val) {
  return val !== val;
};


//////////////////////////////////////////////////////////////////////////////
// IS METHODS - JS OBJECTS
//////////////////////////////////////////////////////////////////////////

/**
 * @param {*} val
 * @param {boolean=} funcs - the return value for functions [default= false]
 * @return {boolean}
 */
is.object = function(val, funcs) {
  val = !!val && typeof val;
  return val && ( val === 'object' || (funcs === true && val === 'function') );
};
is.obj = is.object;

/**
 * Functions return true in this method.
 * @param {*} val
 * @return {boolean}
 */
is._object = function(val) {
  return is.obj(val, true);
};
is._obj = is._object;

/**
 * @param {*} val
 * @return {boolean}
 */
is.func = function(val) {
  return !!val && typeof val === 'function';
};
is.fn = is.func;
try {
  is.function = is.func;
}
catch(e) {
  logSupportMsg('is', 'function', 'func');
}

/**
 * @param {*} val
 * @param {boolean=} args - the return value for arguments [default= false]
 * @return {boolean}
 */
is.array = function(val, args) {
  val = is.obj(val) && toStr.call(val);
  return val && (
    val === '[object Array]' || (
      args === true && (val === '[object Arguments]' || 'callee' in val)
    )
  );
};
is.arr = function(val, args) {
  val = is.obj(val) && toStr.call(val);
  return val && (
    val === '[object Array]' || (args === true && val === '[object Arguments]')
  );
};
try {
  is.array({}, true);
  is.arr = is.array;
}
catch (e) {
  is.array = is.arr;
}

/**
 * Arguments return true in this method.
 * @param {*} val
 * @return {boolean}
 */
is._array = function(val) {
  return is.arr(val, true);
};
is._arr = is._array;

/**
 * @param {*} val
 * @return {boolean}
 */
is.regexp = function(val) {
  return is.obj(val) && toStr.call(val) === '[object RegExp]';
};
is.regex = is.regexp;

/**
 * @param {*} val
 * @return {boolean}
 */
is.args = function(val) {
  return is.obj(val) && (
    toStr.call(val) === '[object Arguments]' || 'callee' in val
  );
};
is._args = function(val) {
  return is.obj(val) && toStr.call(val) === '[object Arguments]';
};
try {
  is.args({});
}
catch (e) {
  is.args = is._args;
}
try {
  is.arguments = is.args;
}
catch (e) {
  logSupportMsg('is', 'arguments', 'args');
}


//////////////////////////////////////////////////////////////////////////////
// IS METHODS - DOM OBJECTS
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


//////////////////////////////////////////////////////////////////////////////
// IS METHODS - OTHERS
//////////////////////////////////////////////////////////////////////////

/**
 * Checks if a value is considered empty. For a list of empty values see below.
 *   empty values: 0, "", {}, [], null, undefined, false, NaN, function(){...}
 *   note: for functions this method checks whether it has any defined params:
 *     function(){} => true | function(param){} => false
 * @param {*} val
 * @return {boolean}
 */
is.empty = function(val) {

    /** @type {string} */
    var prop;

    // return: 0, "", null, undefined, false, NaN => true
    if ( !is._obj(val) ) {
      return !val;
    }

    // return: [], function(){} => true
    if ( is.arr(val) || is.func(val) ) {
      return !val.length;
    }

    // return: {} => true
    for (prop in val) {
      if ( has(val, prop) ) {
        return false;
      }
    }
    return true;
};


//////////////////////////////////////////////////////////////////////////////
// IS METHODS - NUMBER STATES
//////////////////////////////////////////////////////////////////////////

/**
 * @param {number} val
 * @return {boolean}
 */
is.whole = function(val) {
  if ( !is.num(val) ) throw new TypeError(is.whole.errorMsg.notNum);
  return !(val % 1);
};
/** @type {!Object<string, string>} */
is.whole.errorMsg = {
  notNum: notNumErrorMsg('whole')
};

/**
 * @param {number} val
 * @return {boolean}
 */
is._whole = function(val) {
  return !(val % 1);
};

/**
 * @param {number} val
 * @return {boolean}
 */
is.odd = function(val) {
  if ( !is.num(val) ) throw new TypeError(is.odd.errorMsg.notNum);
  if ( !is._whole(val) ) throw new RangeError(is.odd.errorMsg.whole);
  return !!(val % 2);
};
/** @type {!Object<string, string>} */
is.odd.errorMsg = {
  notNum: notNumErrorMsg('odd'),
  whole:  notWholeErrorMsg('odd')
};

/**
 * @param {number} val
 * @return {boolean}
 */
is._odd = function(val) {
  return !!(val % 2);
};


////////////////////////////////////////////////////////////////////////////
// IS HELPERS
////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} method
 * @return {string}
 */
function notNumErrorMsg(method) {
  return 'The val for is.' + method + ' calls must be a number.';
}

/**
 * @private
 * @param {string} method
 * @return {string}
 */
function notWholeErrorMsg(method) {
  return 'The val for is.' + method + ' calls must be a whole number.';
}
