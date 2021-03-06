/**
 * -----------------------------------------------------------------------------
 * NODE-ARE JS LIBRARIES
 * -----------------------------------------------------------------------------
 * @version 0.3.2
 * @see [are]{@link https://github.com/imaginate/are}
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2015 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

;(function(/** !{ is: function, are: function } */ _are) {

  _applyAre(setupAre);
  module.exports = setupAre;

  /**
   * @public
   * @type {function}
   */
  function setupAre() {
    _applyAre(global);
  }

  /**
   * @private
   * @param {(!Object|function)} obj
   */
  function _applyAre(obj) {
    obj.is = _are.is;
    obj.Is = _are.Is;
    obj.are = _are.are;
    obj.Are = _are.Are;
  }

})((function setupAre(undefined) {

  /** @type {boolean} */
  var _log = true;
  /** @type {function} */
  var toStr = Object.prototype.toString;
  /** @type {function} */
  var sliceArr = Array.prototype.slice;
  /** @type {function} */
  var has = (function(hasOwn) {
    return function has(obj, prop) {
      return hasOwn.call(obj, prop);
    };
  })(Object.prototype.hasOwnProperty);
  /** @type {function} */
  var logSupportMsg = function(lib, avoid, use) {
    console.log(
      'Your JS engine does not support ' + lib + '.' + avoid + '(). ' +
      'Use ' + lib + '.' + use + '() instead.'
    );
  };


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
  if ( !is.obj(val) ) return false;
  val = toStr.call(val);
  return val === '[object Array]' || (
    args === true && val === '[object Arguments]'
  );
};
is.arr = is.array;

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
is.date = function(val) {
  return is.obj(val) && toStr.call(val) === '[object Date]';
};

/**
 * @param {*} val
 * @return {boolean}
 */
is.error = function(val) {
  return is.obj(val) && toStr.call(val) === '[object Error]';
};
is.err = is.error;

/**
 * @param {*} val
 * @return {boolean}
 */
is.args = function(val) {
  return is.obj(val) && toStr.call(val) === '[object Arguments]';
};

(function() {
  // check JS engine for accuracy
  if ( is.args(arguments) ) return;

  /**
   * The fallback is.array method.
   * @param {*} val
   * @param {boolean=} args - the return value for arguments [default= false]
   * @return {boolean}
   */
  is.array = function(val) {
    if ( !is.obj(val) ) return false;
    return toStr.call(val) === '[object Array]' || (
      args === true && 'callee' in val
    );
  };
  is.arr = is.array;

  /**
   * The fallback is.args method.
   * @param {*} val
   * @return {boolean}
   */
  is.args = function(val) {
    return is.obj(val) && 'callee' in val;
  };

  try {
    is.args({});
  }
  catch (e) {
    is.array = function(val) {
      return is.obj(val) && toStr.call(val) === '[object Array]';
    };
    is.arr = is.array;
    is.args = is.obj;
    _log && console.log(
      'Your JS engine does not support checking for Arguments objects. ' +
      'Arguments checks will only check if val is an object.'
    );
  }
})();

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

/**
 * Checks if two values are strictly equal.
 * @param {*} val1
 * @param {*} val2
 * @return {boolean}
 */
is.same = function(val1, val2) {
  return val1 === val2;
};

/**
 * Checks if two values are loosely equal.
 * @param {*} val1
 * @param {*} val2
 * @return {boolean}
 */
is.similar = function(val1, val2) {
  return val1 == val2;
};
is.sim = is.similar;

/**
 * @param {?(Object|function)} obj
 * @return {boolean}
 */
is.frozen = function(obj) {
  if ( is.nil(obj) ) return false;
  if ( !is._obj(obj) ) throw new TypeError(is.frozen.errorMsg.notObj);
  return ObjectIsFrozen(obj);
};
/** @type {!Object<string, string>} */
is.frozen.errorMsg = {
  notObj: 'The val for is/are.frozen calls must be an object, function, or null.'
};

/** @type {function} */
var ObjectIsFrozen = (function() {

  /** @type {function} */
  var isFrozen;

  if (!Object.isFrozen) return function ObjIsFrozen(obj) { return false; };

  isFrozen = Object.isFrozen;

  try {
    isFrozen( function(){} );
  }
  catch (e) {
    return function ObjIsFrozen(obj) {
      return is.func(obj) ? false : isFrozen(obj);
    };
  }

  return isFrozen;
})();


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

/**
 * @param {number} val
 * @return {boolean}
 */
is.even = function(val) {
  if ( !is.num(val) ) throw new TypeError(is.even.errorMsg.notNum);
  if ( !is._whole(val) ) throw new RangeError(is.even.errorMsg.whole);
  return !(val % 2);
};
is.even.errorMsg = {
  notNum: notNumErrorMsg('even'),
  whole:  notWholeErrorMsg('even')
};

/**
 * @param {number} val
 * @return {boolean}
 */
is._even = function(val) {
  return !(val % 2);
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
  return 'The val for is/are.' + method + ' calls must be a number.';
}

/**
 * @private
 * @param {string} method
 * @return {string}
 */
function notWholeErrorMsg(method) {
  return 'The val for is/are.' + method + ' calls must be a whole number.';
}


// *****************************************************************************
// SECTION: ARE METHODS
// *****************************************************************************

// Note for all are methods:
// @param {*...} vals - The values to evaluate. Must have at least two different
//   values to evaluate. The values can be provided in a single array or
//   multiple params.

// The helper, checkAreMethod, is defined at the bottom of this section.


////////////////////////////////////////////////////////////////////////////
// ARE METHODS - PRIMITIVES
////////////////////////////////////////////////////////////////////////

/**
 * @param {*...} vals
 * @return {boolean}
 */
are.nil = function() {
  return checkAreMethod('null', arguments);
};
try {
  are.null = are.nil;
}
catch (e) {
  logSupportMsg('are', 'null', 'nil');
}

/**
 * @param {*...} vals
 * @return {boolean}
 */
are.undefined = function() {
  return checkAreMethod('undefined', arguments);
};

/**
 * @param {*...} vals
 * @return {boolean}
 */
are.bool = function() {
  return checkAreMethod('bool', arguments);
};
try {
  are.boolean = are.bool;
}
catch (e) {
  logSupportMsg('are', 'boolean', 'bool');
}

/**
 * @param {*...} vals
 * @return {boolean}
 */
are.string = function() {
  return checkAreMethod('string', arguments);
};
are.str = are.string;

/**
 * Empty strings return false in this method.
 * @param {*...} vals
 * @return {boolean}
 */
are._string = function() {
  return checkAreMethod('_string', arguments);
};
are._str = are._string;

/**
 * @param {*...} vals
 * @return {boolean}
 */
are.number = function() {
  return checkAreMethod('number', arguments);
};
are.num = are.number;

/**
 * Zeros return false in this method.
 * @param {*...} vals
 * @return {boolean}
 */
are._number = function() {
  return checkAreMethod('_number', arguments);
};
are._num = are._number;

/**
 * @param {*...} vals
 * @return {boolean}
 */
are.nan = function() {
  return checkAreMethod('nan', arguments);
};


////////////////////////////////////////////////////////////////////////////
// ARE METHODS - JS OBJECTS
////////////////////////////////////////////////////////////////////////

/**
 * @param {*...} vals
 * @return {boolean}
 */
are.object = function() {
  return checkAreMethod('object', arguments);
};
are.obj = are.object;

/**
 * Functions return true in this method.
 * @param {*...} vals
 * @return {boolean}
 */
are._object = function() {
  return checkAreMethod('_object', arguments);
};
are._obj = are._object;

/**
 * @param {*...} vals
 * @return {boolean}
 */
are.func = function() {
  return checkAreMethod('func', arguments);
};
are.fn = are.func;
try {
  are.function = are.func;
}
catch(e) {
  logSupportMsg('are', 'function', 'func');
}

/**
 * @param {*...} vals
 * @return {boolean}
 */
are.array = function() {
  return checkAreMethod('array', arguments);
};
are.arr = are.array;

/**
 * Arguments return true in this method.
 * @param {*...} vals
 * @return {boolean}
 */
are._array = function() {
  return checkAreMethod('_array', arguments);
};
are._arr = are._array;

/**
 * @param {*...} vals
 * @return {boolean}
 */
are.regexp = function() {
  return checkAreMethod('regexp', arguments);
};
are.regex = are.regexp;

/**
 * @param {*...} vals
 * @return {boolean}
 */
are.date = function() {
  return checkAreMethod('date', arguments);
};

/**
 * @param {*...} vals
 * @return {boolean}
 */
are.error = function() {
  return checkAreMethod('error', arguments);
};
are.err = are.error;

/**
 * @param {*...} vals
 * @return {boolean}
 */
are.args = function() {
  return checkAreMethod('args', arguments);
};
try {
  are.arguments = are.args;
}
catch (e) {
  logSupportMsg('are', 'arguments', 'args');
}


////////////////////////////////////////////////////////////////////////////
// ARE METHODS - DOM OBJECTS
////////////////////////////////////////////////////////////////////////

/**
 * @param {*...} vals
 * @return {boolean}
 */
are.document = function() {
  return checkAreMethod('document', arguments);
};
are.doc = are.document;

/**
 * @param {*...} vals
 * @return {boolean}
 */
are.element = function() {
  return checkAreMethod('element', arguments);
};
are.elem = are.element;


//////////////////////////////////////////////////////////////////////////////
// ARE METHODS - OTHERS
//////////////////////////////////////////////////////////////////////////

/**
 * Checks if each value is considered empty. See below for all empty values.
 *   empty values: 0, "", {}, [], null, undefined, false, NaN, function(){...}
 *   note: for functions this method checks whether it has any defined params:
 *     function(){} => true | function(param){} => false
 * @param {*...} vals
 * @return {boolean}
 */
are.empty = function() {
  return checkAreMethod('empty', arguments);
};

/**
 * @param {?(Object|function)...} vals
 * @return {boolean}
 */
are.frozen = function() {
  return checkAreMethod('frozen', arguments);
};


//////////////////////////////////////////////////////////////////////////////
// ARE METHODS - NUMBER STATES
//////////////////////////////////////////////////////////////////////////

/**
 * @param {number...} vals
 * @return {boolean}
 */
are.whole = function() {
  return checkAreMethod('whole', arguments);
};

/**
 * @param {number...} vals
 * @return {boolean}
 */
are._whole = function() {
  return checkAreMethod('_whole', arguments);
};

/**
 * @param {number...} vals
 * @return {boolean}
 */
are.odd = function() {
  return checkAreMethod('odd', arguments);
};

/**
 * @param {number...} vals
 * @return {boolean}
 */
are._odd = function() {
  return checkAreMethod('_odd', arguments);
};

/**
 * @param {number...} vals
 * @return {boolean}
 */
are.even = function() {
  return checkAreMethod('even', arguments);
};

/**
 * @param {number...} vals
 * @return {boolean}
 */
are._even = function() {
  return checkAreMethod('_even', arguments);
};


////////////////////////////////////////////////////////////////////////////
// ARE HELPERS
////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} method
 * @param {!Arguments} args
 * @return {boolean}
 */
function checkAreMethod(method, args) {

  /** @type {function} */
  var check;
  /** @type {number} */
  var i;

  args = args.length > 1 ? args : args[0];
  if ( !is._arr(args) ) {
    throw new Error(
      'An are.' + method + '(vals) call did not receive multiple vals to ' +
      'evaluate'
    );
    args = [ args ];
  }

  check = is[method];
  i = args.length;
  while (i--) {
    if ( !check( args[i] ) ) {
      return false;
    }
  }
  return true;
}


// *****************************************************************************
// SECTION: NODE.JS ONLY IS & ARE METHODS
// *****************************************************************************


/** @type {!Object} */
var fs = require('fs');


////////////////////////////////////////////////////////////////////////////////
// IS METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * @param {*} val
 * @return {boolean}
 */
is.buffer = function(val) {
  return Buffer.isBuffer(val);
};
is.buff = is.buffer;

/**
 * @param {string} dirpath
 * @return {boolean}
 */
is.directory = function(dirpath) {

  /** @type {boolean} */
  var result;

  if ( !is._string(dirpath) ) {
    return false;
  }

  try {
    result = fs.statSync(dirpath).isDirectory();
  }
  catch (e) {
    result = false;
  }
  finally {
    return result;
  }
};
is.dir = is.directory;

/**
 * @param {!Array<string>} dirpaths
 * @param {string=} rootdir [default= '']
 * @return {boolean}
 */
is.directories = function(dirpaths, rootdir) {

  /** @type {function} */
  var check;
  /** @type {number} */
  var i;

  if ( !is.array(dirpaths) ) {
    return false;
  }

  rootdir = is._string(rootdir) ? rootdir.replace(/([^\/]$)/, '$1/') : '';
  check = is.directory;
  i = dirpaths.length;
  while (i--) {
    if ( !check( dirpaths[i] ) ) {
      return false;
    }
  }
  return true;
};
is.directorys = is.directories;
is.dirs = is.directories;

/**
 * @param {string} filepath
 * @return {boolean}
 */
is.file = function(filepath) {

  /** @type {boolean} */
  var result;

  if ( !is._string(filepath) ) {
    return false;
  }

  try {
    result = fs.statSync(filepath).isFile();
  }
  catch (e) {
    result = false;
  }
  finally {
    return result;
  }
};

/**
 * @param {!Array<string>} filepaths
 * @param {string=} rootdir [default= '']
 * @return {boolean}
 */
is.files = function(filepaths, rootdir) {

  /** @type {function} */
  var check;
  /** @type {number} */
  var i;

  if ( !is.array(filepaths) ) {
    return false;
  }

  rootdir = is._string(rootdir) ? rootdir.replace(/([^\/]$)/, '$1/') : '';
  check = is.file;
  i = filepaths.length;
  while (i--) {
    if ( !check( filepaths[i] ) ) {
      return false;
    }
  }
  return true;
};


////////////////////////////////////////////////////////////////////////////////
// ARE METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * @param {*...} vals
 * @return {boolean}
 */
are.buffer = function() {
  return checkAreMethod('buffer', arguments);
};
are.buff = are.buffer;

/**
 * @param {*...} vals
 * @return {boolean}
 */
are.directory = function() {
  return checkAreMethod('directory', arguments);
};
are.dir = are.directory;

/**
 * @param {*...} vals
 * @return {boolean}
 */
are.file = function() {
  return checkAreMethod('file', arguments);
};


// *****************************************************************************
// SECTION: IS & ARE MAIN FUNCTION HELPERS
// *****************************************************************************


//////////////////////////////////////////////////////////////////////////////
// FACTORY METHODS
//////////////////////////////////////////////////////////////////////////

/**
 * Assigns types to the allTypes hash map with a check method that evaluates
 *   nullable properties and invokes their type section's method.
 * @private
 * @param {string} section - The category for the types.
 * @param {!Object<string, function(*): boolean>} types - Each type's
 *   "key => value" pair should be expressed as "typeName => checkMethod".
 * @param {boolean=} nullableDefault - The type's default nullable value.
 *   Defaults to true if not set.
 */
function makeTypes(section, types, nullableDefault) {

  /** @type {string} */
  var type;

  for (type in types) {
    if( has(types, type) ) {
      makeType(section, type, types[type], nullableDefault);
    }
  }
}

/**
 * Assigns the type to the allTypes hash map with a check method that evaluates
 *   nullable properties and invokes its type section's method.
 * @private
 * @param {string} section - The type's category.
 * @param {string} type - The type's name.
 * @param {function(*): boolean} check - The type's check method.
 * @param {boolean=} nullableDefault - The type's default nullable value.
 *   Defaults to true if not set.
 */
function makeType(section, type, check, nullableDefault) {
  check = has(makeType, section) ? makeType[section](check) : check;
  nullableDefault = nullableDefault !== false;
  allTypes['_' + type] = function(val, nullable) {
    nullable = is.bool(nullable) ? nullable : nullableDefault;
    return is.nil(val) ? nullable : check(val);
  };
}

/**
 * The constructor for array type check methods.
 * @private
 * @param {function(*): boolean} eachCheck - The check method for each of the
 *   array's values.
 * @return {function(*): boolean} The array type's check method.
 */
makeType.arrays = function(eachCheck) {

  /** @type {function(*): boolean} */
  return function check(arr) {

    /** @type {number} */
    var i;

    if ( !is.arr(arr) ) return false;

    i = arr.length;
    while (i--) {
      if ( !eachCheck(arr[i]) ) return false;
    }
    return true;
  };
};

/**
 * The constructor for hash map type check methods.
 * @private
 * @param {function(*): boolean} eachCheck - The check method for each of the
 *   hash map's properties.
 * @return {function(*): boolean} The hash map type's check method.
 */
makeType.maps = function(eachCheck) {

  /** @type {function(*): boolean} */
  return function check(obj) {

    /** @type {string} */
    var prop;

    if ( !is.obj(obj) ) return false;

    for (prop in obj) {
      if( has(obj, prop) && !eachCheck( obj[prop] ) ) return false;
    }
    return true;
  };
};


//////////////////////////////////////////////////////////////////////////////
// HASH MAPS
//////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @type {!Object<string, function(*, (undefined|boolean)): boolean>}
 */
var allTypes = {};

makeTypes('primitives', {
  'undefined': is.undefined,
  'boolean':   is.bool,
  'string':    is.str,
  'number':    is.num,
  'nan':       is.nan
}, false);
makeType('primitives', 'null', is.nil);

makeTypes('js_objects', {
  'object': is.obj,
  'regexp': is.regex,
  'array':  is.arr,
  'date':   is.date,
  'error':  is.err
});
makeType('js_objects', 'arguments', is.args);
makeType('js_objects', 'function', is.func, false);

makeTypes('dom_objects', {
  'element':  is.elem,
  'document': is.doc
});

makeTypes('others', {
  'empty': is.empty,
  'whole': is.whole,
  'odd':   is.odd,
  'even':  is.even
});

makeTypes('arrays', {
  'nulls':     is.nil,
  'booleans':  is.bool,
  'strings':   is.str,
  'numbers':   is.num,
  'nans':      is.nan,
  'objects':   is.obj,
  'functions': is.func,
  'regexps':   is.regex,
  'arrays':    is.arr,
  'dates':     is.date,
  'errors':    is.err,
  'elements':  is.elem,
  'documents': is.doc
});

makeTypes('maps', {
  'nullmap':     is.nil,
  'booleanmap':  is.bool,
  'stringmap':   is.str,
  'numbermap':   is.num,
  'nanmap':      is.nan,
  'objectmap':   is.obj,
  'functionmap': is.func,
  'regexpmap':   is.regex,
  'arraymap':    is.arr,
  'datemap':     is.date,
  'errormap':    is.err,
  'elementmap':  is.elem,
  'documentmap': is.doc
});

/**
 * @private
 * @type {!Object<string, string>}
 */
var typeShortcuts = {

  // primitives
  _nil:  'null',
  _bool: 'boolean',
  _str:  'string',
  _num:  'number',

  // js objects
  _obj:   'object',
  _func:  'function',
  _fn:    'function',
  _regex: 'regexp',
  _arr:   'array',
  _err:   'error',
  _args:  'arguments',

  // dom objects
  _elem: 'element',
  _doc:  'document',

  // arrays
  _nils:   'nulls',
  _strs:   'strings',
  _nums:   'numbers',
  _bools:  'booleans',
  _objs:   'objects',
  _funcs:  'functions',
  _fns:    'functions',
  _regexs: 'regexps',
  _arrs:   'arrays',
  _errs:   'errors',
  _elems:  'elements',
  _docs:   'documents',

  // maps
  _nilmap:   'nullmap',
  _strmap:   'stringmap',
  _nummap:   'numbermap',
  _boolmap:  'booleanmap',
  _objmap:   'objectmap',
  _funcmap:  'functionmap',
  _fnmap:    'functionmap',
  _regexmap: 'regexpmap',
  _arrmap:   'arraymap',
  _errmap:   'errormap',
  _elemmap:  'elementmap',
  _docmap:   'documentmap'
};

/**
 * @private
 * @type {!Object<string, (!RegExp|function(string): boolean)>}
 */
var specialChars = (function(pipe, exPoint, quesMark, equals, asterisk) {
  return {
    '|': function(str) { return pipe.test(str);     },
    '!': function(str) { return exPoint.test(str);  },
    '?': function(str) { return quesMark.test(str); },
    '=': function(str) { return equals.test(str);   },
    '*': function(str) { return asterisk.test(str); },
    all: /[^a-z\|]/g
  };
})(/\|/, /\!/, /\?/, /\=/, /\*|any/);


//////////////////////////////////////////////////////////////////////////////
// OTHER METHODS
//////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {!Array<string>} types - The types to check for.
 * @param {*} val - The value to evaluate.
 * @param {(undefined|boolean)} nullable - The nullability of the type string.
 * @return {boolean} The evaluation result.
 */
function checkVal(types, val, nullable) {

  /** @type {number} */
  var i;

  i = types.length;
  while (i--) {
    if ( allTypes[ types[i] ](val, nullable) ) return true;
  }
  return false;
}

/**
 * @private
 * @param {!Array<string>} types - The types to check for.
 * @param {!Array<*>} vals - The values to evaluate.
 * @param {(undefined|boolean)} nullable - The nullability of the type string.
 * @return {boolean} The evaluation result.
 */
function checkVals(types, vals, nullable) {

  /** @type {number} */
  var i;

  i = vals.length;
  while (i--) {
    if ( !checkVal(types, vals[i], nullable) ) return false;
  }
  return true;
}

/**
 * @private
 * @param {string} typeStr - The user entered is/are type string.
 * @return {(!Array<string>|string)} Returns an invalid type string or a valid
 *   types array.
 */
function getValidTypes(typeStr) {

  /** @type {!Array<string>} */
  var types;
  /** @type {string} */
  var type;
  /** @type {number} */
  var i;

  types = cleanTypeStr(typeStr)
    .split('|');

  i = types.length;
  while (i--) {
    type = '_' + types[i];
    type = has(typeShortcuts, type) ? '_' + typeShortcuts[type] : type;
    if ( !has(allTypes, type) ) return type;
    types[i] = type;
  }

  hasSpecialChar('=', typeStr) && types.push('_undefined');
  return types;
}

/**
 * @private
 * @param {string} specialChar
 * @param {string} typeStr
 * @return {boolean}
 */
function hasSpecialChar(specialChar, typeStr) {
  return specialChars[specialChar](typeStr);
}

/**
 * @private
 * @param {string} typeStr - The type string to clean.
 * @return {string} The cleaned type string.
 */
function cleanTypeStr(typeStr) {
  return typeStr.toLowerCase()
    .replace(specialChars.all, '');
}

/**
 * Method checks whether "!" or "?" exists in the type string.
 * @private
 * @param {string} typeStr - The type string to evaluate.
 * @return {(undefined|boolean)} If undefined then no override exists. If
 *   boolean then override exists, and the boolean is the nullable value.
 */
function getNullable(typeStr) {

  /** @type {boolean} */
  var override;

  override = hasSpecialChar('?', typeStr)
    ? !hasSpecialChar('!', typeStr)
    : hasSpecialChar('!', typeStr);
  return !override
    ? undefined
    : !hasSpecialChar('!', typeStr) && hasSpecialChar('?', typeStr);
}


// *****************************************************************************
// SECTION: IS MAIN FUNCTION
// *****************************************************************************

/**
 * @param {string} typeStr - The type string containing the types to check for.
 * @param {*} val - The value to evaluate.
 * @return {boolean} The evaluation result.
 * @see [main is function docs for more info]{@link https://github.com/imaginate/are/blob/master/docs/is-main-func.md}
 */
function is(typeStr, val) {

  /** @type {!Array<string>} */
  var types;
  /** @type {string} */
  var nullable;

  if ( !is._str(typeStr) ) {
    throw new TypeError(
      'An is(typeStr, val) call received a non-string typeStr param'
    );
  }

  if ( hasSpecialChar('*', typeStr) ) {
    typeStr !== '*' && typeStr !== 'any' && _log && console.log(
      'Confusing is() Syntax: an asterisk should not be used with other ' +
      'data types as the check will pass regardless of the value\'s type'
    );
    return true;
  }

  types = getValidTypes(typeStr);

  if ( is.str(types) ) {
    throw new Error(
      'Invalid is(typeStr, val) Call: invalid type in the typeStr param; ' +
      'invalid type => ' + types
    );
    return false;
  }

  nullable = getNullable(typeStr);

  return checkVal(types, val, nullable);
}


// *****************************************************************************
// SECTION: ARE MAIN FUNCTION
// *****************************************************************************

/**
 * @param {string} typeStr - The type string containing the types to check for.
 * @param {*...} vals - The values to evaluate. Must have at least two different
 *   values to evaluate. The values can be provided in a single array or
 *   multiple params.
 * @return {boolean} The evaluation result.
 * @see [main are function docs for more info]{@link https://github.com/imaginate/are/blob/master/docs/are-main-func.md}
 */
function are(typeStr, vals) {

  /** @type {!Array<string>} */
  var types;
  /** @type {string} */
  var nullable;

  if ( !is._str(typeStr) ) {
    throw new TypeError(
      'An are(typeStr, vals) call received a non-string typeStr param'
    );
  }

  vals = arguments.length > 2 ? sliceArr.call(arguments, 1) : vals;

  if ( !is.arr(vals) ) {
    throw new TypeError(
      'An are(typeStr, vals) call did not receive multiple vals to evaluate'
    );
  }

  if ( hasSpecialChar('*', typeStr) ) {
    typeStr !== '*' && typeStr !== 'any' && _log && console.log(
      'Confusing are() Syntax: an asterisk should not be used with other ' +
      'data types as the check will pass regardless of the value\'s type'
    );
    return true;
  }

  types = getValidTypes(typeStr);

  if ( is.str(types) ) {
    throw new Error(
      'Invalid are(typeStr, val) Call: invalid type in the typeStr param; ' +
      'invalid type => ' + types
    );
    return false;
  }

  nullable = getNullable(typeStr);

  return checkVals(types, vals, nullable);
}


// *****************************************************************************
// SECTION: END
// *****************************************************************************

  return {
    is:  is,
    Is:  is,
    are: are,
    Are: are
  };
})());
