/**
 * -----------------------------------------------------------------------------
 * TEST: NODE.JS ONLY - IS METHODS
 * -----------------------------------------------------------------------------
 * @see [node methods]{@link https://github.com/imaginate/are/blob/master/parts/node-methods.js}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2015 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

/** @type {function} */
var is = require('../../src/node-are.js').is;
/** @type {function} */
var getBuffer = require('../../helpers/get-buffer.js');
/** @type {!Object} */
var assert = require('assert');
/** @type {function} */
var forOwn = require('lodash/object/forOwn');


////////////////////////////////////////////////////////////////////////////////
// DEFINE PRIVATE HELPERS
////////////////////////////////////////////////////////////////////////////////

/** @type {!Object} */
var refs = {
  arr:   [],
  buff:  getBuffer('./make.js', null),
  dir:   './tests',
  dirs:  [ './tests', './tests' ],
  file:  './make.js',
  files: [ './make.js', './make.js' ]
};

/** @type {!Object<string, !Object>} */
var methods = {
  buffer: {
    shortcut: 'buff',
    truthy: [ refs.buff ],
    falsy:  [ refs.dir ]
  },
  directory: {
    shortcut: 'dir',
    truthy: [ refs.dir ],
    falsy:  [ refs.file ]
  },
  directories: {
    shortcut: 'directorys|dirs',
    truthy: [ refs.dirs, refs.arr ],
    falsy:  [ refs.files ]
  },
  file: {
    truthy: [ refs.file ],
    falsy:  [ refs.dir ]
  },
  files: {
    truthy: [ refs.files, refs.arr ],
    falsy:  [ refs.dirs ]
  }
};


////////////////////////////////////////////////////////////////////////////////
// RUN THE TESTS
////////////////////////////////////////////////////////////////////////////////

describe('is-methods (node-only)', function() {
  forOwn(methods, function(/** !Object */ method,/** string */ methodName) {
    describe('is.' + methodName, function() {
      describe('truthy', function() {
        method.truthy.forEach(function(/** * */ val, /** number */ i) {
          it(i, function() {
            assert.strictEqual(true, is[methodName](val));
          });
        });
      });
      describe('falsy', function() {
        method.falsy.forEach(function(/** * */ val, /** number */ i) {
          it(i, function() {
            assert.strictEqual(false, is[methodName](val));
          });
        });
      });
    });
    if (method.hasOwnProperty('shortcut') && method.shortcut) {
      method.shortcut.split('|').forEach(function(/** string */ shortname) {
        describe('is.' + shortname, function() {
          describe('truthy', function() {
            method.truthy.forEach(function(/** * */ val, /** number */ i) {
              it(i, function() {
                assert.strictEqual(true, is[shortname](val));
              });
            });
          });
          describe('falsy', function() {
            method.falsy.forEach(function(/** * */ val, /** number */ i) {
              it(i, function() {
                assert.strictEqual(false, is[shortname](val));
              });
            });
          });
        });
      });
    }
  });
});
