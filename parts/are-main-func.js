/**
 * -----------------------------------------------------------------------------
 * ARE MAIN FUNCTION
 * -----------------------------------------------------------------------------
 * @version 0.0.1
 * @see [are]{@link https://github.com/imaginate/are/blob/master/parts/are-main-func.js}
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2015 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */


// *****************************************************************************
// SECTION: ARE MAIN FUNCTION
// *****************************************************************************

/**
 * @param {string} type - A string of the data types to check for.
 * @param {*...} vals - The values to be evaluated.
 * @return {boolean} The evaluation result.
 * @see [main are function docs for more info]{@link https://github.com/imaginate/are/blob/master/docs/are-main-func.md}
 */
function are(type) {

  /** @type {!Array<string>} */
  var types;
  /** @type {!Array<*>} */
  var vals;
  /** @type {*} */
  var val;
  /** @type {number} */
  var i;

  if ( !is._str(type) ) {
    throw new TypeError(
      'An are(type, vals) call received a non-string type param'
    );
  }

  vals = arguments.length > 2 ? _sliceArr.call(arguments, 1) : arguments[1];

  if ( !is.arr(vals) ) {
    throw new TypeError(
      'An are(type, vals) call did not receive multiple vals to evaluate'
    );
  }

  // check for automatic pass ('*' = any value)
  if ( _test.any(type) ) {
    type !== '*' && type !== 'any' && _log && console.log(
      'Confusing are() Syntax: an asterisk should not be used with other ' +
      'data types as the check will pass regardless of the value\'s type'
    );
    return true;
  }

  types = type.toLowerCase()
    .replace(_regexps.charBloat, '')
    .split('|');

  // check each type in the type string
  i = types.length;
  while (i--) {
    if ( !_test.allTypes( types[i] ) ) {
      throw new Error(
        'An are(type, vals) call received an invalid data type within the ' +
        'type param; invalid type => ' + types[i]
      );
      return false;
    }
  }

  // check for undefined and null special chars
  _test.undefined(type) && types.push('undefined');
  _isNullOverride(type) && _isNullable(type) && types.push('null');

  // check all of the values
  while (i--) {
    if ( !_checkEachType(vals[i], types) ) {
      return false;
    }
  }
  return true;
}
