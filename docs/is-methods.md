# _is_ Methods
- [Overview](#overview)
- [Methods](#methods)
- [Compatibility](#compatibility)

<a name="overview"></a>

## Overview
(overview coming soon)


<a name="methods"></a>
<br />
## Methods
- [Primitives](#methods-primitives)
- [JS Objects](#methods-js-objects)
- [DOM Objects](#methods-dom-objects)
- [Special Checks](#methods-special)
- [Node.js Only](#methods-node)

<a name="methods-primitives"></a>
### Primitives

| Method       | Alias   | Notes                                                                                     |
| :----------- | :------ | :---------------------------------------------------------------------------------------- |
| is.null      | is.nil  |                                                                                           |
| is.undefined |         |                                                                                           |
| is.boolean   | is.bool |                                                                                           |
| is.string    | is.str  | 2nd optional param: set to ``` false ``` to return ``` false ``` for empty strings.       |
| is._string   | is._str | Operates the same as ``` is.string ``` except it returns ``` false ``` for empty strings. |
| is.number    | is.num  | 2nd optional param: set to ``` false ``` to return ``` false ``` for zeros.               |
| is._number   | is._num | Operates the same as ``` is.number ``` except it returns ``` false ``` for zero.          |
| is.nan       |         |                                                                                           |

<a name="methods-js-objects"></a>
### JS Objects

| Method      | Alias                | Notes                                                                                |
| :---------- | :------------------- | :----------------------------------------------------------------------------------- |
| is.object   | is.obj               | 2nd optional param: set to ``` true ``` to return ``` true ``` for functions.        |
| is._object  | is._obj              | Operates the same as ``` is.object ``` except it returns ``` true ``` for functions. |
| is.function | is.fn &#124; is.func |                                                                                      |
| is.regexp   | is.regex             |                                                                                      |
| is.array    | is.arr               | 2nd optional param: set to ``` true ``` to return ``` true ``` for arguments.        |
| is._array   | is._arr              | Operates the same as ``` is.array ``` except it returns ``` true ``` for arguments.  |
| is.args     | is.arguments         |                                                                                      |

<a name="methods-dom-objects"></a>
### DOM Objects

| Method      | Alias   |
| :---------- | :------ |
| is.element  | is.elem |
| is.document | is.doc  |

<a name="methods-special"></a>
### Special Checks

| Method   | Notes                                                                                                                                    |
| :------- | :--------------------------------------------------------------------------------------------------------------------------------------- |
| is.empty | Returns ``` false ``` for ``` 0, "", {}, [], null, undefined, false, NaN, function(){...} // empty functions have no defined params ```. |
| is.whole | Returns ``` false ``` if a number has any decimal places.                                                                                |
| is.odd   | Returns ``` false ``` if a number is not whole and odd.                                                                                  |
| is.even  | Returns ``` false ``` if a number is not whole and even.                                                                                 |

<a name="methods-node"></a>
### Node.js Only

| Method         | Alias                        | Notes                                                           |
| :------------- | :--------------------------- | :-------------------------------------------------------------- |
| is.buffer      | is.buff                      |                                                                 |
| is.directory   | is.dir                       |                                                                 |
| is.directories | is.dirs &#124; is.directorys | 2nd optional param: set to add a root dirpath to all dirpaths.  |
| is.file        |                              |                                                                 |
| is.files       |                              | 2nd optional param: set to add a root dirpath to all filepaths. |


<a name="compatibility"></a>
<br />
## Compatibility
Accessing properties using reserved keywords will fail in some JavaScript engines. See the following table for methods that could produce issues.

| Method       | Use Instead | EcmaScript Versions |
| :----------- | :---------- | :------------------ |
| is.null      | is.nil      | ES1+                |
| is.boolean   | is.bool     | ES2-ES4             |
| is.function  | is.func     | ES1+                |
| is.arguments | is.args     | ES5+                |


<br />
--
**Happy Developing,**

<a href="http://www.algorithmiv.com/are"><img src="http://www.algorithmiv.com/images/aIV-logo.png" alt="Algorithm IV Logo" /></a>
