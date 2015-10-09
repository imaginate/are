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

  /** @type {function} */
  var _toStr = Object.prototype.toString;
  /** @type {function} */
  var _sliceArr = Array.prototype.slice;


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


// *****************************************************************************
// SECTION: ARE METHODS
// *****************************************************************************


////////////////////////////////////////////////////////////////////////////
// DEFINE PRIVATE ARE HELPERS
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
// DEFINE PUBLIC ARE METHODS - PRIMITIVES
////////////////////////////////////////////////////////////////////////

/**
 * @param {*...} vals
 * @return {boolean}
 */
are.null = function() {
  return _checkAreArr('null', arguments);
};

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
// DEFINE PUBLIC ARE METHODS - JS OBJECTS
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
 * @param {*...} vals
 * @return {boolean}
 */
are.func = function() {
  return _checkAreArr('func', arguments);
};
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
// DEFINE PUBLIC ARE METHODS - DOM OBJECTS
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

  return {
    is:  is,
    Is:  is,
    are: are,
    Are: are
  };
});
