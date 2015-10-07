/**
 * -----------------------------------------------------------------------------
 * MAKEFILE
 * -----------------------------------------------------------------------------
 * @file Use `$ node make <task>[-opt/arg][-opt/arg] ...` to execute make tasks.
 *   Tasks are executed in the order given. Tasks may be repeated. You may view
 *   each tasks source code in the "tasks" directory as "taskname.js".
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2015 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

/*
 * -----------------------------------------------------------------------------
 * MAKE SHORTCUTS
 * -----------------------------------------------------------------------------
 * `$ node make` => `$node make dev`
 * `$ node make dev` => `$ node make compile`
 * `$ node make live` => `$ node make dev minify`
 * `$ node make production` => `$ node make live`
 */

/*
 * -----------------------------------------------------------------------------
 * MAKE TASKS
 * -----------------------------------------------------------------------------
 * | Task    | Opts/Args  | Default Args |
 * | :------ | :--------- | :----------- |
 * | compile | are        | are          |
 * | minify  | js         | js           |
 * ---------------------------------------
 */

'use strict';

require('./helpers/vitals'); // appends helpers to global obj


////////////////////////////////////////////////////////////////////////////////
// MAKEFILE CONFIG
////////////////////////////////////////////////////////////////////////////////

/** @type {string} */
var taskDir = './tasks';


////////////////////////////////////////////////////////////////////////////////
// PARSE THE COMMAND ARGS
////////////////////////////////////////////////////////////////////////////////

/** @type {!Object<string, string>} */
var shortcuts;
/** @type {!Array<string>} */
var tasks;

shortcuts = {
  dev: 'compile',
  live: 'dev minify'
};
shortcuts.production = shortcuts.live;

tasks = ( process.argv.length > 2 ?
  process.argv
    .slice(2)
    .join(' ')
    .replace(/--/g, '')
    .replace(/-/g, '_')
    .replace(/\b([a-z]+)\b/gi, function(/** string */ match,/** string */ task){
      return has(shortcuts, task) ? shortcuts[task] : match;
    })
    .replace(/_/g, '-')
  : shortcuts.dev
).split(' ');


////////////////////////////////////////////////////////////////////////////////
// RUN THE TASKS
////////////////////////////////////////////////////////////////////////////////

taskDir = taskDir ? taskDir.replace(/([^\/])\/$/, '$1') : './tasks';
is.dir(taskDir) || log.error(
  'Invalid `makefile` Config',
  'the tasks directory does not exist',
  { argMap: true, taskDir: taskDir }
);
taskDir += '/';

each(tasks, function(/** string */ taskStr) {

  /** @type {string} */
  var name;
  /** @type {!Array<string>} */
  var args;
  /** @type {!Task} */
  var task;

  args = taskStr.split('-');
  name = args.shift();

  is.file(taskDir + name + '.js') || log.error(
    'Invalid `make` Command',
    'a task\'s file does not exist',
    { argMap: true, invalidTask: taskDir + name + '.js' }
  );

  task = require(taskDir + name);
  args = args.length ? args : task.defaultArgs;

  each(args, task.run);
});
