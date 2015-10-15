/**
 * -----------------------------------------------------------------------------
 * ARE JS LIBRARIES
 * -----------------------------------------------------------------------------
 * @version 0.1.0
 * @see [are]{@link https://github.com/imaginate/are}
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2015 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

;(function(/** Object */ root, /** function(Object) */ setupAre) {

  /** @type {!{ is: !Object, are: !Object }} */
  var _are = setupAre();
  /** @type {!Object} */
  var checks = {
    exp: _isObj(typeof exports) && _getObj(exports, true),
    mod: _isObj(typeof module) && _getObj(module, true),
    glo: _isObj(typeof global, true) && _getObj(global),
    win: _isObj(typeof window) && _getObj(window),
    sel: _isObj(typeof self) && _getObj(self),
    roo: _isObj(typeof root) && _getObj(root)
  };
  checks.glo = checks.exp && checks.mod && checks.glo;

  root = ( checks.glo ?
    global : checks.win && window !== (root && root.window) ?
      window : checks.sel ?
        self : checks.roo ?
          root : Function('return this')()
  );

  // window | self | global | this
  checks.win && _applyAre(window);
  checks.sel && _applyAre(self);
  _applyAre(root);

  // exports
  if (checks.exp && checks.mod) {
    if (module.exports === exports) {
      module.exports = _are;
    }
    else {
      _applyAre(exports);
    }
  }

  // AMD
  if (typeof define === 'function' && define.amd &&
      typeof define.amd === 'object') {
    define(function() {
      return _are;
    });
  }

  /**
   * @private
   * @param {string} typeOf
   * @param {boolean=} noFunc
   * @return {boolean}
   */
  function _isObj(typeOf, noFunc) {
    return typeOf === 'object' || (!noFunc && typeOf === 'function');
  }

  /**
   * @private
   * @param {(Object|?function)} obj
   * @param {boolean=} testNodeType
   * @return {boolean}
   */
  function _getObj(obj, testNodeType) {
    obj = obj && testNodeType && obj.nodeType ? false : obj;
    return obj && !testNodeType && obj.Object !== Object ? false : !!obj;
  }

  /**
   * @private
   * @param {(!Object|function)} obj
   * @return {boolean}
   */
  function _applyAre(obj) {
    obj.is = _are.is;
    obj.Is = _are.Is;
    obj.are = _are.are;
    obj.Are = _are.Are;
    return true;
  }

})(this, function setupAre(undefined) {

  /** @type {boolean} */
  var _log = typeof console === 'object' && typeof console.log === 'function';
  /** @type {function} */
  var toStr = Object.prototype.toString;
  /** @type {function} */
  var sliceArr = Array.prototype.slice;
  /** @type {function} */
  var has = function(obj, prop) {
    return obj.hasOwnProperty(prop);
  };
  /** @type {function} */
  var logSupportMsg = function(lib, avoid, use) {
    _log && console.log(
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

    if ( !is.arr(arr) ) {
      return false;
    }

    i = arr.length;
    while (i--) {
      if ( !eachCheck( arr[i] ) ) {
        return false;
      }
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

    if ( !is.obj(obj) ) {
      return false;
    }

    for (prop in obj) {
      if( has(obj, prop) && !eachCheck( obj[prop] ) ) {
        return false;
      }
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
  'number':    is.num
}, false);
makeType('primitives', 'null', is.nil);
makeType('primitives', 'nan', is.nan);

makeTypes('js_objects', {
  'object': is.obj,
  'regexp': is.regex,
  'array':  is.arr
});
makeType('js_objects', 'arguments', is.args);
makeType('js_objects', 'function', is.func, false);

makeTypes('dom_objects', {
  'element':  is.elem,
  'document': is.doc
});

makeType('others', 'empty', is.empty);

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
    if ( allTypes[ types[i] ](val, nullable) ) {
      return true;
    }
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
    if ( !checkVal(types, vals[i], nullable) ) {
      return false;
    }
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
    if ( !has(allTypes, type) ) {
      return type;
    }
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

  override = hasSpecialChar('?', typeStr) ?
    !hasSpecialChar('!', typeStr) : hasSpecialChar('!', typeStr);
  return !override ?
    undefined : !hasSpecialChar('!', typeStr) && hasSpecialChar('?', typeStr);
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
});
