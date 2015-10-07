/**
 * -----------------------------------------------------------------------------
 * MAKE TASK: compile
 * -----------------------------------------------------------------------------
 * @file Use `$ node make compile` to access this file.
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2015 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';

require('../node_helpers/vitals')(); // appends helpers to global obj

/** @type {function} */
var makeTask = require('../node_helpers/task');


////////////////////////////////////////////////////////////////////////////////
// DEFINE THE TASK METHODS
////////////////////////////////////////////////////////////////////////////////

/** @type {!Object<string, function>} */
var methods = {};

/** @type {function} */
methods.are = function() {

  /** @type {string} */
  var contents;
  /** @type {!Array<string>} */
  var inserts;
  /** @type {!RegExp} */
  var regex;

  contents = retrieve('parts/export.js')
               .replace(/\r\n?/g, '\n')
               .replace(/^\/\*[\s\S]*?\*\//, '');
  inserts = 'is-main-func is-methods are-main-func are-methods'.split(' ');

  regex = /  \/\/ INSERT ([a-z-]+\.js)\n/g;
  each(inserts, function(/** string */ filename) {
    filename += '.js';
    contents = contents.replace(regex,
      function(/** string */ match, /** string */ insertname) {
        return ( insertname === filename ?
          retrieve('parts/' + filename)
            .replace(/\r\n?/g, '\n')
            .replace(/^\/\*[\s\S]*?\*\//, '')
          : match
        );
      }
    );
  });

  retrieve('src/are.js')
    .replace(/\r\n?/g, '\n')
    .replace(/^(\/\*[\s\S]*?\*\/\n)[\s\S]*$/, '$1' + contents)
    .to('src/are.js');

  log.pass('Completed `compile.are` Task');
};


////////////////////////////////////////////////////////////////////////////////
// EXPORT THE TASK
////////////////////////////////////////////////////////////////////////////////

/** @type {!Task} */
module.exports = makeTask('compile', 'are', methods);