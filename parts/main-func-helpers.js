/**
 * -----------------------------------------------------------------------------
 * IS & ARE MAIN FUNCTION HELPERS
 * -----------------------------------------------------------------------------
 * @version 0.0.1
 * @see [helpers]{@link https://github.com/imaginate/are/blob/master/parts/main-func-helpers.js}
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2015 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */


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
  _string:    is._str,
  _number:    is._num,
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
    check = !check && _test.maps(type) && _checkMapVals;
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
