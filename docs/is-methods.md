# _is_ Methods
- [Overview](#overview)
- [Methods](#methods)

<a name="overview"></a>

## Overview
Lorem ipsum ... (overview coming soon)


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

| Method       | Alias   | Notes       |
| :----------- | :------ | :---------- |
| is.null      | is.nil  |             |
| is.undefined |         |             |
| is.boolean   | is.bool |             |
| is.string    | is.str  | 2nd optional param: set to ``` false ``` to return ``` false ``` for empty strings. |
| is._string   | is._str | Operates the same as ``` is.string ``` except it returns ``` false ``` for empty strings. |
| is.number    | is.num  | 2nd optional param: set to ``` false ``` to return ``` false ``` for zeros. |
| is._number   | is._num | Operates the same as ``` is.number ``` except it returns ``` false ``` for zero. |

<a name="methods-js-objects"></a>
### JS Objects

| Method      | Alias    | Notes         |
| :---------- | :------- | :------------ |
| is.object   | is.obj   | 2nd optional param: set to ``` true ``` to return ``` true ``` for functions. |
| is._object  | is._obj  | Operates the same as ``` is.object ``` except it returns ``` true ``` for functions. |
| is.function | is.fn &#124; is.func |   |
| is.regexp   | is.regex |               |
| is.array    | is.arr   |               |

<a name="methods-dom-objects"></a>
### DOM Objects

| Method      | Alias   |
| :---------- | :------ |
| is.element  | is.elem |
| is.document | is.doc  |

<a name="methods-special"></a>
### Special Checks

| Method   | Notes   |
| :------- | :------ |
| is.empty | Returns ``` false ``` for ``` 0, "", {}, [], null, undefined, false, NaN, function(){...} // empty functions have no defined params ```. |

<a name="methods-node"></a>
### Node.js Only

| Method         | Alias   | Notes       |
| :------------- | :------ | :---------- |
| is.buffer      | is.buff |             |
| is.directory   | is.dir  |             |
| is.directories | is.dirs &#124; is.directorys | 2nd optional param: set to add a root dirpath to all dirpaths. |
| is.file        |         |             |
| is.files       |         | 2nd optional param: set to add a root dirpath to all filepaths. |


<br />
--
**Happy Developing,**

<a href="http://www.algorithmiv.com/are"><img src="http://www.algorithmiv.com/images/aIV-logo.png" alt="Algorithm IV Logo" /></a>
