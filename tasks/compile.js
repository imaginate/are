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
// DEFINE & EXPORT THE TASK
////////////////////////////////////////////////////////////////////////////////

/** @type {!Task} */
module.exports = newTask('compile', 'are-nodeAre', {

  are: function are() {

    /** @type {string} */
    var contents;
    /** @type {string} */
    var parts;

    contents = getFileIntro('src/are.js');
    contents += getFile('parts/export.js');

    parts = 'main-func-helpers is-main-func are-main-func ';
    parts += 'is-methods are-methods';

    each(parts.split(' '), function(/** string */ filename) {
      contents = insertFile(contents, filename);
    });
    contents.to('src/are.js');

    log.pass('Completed `compile.are` Task');
  },

  nodeAre: function nodeAre() {

    /** @type {string} */
    var contents;
    /** @type {string} */
    var parts;

    contents = getFileIntro('src/node-are.js');
    contents += getFile('parts/node-export.js');

    parts = 'main-func-helpers is-main-func are-main-func ';
    parts += 'is-methods are-methods node-methods';

    each(parts.split(' '), function(/** string */ filename) {
      contents = insertFile(contents, filename);
    });
    contents.to('src/node-are.js');

    log.pass('Completed `compile.nodeAre` Task');
  }
});


////////////////////////////////////////////////////////////////////////////////
// DEFINE PRIVATE HELPERS
////////////////////////////////////////////////////////////////////////////////

/**
 * @param {string} filepath
 * @return {string}
 */
function getFile(filepath) {
  return retrieve.file(filepath) // get file contents
    .replace(/\r\n?/g, '\n') // normalize line breaks
    .replace(/^\/\*[\s\S]*?\*\/\n\n/, ''); // strip intro
}

/**
 * @param {string} contents
 * @param {string} filename
 * @return {string}
 */
function insertFile(contents, filename) {
  filename += '.js';
  return contents.replace(
    new RegExp('  \\/\\/ INSERT ' + filename.replace(/\./g, '\\.') + '\\n'),
    getFile('parts/' + filename)
  );
}

/**
 * @param {string} filepath
 * @return {string}
 */
function getFileIntro(filepath) {
  return retrieve.file(filepath) // get file contents
    .replace(/\r\n?/g, '\n') // normalize line breaks
    .replace(/^(\/\*[\s\S]*?\*\/\n)[\s\S]*$/, '$1'); // get file intro
}
