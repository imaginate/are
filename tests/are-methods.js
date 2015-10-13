/**
 * -----------------------------------------------------------------------------
 * TEST: ARE METHODS
 * -----------------------------------------------------------------------------
 * @see [are]{@link https://github.com/imaginate/are/blob/master/parts/are-methods.js}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2015 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
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

/** @type {!Arguments} */
var args = (function(){ return arguments; })();

/** @type {!Object} */
var refs = {
  nil:   [ null, null ],
  un:    [ undefined, undefined ],
  bool:  [ true, false ],
  str:   [ 'str', 'str' ],
  _str:  [ 'str', '', 'str' ],
  num:   [ 1, 5, -5, 1.5 ],
  _num:  [ 1, 5, 0, -5, 1.5 ],
  obj:   [ {}, {} ],
  arr:   [ [], [] ],
  regex: [ /1/, /t/g ],
  func:  [ function(){}, function(){} ],
  args:  [ args, args ],
  doc:   [ { nodeType: 9 }, { nodeType: 9 } ],
  elem:  [ { nodeType: 1 }, { nodeType: 1 } ]
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
      falsy:  [ refs.obj, refs.nil, refs.str, refs.arr ]
    },
    boolean: {
      shortcut: 'bool',
      truthy: [ refs.bool ],
      falsy:  [ refs.obj, refs._str, refs.num, refs.str, refs.nil ]
    },
    string: {
      shortcut: 'str',
      truthy: [ refs._str, refs.str ],
      falsy:  [ refs.num, refs.bool, refs.obj ]
    },
    _string: {
      shortcut: '_str',
      truthy: [ refs.str ],
      falsy:  [ refs._str, refs.num, refs.bool, refs.obj ]
    },
    number: {
      shortcut: 'num',
      truthy: [ refs._num, refs.num ],
      falsy:  [ refs._str, refs.bool, refs.obj, refs.str ]
    },
    _number: {
      shortcut: '_num',
      truthy: [ refs.num ],
      falsy:  [ refs._num, refs._str, refs.bool, refs.obj, refs.str ]
    }
  },
  js_objects: {
    object: {
      shortcut: 'obj',
      truthy: [ refs.obj, refs.arr, refs.regex ],
      falsy:  [ refs.func, refs.nil, refs.str ]
    },
    _object: {
      shortcut: '_obj',
      truthy: [ refs.func, refs.obj, refs.arr, refs.regex ],
      falsy:  [ refs.nil, refs.str, refs.num ]
    },
    function: {
      shortcut: 'fn|func',
      truthy: [ refs.func ],
      falsy:  [ refs.nil, refs.obj, refs.bool ]
    },
    array: {
      shortcut: 'arr',
      truthy: [ refs.arr ],
      falsy:  [ refs.obj, refs.regex, refs.nil, refs.args ]
    },
    _array: {
      shortcut: '_arr',
      truthy: [ refs.arr, refs.args ],
      falsy:  [ refs.obj, refs.regex, refs.nil ]
    },
    regexp: {
      shortcut: 'regex',
      truthy: [ refs.regex ],
      falsy:  [ refs.obj, refs.bool, refs.nil, refs.arr ]
    },
    args: {
      truthy: [ refs.args ],
      falsy:  [ refs.obj, refs.regex, refs.nil, refs.arr ]
    }
  },
  dom_objects: {
    document: {
      shortcut: 'doc',
      truthy: [ refs.doc ],
      falsy:  [ refs.obj, refs.elem, refs.str ]
    },
    element: {
      shortcut: 'elem',
      truthy: [ refs.elem ],
      falsy:  [ refs.doc, refs.obj, refs.num ]
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
  }
};


////////////////////////////////////////////////////////////////////////////////
// RUN THE TESTS
////////////////////////////////////////////////////////////////////////////////

describe('are-methods', function() {
  forOwn(methods, function(/** !Object */ section, /** string */ sectionName) {
    describe('\n    ' + sectionName, function() {
      forOwn(section, function(/** !Object */ method,/** string */ methodName) {
        describe('are.' + methodName, function() {
          describe('truthy', function() {
            method.truthy.forEach(
              function(/** !Array<*> */ vals, /** number */ i) {
                it(i, function() {
                  assert.strictEqual(true, are[methodName](vals));
                  assert.strictEqual(true, are[methodName].apply(null, vals));
                });
              }
            );
          });
          describe('falsy', function() {
            method.falsy.forEach(
              function(/** !Array<*> */ vals, /** number */ i) {
                it(i, function() {
                  assert.strictEqual(false, are[methodName](vals));
                  assert.strictEqual(false, are[methodName].apply(null, vals));
                });
              }
            );
          });
        });
        if (method.hasOwnProperty('shortcut') && method.shortcut) {
          method.shortcut.split('|').forEach(function(/** string */ shortname) {
            describe('are.' + shortname, function() {
              describe('truthy', function() {
                method.truthy.forEach(
                  function(/** !Array<*> */ vals, /** number */ i) {
                    it(i, function() {
                      assert.strictEqual(true, are[shortname](vals));
                      assert.strictEqual(true, are[shortname].apply(null,vals));
                    });
                  }
                );
              });
              describe('falsy', function() {
                method.falsy.forEach(
                  function(/** !Array<*> */ vals, /** number */ i) {
                    it(i, function() {
                      assert.strictEqual(false, are[shortname](vals));
                      assert.strictEqual(false,are[shortname].apply(null,vals));
                    });
                  }
                );
              });
            });
          });
        }
      });
    });
  });
});
