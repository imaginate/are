/**
 * -----------------------------------------------------------------------------
 * LOG LIBRARY
 * -----------------------------------------------------------------------------
 * @author Adam Smith adam@imaginate.life
 * @copyright 2015 Adam A Smith adam@imaginate.life
 * Supporting Libraries:
 * @see [Lodash]{@link https://github.com/lodash/lodash}
 * @see [Colors]{@link https://www.npmjs.com/package/colors}
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';

/** @type {!Object<string, function>} */
var is = require('./is');
/** @type {!Object} */
var colors = require('colors');
/** @type {function} */
var fill = require('lodash/array/fill');
/** @type {function} */
var merge = require('lodash/object/merge');
/** @type {function} */
var forOwn = require('lodash/object/forOwn');
/** @type {function} */
var sliceArr = require('lodash/array/slice');


////////////////////////////////////////////////////////////////////////////////
// SET THEMES
////////////////////////////////////////////////////////////////////////////////

/**
 * @type {!{
 *   error: !Array<string>,
 *   warn:  !Array<string>,
 *   pass:  !Array<string>,
 *   debug: !Array<string>,
 *   plain: string,
 *   view:  string,
 *   fail:  string
 * }}
 */
var themes = {
  error: [ 'white', 'bold', 'bgRed' ],
  warn:  [ 'white', 'bold', 'bgYellow' ],
  pass:  [ 'white', 'bold', 'bgGreen' ],
  debug: [ 'white', 'bold', 'bgBlue' ],
  plain: 'white',
  view:  'cyan',
  fail:  'red'
};

colors.setTheme(merge(themes, {
  // accent settings for each theme
  aerror: [ 'yellow', 'bold', 'bgRed' ],
  awarn:  [ 'blue', 'bold', 'bgYellow' ],
  apass:  [ 'yellow', 'bold', 'bgGreen' ],
  adebug: [ 'magenta', 'bold', 'bgBlue' ],
  aplain: 'magenta',
  aview:  'magenta',
  afail:  'yellow'
}));


////////////////////////////////////////////////////////////////////////////////
// DEFINE LOG METHODS & CONFIGS
////////////////////////////////////////////////////////////////////////////////

/**
 * @param {*...} args
 * @return {boolean}
 */
function Log() {

  if (!arguments.length) {
    Log.error('Invalid `Log` Call', 'no arguments given');
    return false;
  }

  logSpace(Log.config.spaceBefore);
  log(Log.config.style, sliceArr(arguments));
  logSpace(Log.config.spaceAfter);
  return true;
}

/**
 * @type {!{
 *   spaceBefore: number,
 *   spaceAfter: number,
 *   style: string
 * }}
 */
Log.config = {
  style: 'plain',
  spaceBefore: 1,
  spaceAfter:  1
};

/**
 * @param {string} header
 * @param {*...=} args
 * @return {boolean}
 */
Log.pass = function(header) {

  if ( !is.str(header) ) {
    Log.error(
      'Invalid `Log.pass` Call',
      'invalid type for `header` param',
      { argMap: true, header: header }
    );
    return false;
  }

  logSpace(Log.pass.config.spaceBefore);
  logHeader('pass', header);
  arguments.length > 1 && logSpace(1) && log('view', sliceArr(arguments, 1));
  logSpace(Log.pass.config.spaceAfter);
  return true;
};

/**
 * @type {!{
 *   spaceBefore: number,
 *   spaceAfter: number
 * }}
 */
Log.pass.config = {
  spaceBefore: 1,
  spaceAfter:  1
};

/**
 * @param {string} header
 * @param {string} msg
 * @param {*...=} args
 * @return {boolean}
 */
Log.error = function(header, msg) {

  if ( !is.str(header) || !is.str(msg) ) {
    Log.error(
      'Invalid `Log.error` Call',
      'invalid type for `header` or `msg` param',
      { argMap: true, header: header, msg: msg }
    );
    return false;
  }

  logSpace(Log.error.config.spaceBefore);
  logHeader('error', header);
  logDetails('plain', msg);
  arguments.length > 2 && logSpace(1) && log('view', sliceArr(arguments, 2));
  logSpace(Log.error.config.spaceAfter);
  Log.error.config.exit && process.exit(1);
  return true;
};

/**
 * @type {!{
 *   spaceBefore: number,
 *   spaceAfter: number,
 *   exit: boolean
 * }}
 */
Log.error.config = {
  spaceBefore: 1,
  spaceAfter:  1,
  exit: true
};

/**
 * @param {string} header
 * @param {string} msg
 * @param {*...=} args
 * @return {boolean}
 */
Log.warn = function(header, msg) {

  if ( !is.str(header) || !is.str(msg) ) {
    Log.error(
      'Invalid `Log.warn` Call',
      'invalid type for `header` or `msg` param',
      { argMap: true, header: header, msg: msg }
    );
    return false;
  }

  logSpace(Log.warn.config.spaceBefore);
  logHeader('warn', header);
  logDetails('plain', msg);
  arguments.length > 2 && logSpace(1) && log('view', sliceArr(arguments, 2));
  logSpace(Log.warn.config.spaceAfter);
  return true;
};

/**
 * @type {!{
 *   spaceBefore: number,
 *   spaceAfter: number
 * }}
 */
Log.warn.config = {
  spaceBefore: 1,
  spaceAfter:  1
};

/**
 * @param {string} header
 * @param {*...=} args
 * @return {boolean}
 */
Log.debug = function(header) {

  if ( !is.str(header) ) {
    Log.error(
      'Invalid `Log.debug` Call',
      'invalid type for `header` param',
      { argMap: true, header: header }
    );
    return false;
  }

  logSpace(Log.debug.config.spaceBefore);
  logHeader('debug', header);
  arguments.length > 1 && logSpace(1) && log('view', sliceArr(arguments, 1));
  logSpace(Log.debug.config.spaceAfter);
  return true;
};

/**
 * @type {!{
 *   spaceBefore: number,
 *   spaceAfter: number
 * }}
 */
Log.debug.config = {
  spaceBefore: 1,
  spaceAfter:  1
};

/**
 * @param {string} msg
 * @param {*...=} args
 * @return {boolean}
 */
Log.fail = function(msg) {

  if ( !is.str(msg) ) {
    Log.error(
      'Invalid `Log.fail` Call',
      'invalid type for `msg` param',
      { argMap: true, msg: msg }
    );
    return false;
  }

  logSpace(Log.fail.config.spaceBefore);
  logHeader('fail', msg);
  arguments.length > 1 && log('fail', sliceArr(arguments, 1));
  logSpace(Log.fail.config.spaceAfter);
  return true;
};

/**
 * @type {!{
 *   spaceBefore: number,
 *   spaceAfter: number
 * }}
 */
Log.fail.config = {
  spaceBefore: 1,
  spaceAfter:  1
};


////////////////////////////////////////////////////////////////////////////////
// DEFINE GENERAL HELPERS
////////////////////////////////////////////////////////////////////////////////

/**
 * @param {string} func
 * @param {string} arg
 * @param {*} val
 */
function helperError(func, arg, val) {
  console.log('');
  console.log('Invalid '.error + func.aerror + ' Call in '.error +
              'Log'.aerror + ' Library          '.error);
  console.log('  - invalid '.plain + arg.aplain + ' param'.plain);
  console.log('');
  console.log(arg.plain + ': '.plain + String(val).view);
  process.exit(1);
}

/**
 * @param {*} val
 * @return {string}
 */
function makeStr(val) {
  return ( is.str(val, true) ?
    val || '""' : is.func(val) ?
      'function() { ... } props => {' : is.arr(val) ?
        '[ '+ val.join(', ') +' ]' : is.regex(val) ?
          '/'+ val.source +'/'+ val.flags : is.obj(val) ?
            '{' : String(val)
  );
}

/**
 * @param {string} str
 * @return {boolean}
 */
function hasAccent(str) {
  is.str(str) || helperError('hasAccent', 'str', str);
  return /`.+`/.test(str);
}


////////////////////////////////////////////////////////////////////////////////
// DEFINE LOG HELPERS
////////////////////////////////////////////////////////////////////////////////

/**
 * @param {string} style
 * @param {!Array} args
 */
function log(style, args) {
  is.str(style) || helperError('log', 'style', style);
  themes.hasOwnProperty(style) || helperError('log', 'style', style);
  is.arr(args) || helperError('log', 'args', args);
  args.forEach(function(/** * */ val) {
    if ( is.func(val) || ( is.obj(val) && !is.regex(val) && !is.arr(val) ) ) {
      val.argMap ? logArgs(val) : logObj(val, style);
    }
    else {
      console.log(is.str(val) && hasAccent(val) ?
        val.split('`').map(function(/** string */ part, /** number */ i) {
          return part[ (i % 2 ? 'a' : '') + style ];
        }).join('')
        : makeStr(val)[style]
      );
    }
  });
}

/**
 * @param {number} spaces
 * @return {boolean}
 */
function logSpace(spaces) {
  is.num(spaces, true) || helperError('logSpace', 'spaces', spaces);
  while (spaces--) {
    console.log('');
  }
  return true;
}

/**
 * @param {string} style
 * @param {string} msg
 */
function logHeader(style, msg) {
  is.str(style) || helperError('logHeader', 'style', style);
  themes.hasOwnProperty(style) || helperError('logHeader', 'style', style);
  is.str(msg) || helperError('logHeader', 'msg', msg);
  msg = hasAccent(msg) ? msg.split('`').map(
    function(/** string */ part, /** number */ i) {
      return part[ (i % 2 ? 'a' : '') + style ];
    }
  ).join('') : msg[style];
  console.log(' '[style] + msg + '        '[style]);
}

/**
 * @param {string} style
 * @param {string} msg
 */
function logDetails(style, msg) {
  is.str(style) || helperError('logDetails', 'style', style);
  themes.hasOwnProperty(style) || helperError('logDetails', 'style', style);
  is.str(msg) || helperError('logDetails', 'msg', msg);
  msg = hasAccent(msg) ? msg.split('`').map(
    function(/** string */ part, /** number */ i) {
      return part[ (i % 2 ? 'a' : '') + style ];
    }
  ).join('') : msg[style];
  console.log('  - '[style] + msg);
}

/**
 * @param {!Object} obj
 */
function logArgs(obj) {
  ( is.obj(obj) || is.func(obj) ) || helperError('logArgs', 'obj', obj);

  forOwn(obj, function(/** * */ val, /** string */ key) {

    /** @type {string} */
    var str;

    if (key !== 'argMap') {
      str = makeStr(val);
      console.log(key.plain + ': '.plain + str.view);
      if (is.func(val) || str === '{') {
        logObj(val, 'view', -1);
      }
    }
  });
}

/**
 * @param {!Object} obj
 * @param {string=} style
 * @param {number=} indent
 */
function logObj(obj, style, indent) {

  /** @type {string} */
  var spaces;

  ( is.obj(obj) || is.func(obj) ) || helperError('logObj', 'obj', obj);

  style = is.str(style) && themes.hasOwnProperty(style) ? style : 'view';

  indent = is.num(indent) ? indent : 0;
  indent || console.log(
    (is.func(obj) ? 'function() { ... } props => {' : '{')[style]
  );
  indent = indent < 0 ? 0 : indent;

  spaces = indent ? fill(Array(indent), '  ').join('') : '';

  forOwn(obj, function(/** * */ val, /** string */ key) {

    /** @type {string} */
    var str = makeStr(val);

    
    if (is.func(val) || str === '{') {
      console.log( ('  ' + spaces + key + ': ' + str)[style] );
      logObj(val, style, (indent + 1));
    }
    else {
      console.log( ('  ' + spaces + key + ': ' + str + ',')[style] );
    }
  });
  console.log( (spaces + '}' + (indent ? ',' : ''))[style] );
}


////////////////////////////////////////////////////////////////////////////////
// EXPORT LIBRARY
////////////////////////////////////////////////////////////////////////////////

module.exports = Log;
