/**
 * -----------------------------------------------------------------------------
 * TEST: NODE.JS ONLY - ARE METHODS
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
var are = require('../../src/node-are.js').are;
/** @type {!Function<string, function>} */
var vitals = require('../../helpers/vitals');
/** @type {!Object} */
var assert = require('assert');
/** @type {function} */
var forOwn = require('lodash/object/forOwn');


////////////////////////////////////////////////////////////////////////////////
// DEFINE PRIVATE HELPERS
////////////////////////////////////////////////////////////////////////////////

/** @type {!Buffer} */
var buff = vitals.retrieve('./make.js', null);

/** @type {!Object} */
var refs = {
  buff: [ buff, buff ],
  dir:  [ './tests', './tests' ],
  file: [ './make.js', './make.js' ]
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
  file: {
    truthy: [ refs.file ],
    falsy:  [ refs.dir ]
  }
};


////////////////////////////////////////////////////////////////////////////////
// RUN THE TESTS
////////////////////////////////////////////////////////////////////////////////

describe('node-are-methods', function() {
  forOwn(methods, function(/** !Object */ method,/** string */ methodName) {
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
