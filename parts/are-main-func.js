/**
 * -----------------------------------------------------------------------------
 * ARE MAIN FUNCTION
 * -----------------------------------------------------------------------------
 * @version 0.3.2
 * @see [are]{@link https://github.com/imaginate/are/blob/master/parts/are-main-func.js}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2015 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */


// *****************************************************************************
// SECTION: ARE MAIN FUNCTION
// *****************************************************************************

/**
 * @param {string} typeStr - The type string containing the types to check for.
 * @param {*...} vals - The values to evaluate. Must have at least two different
 *   values to evaluate. The values can be provided in a single array or
 *   multiple params.
 * @return {boolean} The evaluation result.
 * @see [main are function docs for more info]{@link https://github.com/imaginate/are/blob/master/docs/are-main-func.md}
 */
function are(typeStr, vals) {

  /** @type {!Array<string>} */
  var types;
  /** @type {string} */
  var nullable;

  if ( !is._str(typeStr) ) {
    throw new TypeError(
      'An are(typeStr, vals) call received a non-string typeStr param'
    );
  }

  vals = arguments.length > 2 ? sliceArr.call(arguments, 1) : vals;

  if ( !is.arr(vals) ) {
    throw new TypeError(
      'An are(typeStr, vals) call did not receive multiple vals to evaluate'
    );
  }

  if ( hasSpecialChar('*', typeStr) ) {
    typeStr !== '*' && typeStr !== 'any' && _log && console.log(
      'Confusing are() Syntax: an asterisk should not be used with other ' +
      'data types as the check will pass regardless of the value\'s type'
    );
    return true;
  }

  types = getValidTypes(typeStr);

  if ( is.str(types) ) {
    throw new Error(
      'Invalid are(typeStr, val) Call: invalid type in the typeStr param; ' +
      'invalid type => ' + types
    );
    return false;
  }

  nullable = getNullable(typeStr);

  return checkVals(types, vals, nullable);
}
