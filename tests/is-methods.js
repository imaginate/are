/**
 * -----------------------------------------------------------------------------
 * TEST: IS METHODS
 * -----------------------------------------------------------------------------
 * @see [is]{@link https://github.com/imaginate/are/blob/master/parts/is-methods.js}
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
  _bool: false,
  str:   'string',
  _str:  '',
  num:   5,
  _num:  0,
  obj:   {},
  arr:   [],
  regex: /1/,
  func:  function(){},
  doc:   { nodeType: 9 },
  elem:  { nodeType: 1 }
};

/** @type {!Object<string, !Object>} */
var methods = {
  primitives: {
    null: {
      truthy: [ refs.nil ],
      falsey: [ refs.obj, refs.bool, refs.str, refs.arr ]
    },
    undefined: {
      truthy: [ refs.un ],
      falsey: [ refs.obj, refs.nil, refs.str, refs.arr, refs._bool ]
    },
    boolean: {
      shortcut: 'bool',
      truthy: [ refs.bool, refs._bool ],
      falsey: [ refs.obj, refs._str, refs.num, refs.str, refs.nil ]
    },
    string: {
      shortcut: 'str',
      truthy: [ refs._str, refs.str ],
      falsey: [ refs.num, refs._bool, refs.obj ]
    },
    number: {
      shortcut: 'num',
      truthy: [ refs._num, refs.num, -5, 1.5 ],
      falsey: [ refs._str, refs.bool, refs.obj, refs.str ]
    }
  },
  js_objects: {
    object: {
      shortcut: 'obj',
      truthy: [ refs.obj, refs.arr, refs.regex ],
      falsey: [ refs.func, refs.nil, refs.str ]
    },
    function: {
      shortcut: 'func',
      truthy: [ refs.func ],
      falsey: [ refs.nil, refs.obj, refs.bool ]
    },
    array: {
      shortcut: 'arr',
      truthy: [ refs.arr ],
      falsey: [ refs.obj, refs.regex, refs.nil ]
    },
    regexp: {
      shortcut: 'regex',
      truthy: [ refs.regex ],
      falsey: [ refs.obj, refs._bool, refs.bool, refs.nil, refs.arr ]
    }
  },
  dom_objects: {
    document: {
      shortcut: 'doc',
      truthy: [ refs.doc ],
      falsey: [ refs.obj, refs.elem, refs.str ]
    },
    element: {
      shortcut: 'elem',
      truthy: [ refs.elem ],
      falsey: [ refs.doc, refs.obj, refs.num ]
    }
  }
};


////////////////////////////////////////////////////////////////////////////////
// RUN THE TESTS
////////////////////////////////////////////////////////////////////////////////

describe('is-methods', function() {
  forOwn(methods, function(/** !Object */ section, /** string */ sectionName) {
    describe('\n    ' + sectionName, function() {
      forOwn(section, function(/** !Object */ method,/** string */ methodName) {
        describe('is.' + methodName, function() {
          it('truthy', function() {
            method.truthy.forEach(function(/** * */ val) {
              assert.strictEqual(true, is[methodName](val));
            });
          });
          it('falsey', function() {
            method.falsey.forEach(function(/** * */ val) {
              assert.strictEqual(false, is[methodName](val));
            });
          });
        });
        if (method.hasOwnProperty('shortcut') && method.shortcut) {
          describe('is.' + method.shortcut, function() {
            it('truthy', function() {
              method.truthy.forEach(function(/** * */ val) {
                assert.strictEqual(true, is[method.shortcut](val));
              });
            });
            it('falsey', function() {
              method.falsey.forEach(function(/** * */ val) {
                assert.strictEqual(false, is[method.shortcut](val));
              });
            });
          });
        }
      });
    });
  });
});
