### Simple & Powerful JavaScript Type Checking
You get two awesome libraries, **_is_**  and  **_are_**, that will make your JavaScript development more **elegant** and **intuitive**. Both are built to offer you the freedom to **choose** your coding style preferences (e.g. main vs sub functions / long vs short names). Take a look at some examples below.
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
is.directory(exVar); // node-are specific
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
are.file([ exVar1, exVar2, exVar3 ]); // node-are specific
```

## Getting Started
For a stand-alone browser environment:
- Download [are.min.js](https://github.com/imaginate/are/blob/master/src/are.min.js)
- Save it to your app's main folder
- Add ``` <script src="are.min.js"></script> ``` to your ``` <head> ``` or ``` <body> ``` before any scripts that use it
- Use ``` is ``` and ``` are ``` as you please (i.e. attached to the global ``` window ``` object)

For an AMD browser environment:
- Download [are.min.js](https://github.com/imaginate/are/blob/master/src/are.min.js)
- Add it to your app's library folder
- Use ``` require(['are'], function(null) { ... }); ```
- Use ``` is ``` and ``` are ``` as you please (i.e. attached to the global ``` window ``` object)

For a Node.js environment:
- Run ``` $ npm install node-are ```
- Use ``` require('node-are')() ``` to attach ``` is ``` and ``` are ``` to the global object or
- Use ``` var areObj = require('node-are'); var is = areObj.is; var are = areObj.are; ```


## API Documentation
- [**_is_** main function](https://github.com/imaginate/are/blob/master/docs/is-main-func.md)
- [**_is_** methods](https://github.com/imaginate/are/blob/master/docs/is-methods.md)
- [**_are_** main function](https://github.com/imaginate/are/blob/master/docs/are-main-func.md)
- [**_are_** methods](https://github.com/imaginate/are/blob/master/docs/are-methods.md)


## Contact Us
- [Open an issue](https://github.com/imaginate/are/issues) on this GitHub repository
- Send an email to [learn@algorithmiv.com](mailto:learn@algorithmiv.com)

<br />
--
**Happy Developing,**

<a href="http://www.algorithmiv.com/are"><img src="http://www.algorithmiv.com/images/aIV-logo.png" alt="Algorithm IV Logo" /></a>
