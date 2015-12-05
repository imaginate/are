# are
### Elegant JS Type Checking
**_are_** will make your JavaScript development better! It contains two libraries, **_is_** and **_are_**, that will cover all of your type testing needs. Their **simple** and **intuitive** API will make your projects easier to read and maintain while sustaining high performance and giving you the freedom to choose from different coding styles. Take a look at some examples below.
- **_is_**
```javascript
// example string checks
is('string', exVar);
is('str', exVar);
is.string(exVar);
is.str(exVar);

// some other cool examples
is('string|number', exVar);
is('!arrays|regexps', exVar);
is.document(exVar);
is.directory(exVar); // node.js specific
```
- **_are_**
```javascript
// example string checks
are('string', exVar1, exVar2, exVar3);
are('str', [ exVar1, exVar2, exVar3 ]);
are.string([ exVar1, exVar2, exVar3 ]);
are.str(exVar1, exVar2, exVar3);

// some other cool examples
are('num=', [ exVar1, exVar2, exVar3 ]);
are('!doc|elem', exVar1, exVar2, exVar3);
are.element(exVar1, exVar2, exVar3);
are.file([ exVar1, exVar2, exVar3 ]); // node.js specific
```

## Install & Use
#### node.js
- ``` npm install node-are ```
- ``` require('node-are')() && global.is(...) && global.are(...) ``` (appended to [global](https://nodejs.org/api/globals.html#globals_global))
- ``` require('node-are').is(...) && require('node-are').are(...) ```

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
