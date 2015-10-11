/**
 * -----------------------------------------------------------------------------
 * IS MAIN FUNCTION
 * -----------------------------------------------------------------------------
 * @version 0.0.1
 * @see [is]{@link https://github.com/imaginate/are/blob/master/parts/is-main-func.js}
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2015 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */


// *****************************************************************************
// SECTION: IS MAIN FUNCTION
// *****************************************************************************

/**
 * @param {string} typeStr - The type string containing the types to check for.
 * @param {*} val - The value to evaluate.
 * @return {boolean} The evaluation result.
 * @see [main is function docs for more info]{@link https://github.com/imaginate/are/blob/master/docs/is-main-func.md}
 */
function is(typeStr, val) {

  /** @type {!Array<string>} */
  var types;

  if ( !is._str(typeStr) ) {
    throw new TypeError(
      'An is(typeStr, val) call received a non-string typeStr param'
    );
  }

  if ( hasSpecialChar('*', typeStr) ) {
    typeStr !== '*' && typeStr !== 'any' && _log && console.log(
      'Confusing is() Syntax: an asterisk should not be used with other ' +
      'data types as the check will pass regardless of the value\'s type'
    );
    return true;
  }

  types = getValidTypes(typeStr);

  if ( is.str(types) ) {
    throw new Error(
      'Invalid is(typeStr, val) Call: invalid type in the typeStr param; ' +
      'invalid type => ' + types
    );
    return false;
  }

  setNullableOverride(typeStr);

  return checkVal(types, val);
}
