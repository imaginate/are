/**
 * -----------------------------------------------------------------------------
 * MAKEFILE
 * -----------------------------------------------------------------------------
 * @file Use `$ node make <task>[-method][=val] ...` to execute make tasks.
 *   Tasks are executed in the order given. Tasks may be repeated. You may view
 *   each task's source code in the "tasks" directory as "taskname.js".
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2015 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

/*
 * -----------------------------------------------------------------------------
 * MAKE COMMAND EXAMPLES
 * -----------------------------------------------------------------------------
 * `$ node make <task>`
 * `$ node make --<task>`
 * `$ node make --task-<method>`
 * `$ node make --task-<method>-<method>`
 * `$ node make --task-<method>=<value>`
 * `$ node make --task=<defaultValue>-<method>-<method>`
 * `$ node make --task=<defaultValue>-<method>-<method>-<method>=<value>`
 */

/*
 * -----------------------------------------------------------------------------
 * MAKE SHORTCUTS
 * -----------------------------------------------------------------------------
 * `$ node make`       => `$ node make --dev`
 * `$ node make --dev` => `$ node make --compile --minify`
 */

/*
 * -----------------------------------------------------------------------------
 * MAKE TASKS
 * -----------------------------------------------------------------------------
 *
 * Methods
 * -------------------------------------------
 * | Task    | Methods     | Default Methods |
 * | :------ | :---------- | :-------------- |
 * | compile | are|nodeAre | are|nodeAre     |
 * | minify  | are|nodeAre | are|nodeAre     |
 * | test    | are|nodeAre | are|nodeAre     |
 * | version | all         | all             |
 * -------------------------------------------
 *
 * Values
 * ------------------------------------------------------------------
 * | Task    | Method | Acceptable Values | Example | Default Value |
 * | :------ | :----- | :---------------- | :------ | :------------ |
 * | version | all    | Semantic Version  | 1.2.4   | (none)        |
 * ------------------------------------------------------------------
 */

'use strict';

require('./helpers/vitals')(); // appends helpers to global obj


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
  dev: 'compile minify'
};

tasks = process.argv.length > 2 ?
  process.argv.slice(2) : shortcuts.dev.split(' ');
tasks = tasks.map(function(/** string */ task) {
  task = task.replace(/^--/, '');
  return has(shortcuts, task) ? shortcuts[task] : task;
});


////////////////////////////////////////////////////////////////////////////////
// RUN THE TASKS
////////////////////////////////////////////////////////////////////////////////

taskDir = taskDir ? taskDir.replace(/([^\/])$/, '$1/') : './tasks/';
is.dir(taskDir) || log.error(
  'Invalid `makefile` Config',
  'the tasks directory does not exist',
  { argMap: true, taskDir: taskDir }
);

each(tasks, function(/** string */ taskStr) {

  /** @type {!Task} */
  var task;
  /** @type {string} */
  var name;
  /** @type {!Array<string>} */
  var methods;
  /** @type {string} */
  var defaultVal;

  name = taskStr.replace(/^([a-z]+)(?:[^a-z].*)?$/i, '$1');

  is.file(taskDir + name + '.js') || log.error(
    'Invalid `make` Command',
    'a task\'s file does not exist',
    { argMap: true, invalidTask: taskDir + name + '.js' }
  );

  task = require(taskDir + name);

  methods = taskStr.split('-');

  defaultVal = methods.shift();
  defaultVal = defaultVal.replace(/^[a-z]+(\=.*)?$/i, '$1');

  methods = methods.length ? methods : task.defaultMethods;
  methods = defaultVal ? methods.map(function(/** string */ method) {
    return /=/.test(method) ? method : method + defaultVal;
  }) : methods;

  each(methods, task.run);
});
