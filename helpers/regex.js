/**
 * -----------------------------------------------------------------------------
 * REGEX LIBRARY
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2015 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';

require('./vitals')(); // appends helper methods to global obj


////////////////////////////////////////////////////////////////////////////////
// DEFINE REGEX CONSTRUCTOR
////////////////////////////////////////////////////////////////////////////////

/**
 * Creates the Regex object.
 * @constructor
 */
var Regex = function() {

  //////////////////////////////////////////////////////////////////////////
  // PROTECTED PROPERTIES
  //////////////////////////////////////////////////////////////////////

  /**
   * @typedef {!{
   *   org: *,
   *   val: *
   * }} ProtectedProp
   */

  /**
   * @typedef {!Object<string, ProtectedProp>} ProtectedProps
   */

  /**
   * Creates a protected property.
   * @param {*} val
   * @return {ProtectedProp}
   */
  var makeProp = function(val) {
    return {
      org: val,
      val: val
    };
  };

  /**
   * The protected properties for each public method.
   * @type {!{
   *   escape: ProtectedProps,
   *   make:   ProtectedProps
   * }}
   */
  var props = {
    escape: {
      chars: makeProp( /([\*\+\?\.\-\:\{\}\[\]\(\)\/\,\\\^\$\=\!\|])/g )
    },
    make: {}
  };


  //////////////////////////////////////////////////////////////////////////
  // PRIVATE GETTERS & SETTERS
  //////////////////////////////////////////////////////////////////////

  /**
   * @param {string} method
   * @param {string} prop
   * @return {*}
   */
  this._get = function(method, prop) {

    ( has(props, method) && has(props[method], prop) ) || log.error(
      'Failed `Regex` Call',
      'error in private `_get` method',
      { argMap: true, method: method, prop: prop }
    );

    return props[method][prop]['val'];
  };

  /**
   * @param {string} method
   * @param {string} prop
   * @param {*} val
   */
  this._set = function(method, prop, val) {

    ( has(props, method) && has(props[method], prop) ) || log.error(
      'Failed `Regex` Call',
      'error in private `_set` method',
      { argMap: true, method: method, prop: prop, val: val }
    );

    props[method][prop]['val'] = val;
  };

  /**
   * @param {string} method
   * @param {string} prop
   */
  this._reset = function(method, prop) {

    ( has(props, method) && has(props[method], prop) ) || log.error(
      'Failed `Regex` Call',
      'error in private `_reset` method',
      { argMap: true, method: method, prop: prop }
    );

    props[method][prop]['val'] = props[method][prop]['org'];
  };

};

Regex.prototype.constructor = Regex;


////////////////////////////////////////////////////////////////////////////////
// CREATE REGEX INSTANCE
////////////////////////////////////////////////////////////////////////////////

/** @type {!Regex} */
var regex = new Regex();


////////////////////////////////////////////////////////////////////////////////
// DEFINE PUBLIC METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * @param {string} regex
 * @return {string}
 */
Regex.prototype.escape = function(regex) {

  is.str(regex) || log.error(
    'Invalid `Regex.escape` Call',
    'invalid type for `regex` param',
    { argMap: true, regex: regex }
  );

  return regex.replace(this._get('escape', 'chars'), '\\$1');
};

/**
 * @type {!{
 *   get: function(): !RegExp,
 *   set: function(!RegExp),
 *   reset: function
 * }}
 */
Regex.prototype.escape.chars = {

  get: function() {
    return this._get('escape', 'chars');
  }.bind(regex),

  set: function(val) {

    is.regex(val) || log.error(
      'Invalid `Regex.escape.chars.set` Call',
      'invalid type for `val` param',
      { argMap: true, val: val }
    );

    this._set('escape', 'chars', val);
  }.bind(regex),

  reset: function() {
    this._reset('escape', 'chars');
  }.bind(regex)
};

/**
 * @param {string} regex
 * @param {string=} flags - [default= '']
 * @return {!RegExp}
 */
Regex.prototype.make = function(regex, flags) {

  is.str(regex) || log.error(
    'Invalid `Regex.make` Call',
    'invalid type for `regex` param',
    { argMap: true, regex: regex }
  );

  flags = is.str(flags) && /^[gimy]+$/.test(flags) ? flags : '';
  return new RegExp(regex, flags);
};


////////////////////////////////////////////////////////////////////////////////
// EXPORT LIBRARY
////////////////////////////////////////////////////////////////////////////////

module.exports = regex;
