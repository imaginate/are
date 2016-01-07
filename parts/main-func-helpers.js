/**
 * -----------------------------------------------------------------------------
 * IS & ARE MAIN FUNCTION HELPERS
 * -----------------------------------------------------------------------------
 * @version 0.2.0
 * @see [helpers]{@link https://github.com/imaginate/are/blob/master/parts/main-func-helpers.js}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2015 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */


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
