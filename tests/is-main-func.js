/**
 * -----------------------------------------------------------------------------
 * TEST: IS MAIN FUNCTION
 * -----------------------------------------------------------------------------
 * @see [is]{@link https://github.com/imaginate/are/blob/master/parts/is-main-func.js}
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
  nil:   null,
  un:    undefined,
  bool:  true,
  str:   'string',
  num:   5,
  obj:   {},
  arr:   [],
  regex: /1/,
  func:  function(){},
  doc:   { nodeType: 9 },
  elem:  { nodeType: 1 },
  arrays: {
    nil:   [ null, null ],
    un:    [ undefined, undefined ],
    bool:  [ true, false ],
    str:   [ 'str', 'str', '' ],
    num:   [ 0, 1, 5, -5, 1.5 ],
    obj:   [ {}, {} ],
    arr:   [ [], [] ],
    regex: [ /1/, /t/g ],
    func:  [ function(){}, function(){} ],
    doc:   [ { nodeType: 9 }, { nodeType: 9 } ],
    elem:  [ { nodeType: 1 }, { nodeType: 1 } ]
  },
  maps: {
    nil:   { a: null, b: null },
    un:    { a: undefined, b: undefined },
    bool:  { a: true, b: false },
    str:   { a: 'str', b: 'str', c: '' },
    num:   { a: 0, b: 1, c: 5, d: -5, e: 1.5 },
    obj:   { a: {}, b: {} },
    arr:   { a: [], b: [] },
    regex: { a: /1/, b: /t/g },
    func:  { a: function(){}, b: function(){} },
    doc:   { a: { nodeType: 9 }, b: { nodeType: 9 } },
    elem:  { a: { nodeType: 1 }, b: { nodeType: 1 } }
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
      truthy: [ refs.num, -5, 1.5 ],
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
      truthy: [
        refs.arrays.obj, refs.arrays.arr, refs.arrays.regex, refs.arr, refs.nil
      ],
      falsy: [ refs.arrays.func, refs.arrays.num, refs.arrays.str ]
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
      truthy: [
        refs.maps.obj, refs.maps.arr, refs.maps.regex, refs.obj, refs.nil
      ],
      falsy: [ refs.maps.func, refs.maps.num, refs.maps.str ]
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
        refs.nil, refs.un, false, '', 0, refs.obj, refs.arr,  refs.func, NaN
      ],
      falsy: [ refs.bool, refs.str, refs.num, refs.doc, function(a){}, [ 1 ] ]
    }
  }
};


////////////////////////////////////////////////////////////////////////////////
// RUN THE TESTS
////////////////////////////////////////////////////////////////////////////////

describe('is-main-func', function() {
  forOwn(methods, function(/** !Object */ section, /** string */ sectionName) {
    describe('\n    ' + sectionName, function() {
      forOwn(section, function(/** !Object */ method,/** string */ methodName) {
        describe('is("' + methodName + '", val)', function() {
          it('truthy', function() {
            method.truthy.forEach(function(/** * */ val) {
              assert.strictEqual(true, is(methodName, val));
            });
          });
          it('falsy', function() {
            method.falsy.forEach(function(/** * */ val) {
              assert.strictEqual(false, is(methodName, val));
            });
          });
        });
        if (method.hasOwnProperty('shortcut') && method.shortcut) {
          method.shortcut.split('|').forEach(function(/** string */ shortname) {
            describe('is("' + shortname + '", val)', function() {
              it('truthy', function() {
                method.truthy.forEach(function(/** * */ val) {
                  assert.strictEqual(true, is(shortname, val));
                });
              });
              it('falsy', function() {
                method.falsy.forEach(function(/** * */ val) {
                  assert.strictEqual(false, is(shortname, val));
                });
              });
            });
          });
        }
      });
    });
  });
});
