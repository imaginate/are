/**
 * -----------------------------------------------------------------------------
 * TEST: ARE MAIN FUNCTION
 * -----------------------------------------------------------------------------
 * @see [are]{@link https://github.com/imaginate/are/blob/master/parts/are-main-func.js}
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2015 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

/** @type {!Object} */
var assert = require('assert');
/** @type {function} */
var forOwn = require('lodash/object/forOwn');


////////////////////////////////////////////////////////////////////////////////
// DEFINE PRIVATE HELPERS
////////////////////////////////////////////////////////////////////////////////

/** @type {!Object} */
var refs = {
  nil:   [ null, null ],
  un:    [ undefined, undefined ],
  bool:  [ true, false ],
  str:   [ 'str', '', 'str' ],
  num:   [ 1, 5, 0, -5, 1.5 ],
  obj:   [ {}, {} ],
  arr:   [ [], [] ],
  regex: [ /1/, /t/g ],
  func:  [ function(){}, function(a){} ],
  doc:   [ { nodeType: 9 }, { nodeType: 9 } ],
  elem:  [ { nodeType: 1 }, { nodeType: 1 } ],
  arrays: {
    nil:   [ [ null, null ], [ null, null ] ],
    un:    [ [ undefined, undefined ], [ undefined, undefined ] ],
    bool:  [ [ true, false ], [ true, false ] ],
    str:   [ [ 'str', '', 'str' ], [ 'str', '', 'str' ] ],
    num:   [ [ 1, 5, 0, -5, 1.5 ], [ 1, 5, 0, -5, 1.5 ] ],
    obj:   [ [ {}, {} ], [ {}, {} ] ],
    arr:   [ [ [], [] ], [ [], [] ] ],
    regex: [ [ /1/, /t/g ], [ /1/, /t/g ] ],
    func:  [ [ function(){}, function(a){} ], [ function(){}, function(a){} ] ],
    doc:   [ [ {nodeType: 9},{nodeType: 9} ], [ {nodeType: 9},{nodeType: 9} ] ],
    elem:  [ [ {nodeType: 1},{nodeType: 1} ], [ {nodeType: 1},{nodeType: 1} ] ]
  },
  maps: {
    nil:   [ { a: null, b: null }, { a: null, b: null } ],
    un:    [ { a: undefined, b: undefined }, { a: undefined, b: undefined } ],
    bool:  [ { a: true, b: false }, { a: true, b: false } ],
    str:   [ { a: 'str', b: '', c: 'str' }, { a: 'str', b: '', c: 'str' } ],
    num:   [ { a: 0, b: 1, c: 1.5, d: -5 }, { a: 0, b: 1, c: 1.5, d: -5 } ],
    obj:   [ { a: {}, b: {} }, { a: {}, b: {} } ],
    arr:   [ { a: [], b: [] }, { a: [], b: [] } ],
    regex: [ { a: /1/, b: /t/g }, { a: /1/, b: /t/g } ],
    func:  [ {a:function(){},b:function(){}}, {a:function(){},b:function(){}} ],
    doc:   [ {a:{nodeType:9},b:{nodeType:9}}, {a:{nodeType:9},b:{nodeType:9}} ],
    elem:  [ {a:{nodeType:1},b:{nodeType:1}}, {a:{nodeType:1},b:{nodeType:1}} ]
  }
};

/** @type {!Object<string, !Object>} */
var methods = {
  primitives: {
    null: {
      shortcut: 'nil',
      truthy: [ refs.nil ],
      falsy:  [ refs.obj, refs.bool, refs.str, refs.arr ]
    },
    undefined: {
      truthy: [ refs.un ],
      falsy:  [ refs.obj, refs.str, refs.arr, refs.nil ]
    },
    boolean: {
      shortcut: 'bool',
      truthy: [ refs.bool ],
      falsy:  [ refs.obj, refs.num, refs.str, refs.nil ]
    },
    string: {
      shortcut: 'str',
      truthy: [ refs.str ],
      falsy:  [ refs.num, refs.bool, refs.obj, refs.nil ]
    },
    number: {
      shortcut: 'num',
      truthy: [ refs.num ],
      falsy:  [ refs.bool, refs.obj, refs.str, refs.nil ]
    }
  },
  js_objects: {
    object: {
      shortcut: 'obj',
      truthy: [ refs.obj, refs.arr, refs.regex, refs.nil ],
      falsy:  [ refs.func, refs.num, refs.str ]
    },
    function: {
      shortcut: 'fn|func',
      truthy: [ refs.func ],
      falsy:  [ refs.str, refs.obj, refs.bool, refs.nil ]
    },
    array: {
      shortcut: 'arr',
      truthy: [ refs.arr, refs.nil ],
      falsy:  [ refs.obj, refs.regex, refs.num ]
    },
    regexp: {
      shortcut: 'regex',
      truthy: [ refs.regex, refs.nil ],
      falsy:  [ refs.obj, refs.bool, refs.arr ]
    }
  },
  dom_objects: {
    document: {
      shortcut: 'doc',
      truthy: [ refs.doc, refs.nil ],
      falsy:  [ refs.obj, refs.elem, refs.str ]
    },
    element: {
      shortcut: 'elem',
      truthy: [ refs.elem, refs.nil ],
      falsy:  [ refs.doc, refs.obj, refs.num ]
    }
  },
  arrays: {
    nulls: {
      shortcut: 'nils',
      truthy: [ refs.arrays.nil, refs.arr, refs.nil ],
      falsy:  [ refs.arrays.obj, refs.arrays.bool, refs.str ]
    },
    booleans: {
      shortcut: 'bools',
      truthy: [ refs.arrays.bool, refs.arr, refs.nil ],
      falsy:  [ refs.arrays.obj, refs.arrays.num, refs.arrays.str ]
    },
    strings: {
      shortcut: 'strs',
      truthy: [ refs.arrays.str, refs.arr, refs.nil ],
      falsy:  [ refs.arrays.num, refs.arrays.bool, refs.arrays.obj ]
    },
    numbers: {
      shortcut: 'nums',
      truthy: [ refs.arrays.num, refs.arr, refs.nil ],
      falsy:  [ refs.arrays.bool, refs.arrays.obj, refs.arrays.str ]
    },
    objects: {
      shortcut: 'objs',
      truthy: [ refs.arrays.obj, refs.arrays.arr, refs.arr, refs.nil ],
      falsy:  [ refs.arrays.func, refs.arrays.num, refs.arrays.str ]
    },
    functions: {
      shortcut: 'fns|funcs',
      truthy: [ refs.arrays.func, refs.arr, refs.nil ],
      falsy:  [ refs.arrays.arr, refs.arrays.obj, refs.arrays.bool ]
    },
    arrays: {
      shortcut: 'arrs',
      truthy: [ refs.arrays.arr, refs.arr, refs.nil ],
      falsy:  [ refs.arrays.obj, refs.arrays.regex, refs.arrays.num ]
    },
    regexps: {
      shortcut: 'regexs',
      truthy: [ refs.arrays.regex, refs.arr, refs.nil ],
      falsy:  [ refs.arrays.obj, refs.arrays.bool, refs.arrays.num ]
    },
    documents: {
      shortcut: 'docs',
      truthy: [ refs.arrays.doc, refs.arr, refs.nil ],
      falsy:  [ refs.arrays.obj, refs.arrays.elem, refs.arrays.str ]
    },
    elements: {
      shortcut: 'elems',
      truthy: [ refs.arrays.elem, refs.arr, refs.nil ],
      falsy:  [ refs.arrays.doc, refs.arrays.obj, refs.arrays.num ]
    }
  },
  maps: {
    nullMap: {
      shortcut: 'nilMap',
      truthy: [ refs.maps.nil, refs.obj, refs.nil ],
      falsy:  [ refs.maps.obj, refs.maps.bool, refs.str ]
    },
    booleanMap: {
      shortcut: 'boolMap',
      truthy: [ refs.maps.bool, refs.obj, refs.nil ],
      falsy:  [ refs.maps.obj, refs.maps.num, refs.maps.str ]
    },
    stringMap: {
      shortcut: 'strMap',
      truthy: [ refs.maps.str, refs.obj, refs.nil ],
      falsy:  [ refs.maps.num, refs.maps.bool, refs.maps.obj ]
    },
    numberMap: {
      shortcut: 'numMap',
      truthy: [ refs.maps.num, refs.obj, refs.nil ],
      falsy:  [ refs.maps.bool, refs.maps.obj, refs.maps.str ]
    },
    objectMap: {
      shortcut: 'objMap',
      truthy: [ refs.maps.obj, refs.maps.regex, refs.obj, refs.nil ],
      falsy:  [ refs.maps.func, refs.maps.num, refs.maps.str ]
    },
    functionMap: {
      shortcut: 'fnMap|funcMap',
      truthy: [ refs.maps.func, refs.obj, refs.nil ],
      falsy:  [ refs.maps.arr, refs.maps.obj, refs.maps.bool ]
    },
    arrayMap: {
      shortcut: 'arrMap',
      truthy: [ refs.maps.arr, refs.obj, refs.nil ],
      falsy:  [ refs.maps.obj, refs.maps.regex, refs.maps.num ]
    },
    regexpMap: {
      shortcut: 'regexMap',
      truthy: [ refs.maps.regex, refs.obj, refs.nil ],
      falsy:  [ refs.maps.obj, refs.maps.bool, refs.maps.num ]
    },
    documentMap: {
      shortcut: 'docMap',
      truthy: [ refs.maps.doc, refs.obj, refs.nil ],
      falsy:  [ refs.maps.obj, refs.maps.elem, refs.maps.str ]
    },
    elementMap: {
      shortcut: 'elemMap',
      truthy: [ refs.maps.elem, refs.obj, refs.nil ],
      falsy:  [ refs.maps.doc, refs.maps.obj, refs.maps.num ]
    }
  },
  others: {
    empty: {
      truthy: [
        [ null, undefined, false, '', 0, {}, [], function(){}, NaN ]
      ],
      falsy: [
        [ false, true, false ],
        [ '', 'a', '' ],
        [ 0, -1, 0 ],
        [ {}, { a: null }, {} ],
        [ [], [ 'a' ], [] ],
        [ function(){}, function(a){}, function(){} ]
      ]
    }
  },
  special_chars: {
    '*': {
      shortcut: 'any',
      truthy: [ refs.obj, refs.arr, refs.str, refs.nil ],
      falsy:  []
    },
    'obj|str': {
      truthy: [ refs.obj, refs.str, refs.nil ],
      falsy:  [ refs.num, refs.bool ]
    },
    '!obj': {
      truthy: [ refs.obj, refs.arr ],
      falsy:  [ refs.str, refs.nil ]
    },
    '?str': {
      truthy: [ refs.str, refs.nil ],
      falsy:  [ refs.obj, refs.arr ]
    },
    'str=': {
      truthy: [ refs.str, refs.un ],
      falsy:  [ refs.num, refs.arr, refs.nil ]
    }
  }
};


////////////////////////////////////////////////////////////////////////////////
// PREP THE APPLY TESTS
////////////////////////////////////////////////////////////////////////////////

forOwn(methods, function(/** !Object */ section) {
  forOwn(section, function(/** !Object */ method,/** string */ methodName) {
    method.truthy2 = method.truthy.map(function(/** !Array<*> */ vals) {
      return [ methodName ].concat(vals);
    });
    method.falsy2 = method.falsy.map(function(/** !Array<*> */ vals) {
      return [ methodName ].concat(vals);
    });
    if (method.hasOwnProperty('shortcut') && method.shortcut) {
      method.shortcut.split('|').forEach(
        function(/** string */ shortname, /** number */ i) {
          i += 3;
          method['truthy' + i] = method.truthy.map(
            function(/** !Array<*> */ vals) {
              return [ shortname ].concat(vals);
            }
          );
          method['falsy' + i] = method.falsy.map(
            function(/** !Array<*> */ vals) {
              return [ shortname ].concat(vals);
            }
          );
        }
      );
    }
  });
});


////////////////////////////////////////////////////////////////////////////////
// RUN THE TESTS
////////////////////////////////////////////////////////////////////////////////

/** @type {number} */
var len;

describe('are-main-func', function() {
  forOwn(methods, function(/** !Object */ section, /** string */ sectionName) {
    describe('\n    ' + sectionName, function() {
      forOwn(section, function(/** !Object */ method,/** string */ methodName) {
        describe('are("' + methodName + '", vals)', function() {
          describe('truthy', function() {
            len = method.truthy.length;
            method.truthy.forEach(
              function(/** !Array<*> */ vals, /** number */ i) {
                it(i, function() {
                  assert.strictEqual(true, are(methodName, vals));
                });
              }
            );
            method.truthy2.forEach(
              function(/** !Array<*> */ vals, /** number */ i) {
                it(i + len, function() {
                  assert.strictEqual(true, are.apply(null, vals));
                });
              }
            );
          });
          describe('falsy', function() {
            len = method.falsy.length;
            method.falsy.forEach(
              function(/** !Array<*> */ vals, /** number */ i) {
                it(i, function() {
                  assert.strictEqual(false, are(methodName, vals));
                });
              }
            );
            method.falsy2.forEach(
              function(/** !Array<*> */ vals, /** number */ i) {
                it(i + len, function() {
                  assert.strictEqual(false, are.apply(null, vals));
                });
              }
            );
          });
        });
        if (method.hasOwnProperty('shortcut') && method.shortcut) {
          method.shortcut.split('|').forEach(
            function(/** string */ shortname, /** number */ ii) {
              ii += 3;
              describe('are("' + shortname + '", vals)', function() {
                describe('truthy', function() {
                  len = method.truthy.length;
                  method.truthy.forEach(
                    function(/** !Array<*> */ vals, /** number */ i) {
                      it(i, function() {
                        assert.strictEqual(true, are(shortname, vals));
                      });
                    }
                  );
                  method['truthy' + ii].forEach(
                    function(/** !Array<*> */ vals, /** number */ i) {
                      it(i + len, function() {
                        assert.strictEqual(true, are.apply(null, vals));
                      });
                    }
                  );
                });
                describe('falsy', function() {
                  len = method.falsy.length;
                  method.falsy.forEach(
                    function(/** !Array<*> */ vals, /** number */ i) {
                      it(i, function() {
                        assert.strictEqual(false, are(shortname, vals));
                      });
                    }
                  );
                  method['falsy' + ii].forEach(
                    function(/** !Array<*> */ vals, /** number */ i) {
                      it(i + len, function() {
                        assert.strictEqual(false, are.apply(null, vals));
                      });
                    }
                  );
                });
              });
            }
          );
        }
      });
    });
  });
});
