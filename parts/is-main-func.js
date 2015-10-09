/**
 * -----------------------------------------------------------------------------
 * IS MAIN FUNCTION
 * -----------------------------------------------------------------------------
 * @version 0.0.1
 * @see [is]{@link https://github.com/imaginate/are/blob/master/parts/is-main-func.js}
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2015 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */


// *****************************************************************************
// SECTION: IS MAIN FUNCTION
// *****************************************************************************

/**
 * @param {string} type - A string of the data types to check for.
 * @param {*} val - The value to be evaluated.
 * @return {boolean} The evaluation result.
 * @see [main is function docs for more info]{@link https://github.com/imaginate/are/blob/master/docs/is-main-func.md}
 */
var is = (function() {

  function is(type, val) {

    /** @type {!Array<string>} */
    var types;

    if ( !_is.str(type) ) {
      throw new TypeError(
        'An is(type, val) call received a non-string type param'
      );
    }

    types = type.toLowerCase().replace(regex.charBloat, '').split('|');
    
    if ( !validTypeString(types) ) {
      return false;
    }

    // Check for automatic pass ('*' = any value)
    if ( regex.any.test(type) ) {
      type.length > 1 && console.log(
        'Confusing is() Syntax: an asterisk should not be used with other ' +
        'data types as the check will pass regardless of the value\'s type'
      );
      return true;
    }

    // Check for an optional value ('=' = undefined)
    if ( _is.undefined(val) && regex.undefined.test(type) ) {
      return true;
    }

    // Check for a nullable override ('!' = non-nullable) ('?' = nullable)
    if ( _is.null(val) && isNullOverride(type) ) {
      return isNullable(type);
    }

    return ( _is.null(val) ?
      forEachCheckNull(types) : forEachCheckType(val, types)
    );
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
    func: function(val) { return !!val && typeof val === 'function'; }
  };
  _is.arr = function(val) {
    return _is.obj(val) && _toStr.call(val) === '[object Array]';
  };
  _is.regex = function(val) {
    return _is.obj(val) && _toStr.call(val) === '[object RegExp]';
  };
  _is.doc = function(val) {
    return _is.obj(val) && val.nodeType === 9;
  };
  _is.elem = function(val) {
    return _is.obj(val) && val.nodeType === 1;
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
      "^(?:any|null|undefined|empty)$|^(?:string|number|boolean|" +
      "object|function|regexp|array|element|document|str|num|"  +
      "bool|obj|func|regex|arr|elem|doc)(?:s|map)?$"
    ),
    nonNull: /^(?:string|number|boolean|function|undefined|str|num|bool|func)$/,
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
    undefined: /\=|undefined/,
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
    docmap:   'documentmap'
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
    _null:      function() { return false; },
    _empty:     function(val) {
      if (!val) {
        return true;
      }
      if ( _is.arr(val) || _is.func(val) ) {
        return !val.length;
      }
      if ( !_is.obj(val) ) {
        return false;
      }
      for (var key in val) {
        if ( val.hasOwnProperty(key) ) {
          return false;
        }
      }
      return true;
    }
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
          'An is(type, val) call received an invalid data type within the ' +
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
          'Failed is() Call: the private helper, forEachCheckType, ' +
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
   * @param {!Array<string>} types - The data types to evaluate against.
   * @return {boolean} The evaluation result.
   */
  function forEachCheckNull(types) {

    /** @type {number} */
    var i;

    i = types.length;
    while (i--) {
      if ( !regex.nonNull.test( types[i] ) ) {
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
      if ( !check( arr[i] ) ) {
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

  return is;
})();
