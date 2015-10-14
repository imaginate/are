/**
 * -----------------------------------------------------------------------------
 * MAKE TASK: compile
 * -----------------------------------------------------------------------------
 * @file Use `$ node make compile` to access this file.
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2015 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';


////////////////////////////////////////////////////////////////////////////////
// DEFINE THE TASK METHODS
////////////////////////////////////////////////////////////////////////////////

/** @type {!Object<string, function>} */
var methods = {};

/** @type {function} */
methods.are = function() {

  /** @type {string} */
  var fileIntro;
  /** @type {string} */
  var contents;
  /** @type {!Array<string>} */
  var inserts;
  /** @type {!RegExp} */
  var regex;

  contents = retrieve.file('parts/export.js')
               .replace(/\r\n?/g, '\n')
               .replace(/^\/\*[\s\S]*?\*\//, '');
  inserts = (
    'main-func-helpers is-main-func are-main-func is-methods are-methods'
  ).split(' ');

  regex = /  \/\/ INSERT ([a-z-]+\.js)\n/g;
  each(inserts, function(/** string */ filename) {
    filename += '.js';
    contents = contents.replace(regex,
      function(/** string */ match, /** string */ insertname) {
        return ( insertname === filename ?
          retrieve.file('parts/' + filename)
            .replace(/\r\n?/g, '\n')
            .replace(/^\/\*[\s\S]*?\*\/\n\n/, '')
          : match
        );
      }
    );
  });

  fileIntro = retrieve.file('src/are.js')
    .replace(/\r\n?/g, '\n')
    .replace(/^(\/\*[\s\S]*?\*\/\n)[\s\S]*$/, '$1');

  (fileIntro + contents).to('src/are.js');

  log.pass('Completed `compile.are` Task');
};

/** @type {function} */
methods.nodeAre = function() {

  /** @type {string} */
  var fileIntro;
  /** @type {string} */
  var contents;
  /** @type {!Array<string>} */
  var inserts;
  /** @type {!RegExp} */
  var regex;

  contents = retrieve.file('parts/node-export.js')
               .replace(/\r\n?/g, '\n')
               .replace(/^\/\*[\s\S]*?\*\//, '');
  inserts = (
    'main-func-helpers is-main-func are-main-func is-methods are-methods ' +
    'node-methods'
  ).split(' ');

  regex = /  \/\/ INSERT ([a-z-]+\.js)\n/g;
  each(inserts, function(/** string */ filename) {
    filename += '.js';
    contents = contents.replace(regex,
      function(/** string */ match, /** string */ insertname) {
        return ( insertname === filename ?
          retrieve.file('parts/' + filename)
            .replace(/\r\n?/g, '\n')
            .replace(/^\/\*[\s\S]*?\*\/\n\n/, '')
          : match
        );
      }
    );
  });

  fileIntro = retrieve.file('src/node-are.js')
    .replace(/\r\n?/g, '\n')
    .replace(/^(\/\*[\s\S]*?\*\/\n)[\s\S]*$/, '$1');

  (fileIntro + contents).to('src/node-are.js');

  log.pass('Completed `compile.nodeAre` Task');
};


////////////////////////////////////////////////////////////////////////////////
// EXPORT THE TASK
////////////////////////////////////////////////////////////////////////////////

/** @type {!Task} */
module.exports = makeTask('compile', 'are-nodeAre', methods);
