/**
 * -----------------------------------------------------------------------------
 * ARE JS LIBRARIES
 * -----------------------------------------------------------------------------
 * @version 0.0.1
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

  "use strict";

  /** @type {boolean} */
  var _log = typeof console === 'object' && typeof console.log === 'function';
  /** @type {function} */
  var _toStr = Object.prototype.toString;
  /** @type {function} */
  var _sliceArr = Array.prototype.slice;
  /** @type {function} */
  var _has = function(obj, prop) {
    return obj.hasOwnProperty(prop);
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
is.null = function(val) {
  return val === null;
};
is.nil = is.null;

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
// IS METHODS - JS OBJECTS
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
is.fn = is.func;
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
      if ( _has(val, prop) ) {
        return false;
      }
    }
    return true;
};


// *****************************************************************************
// SECTION: ARE METHODS
// *****************************************************************************


////////////////////////////////////////////////////////////////////////////
// ARE HELPERS
////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} method
 * @param {!Arguments} args
 * @return {boolean}
 */
function _checkAreArr(method, args) {

  /** @type {function} */
  var check;
  /** @type {number} */
  var i;

  args = args.length > 1 ? _sliceArr.call(args, 0) : args[0];
  if ( !is.array(args) ) {
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


////////////////////////////////////////////////////////////////////////////
// ARE METHODS - PRIMITIVES
////////////////////////////////////////////////////////////////////////

/**
 * @param {*...} vals
 * @return {boolean}
 */
are.null = function() {
  return _checkAreArr('null', arguments);
};
are.nil = are.null;

/**
 * @param {*...} vals
 * @return {boolean}
 */
are.undefined = function() {
  return _checkAreArr('undefined', arguments);
};

/**
 * @param {*...} vals
 * @return {boolean}
 */
are.boolean = function() {
  return _checkAreArr('boolean', arguments);
};
are.bool = are.boolean;

/**
 * @param {*...} vals
 * @return {boolean}
 */
are.string = function() {
  return _checkAreArr('string', arguments);
};
are.str = are.string;

/**
 * Empty strings return false in this method.
 * @param {*...} vals
 * @return {boolean}
 */
are._string = function() {
  return _checkAreArr('_string', arguments);
};
are._str = are._string;

/**
 * @param {*...} vals
 * @return {boolean}
 */
are.number = function() {
  return _checkAreArr('number', arguments);
};
are.num = are.number;

/**
 * Zeros return false in this method.
 * @param {*...} vals
 * @return {boolean}
 */
are._number = function() {
  return _checkAreArr('_number', arguments);
};
are._num = are._number;


////////////////////////////////////////////////////////////////////////////
// ARE METHODS - JS OBJECTS
////////////////////////////////////////////////////////////////////////

/**
 * @param {*...} vals
 * @return {boolean}
 */
are.object = function() {
  return _checkAreArr('object', arguments);
};
are.obj = are.object;

/**
 * Functions return true in this method.
 * @param {*...} vals
 * @return {boolean}
 */
are._object = function() {
  return _checkAreArr('_object', arguments);
};
are._obj = are._object;

/**
 * @param {*...} vals
 * @return {boolean}
 */
are.func = function() {
  return _checkAreArr('func', arguments);
};
are.fn = are.func;
try {
  are.function = are.func;
}
catch(e) {
  console.log(
    'Your JS engine does not support are.function(). Use are.func() instead.'
  );
}

/**
 * @param {*...} vals
 * @return {boolean}
 */
are.array = function() {
  return _checkAreArr('array', arguments);
};
are.arr = are.array;

/**
 * @param {*...} vals
 * @return {boolean}
 */
are.regexp = function() {
  return _checkAreArr('regexp', arguments);
};
are.regex = are.regexp;


////////////////////////////////////////////////////////////////////////////
// ARE METHODS - DOM OBJECTS
////////////////////////////////////////////////////////////////////////

/**
 * @param {*...} vals
 * @return {boolean}
 */
are.document = function() {
  return _checkAreArr('document', arguments);
};
are.doc = are.document;

/**
 * @param {*...} vals
 * @return {boolean}
 */
are.element = function() {
  return _checkAreArr('element', arguments);
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
  return _checkAreArr('empty', arguments);
};


// *****************************************************************************
// SECTION: IS & ARE MAIN FUNCTION HELPERS
// *****************************************************************************


//////////////////////////////////////////////////////////////////////////////
// HASH MAPS
//////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @type {!Object<string, !RegExp>}
 */
var _regexps = {
  allTypes: new RegExp(
    "^(?:any|undefined|empty)$|^(?:null|string|number|boolean|object|regexp|" +
    "function|array|element|document|nil|str|num|bool|obj|func|fn|regex|arr|" +
    "elem|doc)(?:s|map)?$"
  ),
  nonNull: new RegExp(
    "^(?:string|number|boolean|function|undefined|str|num|bool|func|fn)$"
  ),
  arrays: new RegExp(
    "^(?:null|string|number|boolean|undefined|object|function|regexp|array|" +
    "element|document)s$"
  ),
  maps: new RegExp(
    "^(?:null|string|number|boolean|undefined|object|function|regexp|array|" +
    "element|document)map$"
  ),
  exPoint:   /\!/,
  quesMark:  /\?/,
  undefined: /\=|undefined/,
  any:       /\*|any/,
  charBloat: /[^a-z\|]/g
};

/**
 * @private
 * @type {!Object<string, function>}
 */
var _test = {
  allTypes:  function(str) { return _regexps.allTypes.test(str);  },
  nonNull:   function(str) { return _regexps.nonNull.test(str);   },
  arrays:    function(str) { return _regexps.arrays.test(str);    },
  maps:      function(str) { return _regexps.maps.test(str);      },
  exPoint:   function(str) { return _regexps.exPoint.test(str);   },
  quesMark:  function(str) { return _regexps.quesMark.test(str);  },
  undefined: function(str) { return _regexps.undefined.test(str); },
  any:       function(str) { return _regexps.any.test(str);       },
  charBloat: function(str) { return _regexps.charBloat.test(str); }
};

/**
 * @private
 * @type {!Object<string, string>}
 */
var _shorthand = {

  // primitives
  nil:  'null',
  str:  'string',
  num:  'number',
  bool: 'boolean',

  // js objects
  obj:   'object',
  fn:    'function',
  func:  'function',
  regex: 'regexp',
  arr:   'array',

  // dom objects
  elem: 'element',
  doc:  'document',

  // arrays
  nils:   'nulls',
  strs:   'strings',
  nums:   'numbers',
  bools:  'booleans',
  objs:   'objects',
  fns:    'functions',
  funcs:  'functions',
  regexs: 'regexps',
  arrs:   'arrays',
  elems:  'elements',
  docs:   'documents',

  // maps
  nilmap:   'nullmap',
  strmap:   'stringmap',
  nummap:   'numbermap',
  boolmap:  'booleanmap',
  objmap:   'objectmap',
  fnmap:    'functionmap',
  funcmap:  'functionmap',
  regexmap: 'regexpmap',
  arrmap:   'arraymap',
  elemmap:  'elementmap',
  docmap:   'documentmap'
};

/**
 * @private
 * @type {!Object<string, function(*): boolean>}
 */
var _mainChecks = {
  _null:      is.nil,
  _string:    is.str,
  _number:    is.num,
  _boolean:   is.bool,
  _object:    is.obj,
  _function:  is.func,
  _undefined: is.undefined,
  _regexp:    is.regex,
  _array:     is.arr,
  _document:  is.doc,
  _element:   is.elem,
  _empty:     is.empty
};


//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////

/**
 * Method checks whether "!" or "?" exists.
 * @private
 * @param {string} type - A string of the data types to evaluate against.
 * @return {boolean} The nullable override value.
 */
function _isNullOverride(type) {
  return _test.quesMark(type) ? !_test.exPoint(type) : _test.exPoint(type);
}

/**
 * @private
 * @param {string} type - A string of the data types to evaluate against.
 * @return {boolean} The nullable start value.
 */
function _isNullable(type) {
  return !_test.exPoint(type) && _test.quesMark(type);
}

/**
 * @private
 * @param {*} val - The value to be evaluated.
 * @param {!Array<string>} types - The data types to evaluate against.
 * @return {boolean} The evaluation result.
 */
function _checkEachType(val, types) {

  /** @type {number} */
  var i;
  /** @type {string} */
  var type;
  /** @type {?function} */
  var check;

  i = types.length;
  while (i--) {
    type = types[i];
    type = _has(_shorthand, type) ? _shorthand[type] : type;
    check = _test.arrays(type) && _checkArrayVals;
    check = check || (_test.maps(type) && _checkMapVals);
    if ( !check && !_has(_mainChecks, '_' + type) ) {
      throw new Error(
        'Failed is/are Helper, _checkEachType(), Call: ' +
        'missing type check in _mainChecks hash map; ' +
        'missing type => ' + type
      );
    }
    if ( check ? check(val, type) : _mainChecks['_' + type](val) ) {
      return true;
    }
  }
  return false;
}

/**
 * @private
 * @param {!Array<string>} types - The data types to evaluate against.
 * @return {boolean} The evaluation result.
 */
function _checkEachNull(types) {

  /** @type {number} */
  var i;

  i = types.length;
  while (i--) {
    if ( !_test.nonNull( types[i] ) ) {
      return true;
    }
  }
  return false;
}

/**
 * @private
 * @param {*} arr - The value to be evaluated.
 * @param {string} type - The data type.
 * @return {boolean} The evaluation result.
 */
function _checkArrayVals(arr, type) {

  /** @type {number} */
  var i;
  /** @type {function} */
  var check;

  if ( !is.arr(arr) ) {
    return false;
  }

  type = type.slice(0, -1);
  if ( !_has(_mainChecks, '_' + type) ) {
    throw new Error(
      'Failed is/are Helper, _checkArrayVals(), Call: ' +
      'missing type check in _mainChecks hash map; ' +
      'missing type => ' + type
    );
  }
  check = _mainChecks['_' + type];

  i = arr.length;
  while (i--) {
    if ( !check( arr[i] ) ) {
      return false;
    }
  }
  return true;
}

/**
 * @private
 * @param {*} obj - The value to be evaluated.
 * @param {string} type - The data type.
 * @return {boolean} The evaluation result.
 */
function _checkMapVals(obj, type) {

  /** @type {string} */
  var prop;
  /** @type {function} */
  var check;

  if ( !is.obj(obj) ) {
    return false;
  }

  type = type.slice(0, -3);
  if ( !_has(_mainChecks, '_' + type) ) {
    throw new Error(
      'Failed is/are Helper, _checkMapVals(), Call: ' +
      'missing type check in _mainChecks hash map; ' +
      'missing type => ' + type
    );
  }
  check = _mainChecks['_' + type];

  for (prop in obj) {
    if( _has(obj, prop) && !check( obj[prop] ) ) {
      return false;
    }
  }
  return true;
}


// *****************************************************************************
// SECTION: IS MAIN FUNCTION
// *****************************************************************************

/**
 * @param {string} type - A string of the data types to check for.
 * @param {*} val - The value to be evaluated.
 * @return {boolean} The evaluation result.
 * @see [main is function docs for more info]{@link https://github.com/imaginate/are/blob/master/docs/is-main-func.md}
 */
function is(type, val) {

  /** @type {!Array<string>} */
  var types;
  /** @type {number} */
  var i;

  if ( !is._str(type) ) {
    throw new TypeError(
      'An is(type, val) call received a non-string type param'
    );
  }

  // check for automatic pass ('*' = any value)
  if ( _test.any(type) ) {
    type !== '*' && type !== 'any' && _log && console.log(
      'Confusing is() Syntax: an asterisk should not be used with other ' +
      'data types as the check will pass regardless of the value\'s type'
    );
    return true;
  }

  types = type.toLowerCase()
    .replace(_regexps.charBloat, '')
    .split('|');

  // check each type in the type string
  i = types.length;
  while (i--) {
    if ( !_test.allTypes( types[i] ) ) {
      throw new Error(
        'An is(type, val) call received an invalid data type within the ' +
        'type param; invalid type => ' + types[i]
      );
      return false;
    }
  }

  // check for an optional value ('=' = undefined)
  if ( is.undefined(val) && _test.undefined(type) ) {
    return true;
  }

  // check for a nullable override ('!' = non-nullable) ('?' = nullable)
  if ( is.null(val) && _isNullOverride(type) ) {
    return _isNullable(type);
  }

  return is.null(val) ? _checkEachNull(types) : _checkEachType(val, types);
}


// *****************************************************************************
// SECTION: ARE MAIN FUNCTION
// *****************************************************************************

/**
 * @param {string} type - A string of the data types to check for.
 * @param {*...} vals - The values to be evaluated.
 * @return {boolean} The evaluation result.
 * @see [main are function docs for more info]{@link https://github.com/imaginate/are/blob/master/docs/are-main-func.md}
 */
function are(type) {

  /** @type {!Array<string>} */
  var types;
  /** @type {!Array<*>} */
  var vals;
  /** @type {*} */
  var val;
  /** @type {number} */
  var i;

  if ( !is._str(type) ) {
    throw new TypeError(
      'An are(type, vals) call received a non-string type param'
    );
  }

  vals = arguments.length > 2 ? _sliceArr.call(arguments, 1) : arguments[1];

  if ( !is.arr(vals) ) {
    throw new TypeError(
      'An are(type, vals) call did not receive multiple vals to evaluate'
    );
  }

  // check for automatic pass ('*' = any value)
  if ( _test.any(type) ) {
    type !== '*' && type !== 'any' && _log && console.log(
      'Confusing are() Syntax: an asterisk should not be used with other ' +
      'data types as the check will pass regardless of the value\'s type'
    );
    return true;
  }

  types = type.toLowerCase()
    .replace(_regexps.charBloat, '')
    .split('|');

  // check each type in the type string
  i = types.length;
  while (i--) {
    if ( !_test.allTypes( types[i] ) ) {
      throw new Error(
        'An are(type, vals) call received an invalid data type within the ' +
        'type param; invalid type => ' + types[i]
      );
      return false;
    }
  }

  // check for undefined and null special chars
  _test.undefined(type) && types.push('undefined');
  _isNullOverride(type) && _isNullable(type) && types.push('null');

  // check all of the values
  while (i--) {
    if ( !_checkEachType(vals[i], types) ) {
      return false;
    }
  }
  return true;
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
