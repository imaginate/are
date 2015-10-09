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
 * @param {string} type - A string of the data types to check for.
 * @param {*} val - The value to be evaluated.
 * @return {boolean} The evaluation result.
 * @see [main is function docs for more info]{@link https://github.com/imaginate/are/blob/master/docs/is-main-func.md}
 */
function is(type, val) {

  /** @type {!Array<string>} */
  var types;
  /** @type {number} */
  var i;

  if ( !is._str(type) ) {
    throw new TypeError(
      'An is(type, val) call received a non-string type param'
    );
  }

  types = type.toLowerCase()
    .replace(_regexps.charBloat, '')
    .split('|');

  // check each type in the type string
  i = types.length;
  while (i--) {
    if ( !_test.allTypes( types[i] ) ) {
      throw new Error(
        'An is(type, val) call received an invalid data type within the ' +
        'type param; invalid type => ' + types[i]
      );
      return false;
    }
  }

  // check for automatic pass ('*' = any value)
  if ( _test.any(type) ) {
    type.length > 1 && _log && console.log(
      'Confusing is() Syntax: an asterisk should not be used with other ' +
      'data types as the check will pass regardless of the value\'s type'
    );
    return true;
  }

  // check for an optional value ('=' = undefined)
  if ( is.undefined(val) && _test.undefined(type) ) {
    return true;
  }

  // check for a nullable override ('!' = non-nullable) ('?' = nullable)
  if ( is.null(val) && _isNullOverride(type) ) {
    return _isNullable(type);
  }

  return is.null(val) ? _checkEachNull(types) : _checkEachType(val, types);
}
