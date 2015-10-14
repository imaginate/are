/**
 * -----------------------------------------------------------------------------
 * RETRIEVE LIBRARY
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2015 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [Lodash]{@link https://github.com/lodash/lodash}
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';

/** @type {Function<string, function>} */
var log = require('./log');
/** @type {Function<string, function>} */
var is = require('./is');
/** @type {!Object} */
var fs = require('fs');


////////////////////////////////////////////////////////////////////////////////
// DEFINE & EXPORT THE FUNCTION
////////////////////////////////////////////////////////////////////////////////

/**
 * @param {string} filepath
 * @return {Buffer}
 */
module.exports = function getBuffer(filepath) {

  is.file(filepath) || log.error(
    'Invalid `getBuffer` Call',
    'invalid `filepath` param (i.e. must be a valid file)',
    { argMap: true, filepath: filepath }
  );

  return fs.readFileSync(filepath);
};
