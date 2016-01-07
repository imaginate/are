# are [![npm version](https://badge.fury.io/js/node-are.svg)](https://badge.fury.io/js/node-are)
### Elegant JS Type Checking
**_are_** will make your JavaScript development better! It contains two libraries, **_is_** and **_are_**, that will cover all of your data, object, and state type check needs. Their **simple** and **intuitive** APIs will make your projects easier to read and maintain while sustaining high performance. Take a look at some examples below.

## Examples
- **_is_**
```javascript
// example string checks
var val = 'a string';
is('string', val);
is('str', val);
is.string(val);
is.str(val);

// other examples
is('string|number', val); // is val a primitive string or number
is('!arrays|regexps', val); // is val a non-null array of arrays or regexps
is.document(val); // is val a DOM document instance
is.directory(val); // is val a valid directory path (for node.js only)
```
- **_are_**
```javascript
// example string checks
var val1, val2, val3;
are('string', val1, val2, val3);
are('str', [ val1, val2, val3 ]);
are.string([ val1, val2, val3 ]);
are.str(val1, val2, val3);

// other examples
are('elem=', [ val1, val2, val3 ]); // is each val undefined, null, or a DOM element
are('?bool', val1, val2, val3); // is each val a boolean or null
are.empty(val1, val2, val3); // is each val empty (see docs for more info)
are.file([ val1, val2, val3 ]); // is each val a valid file path (for node.js only)
```

## Install & Use
#### node.js
- ``` npm install node-are ```
- ``` require('node-are')(); // global.are and global.is now available ``` **or**
- ``` var are = require('node-are').are; var is = require('node-are').is; ```

#### browser
- download [are.min.js](https://github.com/imaginate/are/blob/master/src/are.min.js)
- ``` <script src="are.min.js"></script> ``` ([add to html](http://javascript.info/tutorial/adding-script-html#external-scripts))
- ``` window.is(...) && window.are(...) ``` (appended to [window](https://developer.mozilla.org/en-US/docs/Web/API/Window))

#### amd
- download [are.min.js](https://github.com/imaginate/are/blob/master/src/are.min.js)
- ``` require([ 'are' ], function(null) { ... }) ```
- ``` window.is(...) && window.are(...) ``` (appended to [window](https://developer.mozilla.org/en-US/docs/Web/API/Window))


## API Documentation
- [**_is_** main function](https://github.com/imaginate/are/blob/master/docs/is-main-func.md)
- [**_is_** methods](https://github.com/imaginate/are/blob/master/docs/is-methods.md)
- [**_are_** main function](https://github.com/imaginate/are/blob/master/docs/are-main-func.md)
- [**_are_** methods](https://github.com/imaginate/are/blob/master/docs/are-methods.md)


## Other Details
**contributing:** [see contributing guideline](https://github.com/imaginate/are/blob/master/CONTRIBUTING.md)<br>
**bugs/improvements:** [open an issue](https://github.com/imaginate/are/issues)<br>
**questions:** learn@algorithmiv.com


--
**Happy Developing,**

<a href="http://www.algorithmiv.com/are"><img src="http://www.algorithmiv.com/images/aIV-logo.png" alt="Algorithm IV Logo" /></a>
