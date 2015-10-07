/**
 * -----------------------------------------------------------------------------
 * ARE MAIN FUNCTION
 * -----------------------------------------------------------------------------
 * @version 0.0.1
 * @see [are]{@link https://github.com/imaginate/are/blob/master/parts/are-main-func.js}
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2015 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */


// *****************************************************************************
// SECTION: ARE MAIN FUNCTION
// *****************************************************************************

/**
 * @param {string} type - A string of the data types to check for.
 * @param {*...} vals - The values to be evaluated.
 * @return {boolean} The evaluation result.
 * @see [main are function docs for more info]{@link https://github.com/imaginate/are/blob/master/docs/are-main-func.md}
 */
var are = (function() {

  function are(type) {

    /** @type {!Array<string>} */
    var types;
    /** @type {!Array<*>} */
    var vals;
    /** @type {*} */
    var val;
    /** @type {number} */
    var i;

    if ( !_is.str(type) ) {
      throw new TypeError(
        'An are(type, vals) call received a non-string type param'
      );
    }

    types = type.toLowerCase().replace(regex.charBloat, '').split('|');

    if ( !validTypeString(types) ) {
      return false;
    }

    vals = arguments.length > 2 ? _sliceArr.call(arguments, 1) : arguments[1];

    if ( !_is.arr(vals) ) {
      throw new TypeError(
        'An are(type, vals) call did not receive multiple vals to evaluate'
      );
    }

    // Check for automatic pass ('*' = any value)
    if ( regex.any.test(type) ) {
      type.length > 1 && console.log(
        'Confusing are() Syntax: an asterisk should not be used with other ' +
        'data types as the check will pass regardless of the value\'s type'
      );
      return true;
    }

    // Check for undefined and null special chars
    regex.undefined.test(type) && types.push('undefined');
    isNullOverride(type) && isNullable(type) && types.push('null');

    // Check all of the values
    while (i--) {
      if ( !forEachCheckType(vals[i], types) ) {
        return false;
      }
    }
    return true;
  };

  ////////////////////////////////////////////////////////////////////////
  // PRIVATE IS
  ////////////////////////////////////////////////////////////////////

  /** @type {!Object<string, function(*): boolean} */
  var _is = {
    null: function(val) { return val === null; },
    undefined: function(val) { return typeof val === 'undefined'; },
    bool: function(val) { return typeof val === 'boolean'; },
    str:  function(val) { return typeof val === 'string'; },
    num:  function(val) { return typeof val === 'number'; },
    obj:  function(val) { return !!val && typeof val === 'object'; },
    func: function(val) { return !!val && typeof val === 'function'; },
  };
  _is.arr = function(val) {
    return _is.obj(val) && _toStr.call(val) === '[object Array]';
  };
  _is.regex = function(val) {
    return _is.obj(val) && _toStr.call(val) === '[object RegExp]';
  };
  _is.doc = function(val) {
    return _is.obj(val) && obj.nodeType === 9;
  };
  _is.elem = function(val) {
    return _is.obj(val) && obj.nodeType === 1;
  };

  ////////////////////////////////////////////////////////////////////////
  // PRIVATE REGEXPS
  ////////////////////////////////////////////////////////////////////

  /**
   * @type {!{
   *   allTypes:  !RegExp,
   *   nonNull:   !RegExp,
   *   arrays:    !RegExp,
   *   maps:      !RegExp,
   *   exPoint:   !RegExp,
   *   quesMark:  !RegExp,
   *   undefined: !RegExp,
   *   any:       !RegExp,
   *   charBloat: !RegExp
   * }}
   */
  var regex = {
    allTypes: new RegExp(
      "^(?:any|null|undefined)$|^empty(?:array|map)?$|^(?:string|number|" +
      "boolean|object|function|regexp|array|element|document|str|num|"  +
      "bool|obj|func|regex|arr|elem|doc)(?:s|map)?$"
    ),
    nonNull: /^(?:string|number|boolean|function)$/,
    arrays: new RegExp(
      "^(?:string|number|boolean|undefined|object|function|" +
      "regexp|array|element|document)s$"
    ),
    maps: new RegExp(
      "^(?:string|number|boolean|undefined|object|function|" +
      "regexp|array|element|document)map$"
    ),
    exPoint:   /\!/,
    quesMark:  /\?/,
    undefined: /\=|undefined|^(?:.+\|)?empty(?:\|.+)?$/,
    any:       /\*|any/,
    charBloat: /[^a-z\|]/g
  };

  ////////////////////////////////////////////////////////////////////////
  // PRIVATE SHORTHAND MAP
  ////////////////////////////////////////////////////////////////////

  /** @type {!Object<string, string>} */
  var shorthand = {
    str:   'string',
    num:   'number',
    bool:  'boolean',
    obj:   'object',
    func:  'function',
    regex: 'regexp',
    arr:   'array',
    elem:  'element',
    doc:   'document',
    strs:   'strings',
    nums:   'numbers',
    bools:  'booleans',
    objs:   'objects',
    funcs:  'functions',
    regexs: 'regexps',
    arrs:   'arrays',
    elems:  'elements',
    docs:   'documents',
    strmap:   'stringmap',
    nummap:   'numbermap',
    boolmap:  'booleanmap',
    objmap:   'objectmap',
    funcmap:  'functionmap',
    regexmap: 'regexpmap',
    arrmap:   'arraymap',
    elemmap:  'elementmap',
    docmap:   'documentmap',
    emptyarray: 'undefineds',
    emptymap: 'undefinedmap'
  };

  ////////////////////////////////////////////////////////////////////////
  // PRIVATE CHECK METHODS
  ////////////////////////////////////////////////////////////////////

  /** @type {!Object<string, function(*): boolean>} */
  var checks = {
    _string:    _is.str,
    _number:    _is.num,
    _boolean:   _is.bool,
    _object:    _is.obj,
    _function:  _is.func,
    _undefined: _is.undefined,
    _regexp:    _is.regex,
    _array:     _is.arr,
    _document:  _is.doc,
    _element:   _is.elem,
    _null:      _is.null
  };

  ////////////////////////////////////////////////////////////////////////
  // PRIVATE HELPER METHODS
  ////////////////////////////////////////////////////////////////////

  /**
   * @param {string} type - A string of the data types to evaluate against.
   * @return {boolean} The nullable override value.
   */
  function isNullOverride(type) {
    return ( regex.quesMark.test(type) ?
      !regex.exPoint.test(type) : regex.exPoint.test(type)
    );
  }

  /**
   * @param {string} type - A string of the data types to evaluate against.
   * @return {boolean} The nullable start value.
   */
  function isNullable(type) {
    return !regex.exPoint.test(type) && regex.quesMark.test(type);
  }

  /**
   * @param {!Array<string>} types - The type string to evaluate.
   * @return {boolean} The evaluation result.
   */
  function validTypeString(types) {

    /** @type {number} */
    var i;

    i = types.length;
    while (i--) {
      if ( !regex.allTypes.test( types[i] ) ) {
        throw new Error(
          'An are(type, vals) call received an invalid data type within the ' +
          'type param; invalid type => ' + types[i]
        );
        return false;
      }
    }
    return true;
  }

  /**
   * @param {*} val - The value to be evaluated.
   * @param {!Array<string>} types - The data types to evaluate against.
   * @return {boolean} The evaluation result.
   */
  function forEachCheckType(val, types) {

    /** @type {number} */
    var i;
    /** @type {string} */
    var type;
    /** @type {?function} */
    var check;

    i = types.length;
    while (i--) {
      type = types[i];
      type = shorthand.hasOwnProperty(type) ? shorthand[type] : type;
      check = regex.arrays.test(type) ? checkArrayVals : null;
      check = !check && regex.maps.test(type) ? checkMapVals : check;
      if ( !check && !checks.hasOwnProperty('_' + type) ) {
        throw new Error(
          'Failed are() Call: the private helper, forEachCheckType, ' +
          'encountered a missing type value property in the checks hash map; ' +
          'missing prop => ' + type
        );
      }
      if ( check ? check(val, type) : checks['_' + type](val) ) {
        return true;
      }
    }
    return false;
  }

  /**
   * @param {*} arr - The value to be evaluated.
   * @param {string} type - The data type.
   * @return {boolean} The evaluation result.
   */
  function checkArrayVals(arr, type) {

    /** @type {number} */
    var i;
    /** @type {function} */
    var check;

    if ( !_is.arr(arr) ) {
      return false;
    }

    type = type.slice(0, -1);
    if ( !checks.hasOwnProperty('_' + type) ) {
      throw new Error(
        'Failed is() Call: the private helper, checkArrayVals, encountered ' +
        'a missing type value property in the checks hash map; missing prop ' +
        '=> ' + type
      );
    }
    check = checks['_' + type];

    i = arr.length;
    while (i--) {
      if ( check( arr[i] ) ) {
        return false;
      }
    }
    return true;
  }

  /**
   * @param {*} obj - The value to be evaluated.
   * @param {string} type - The data type.
   * @return {boolean} The evaluation result.
   */
  function checkMapVals(obj, type) {

    /** @type {string} */
    var prop;
    /** @type {function} */
    var check;

    if ( !_is.obj(obj) ) {
      return false;
    }

    type = type.slice(0, -3);
    if ( !checks.hasOwnProperty('_' + type) ) {
      throw new Error(
        'Failed is() Call: the private helper, checkMapVals, encountered ' +
        'a missing type value property in the checks hash map; missing prop ' +
        '=> ' + type
      );
    }
    check = checks['_' + type];

    for (prop in obj) {
      if( obj.hasOwnProperty(prop) && !check( obj[prop] ) ) {
        return false;
      }
    }
    return true;
  }

  return are;
})();
