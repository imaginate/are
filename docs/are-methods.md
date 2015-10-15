# _are_ Methods
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

| Method        | Alias    | Notes       |
| :------------ | :------- | :---------- |
| are.null      | are.nil  |             |
| are.undefined |          |             |
| are.boolean   | are.bool |             |
| are.string    | are.str  |             |
| are._string   | are._str | Operates the same as ``` are.string ``` except it returns ``` false ``` for empty strings. |
| are.number    | are.num  |             |
| are._number   | are._num | Operates the same as ``` are.number ``` except it returns ``` false ``` for zero. |
| are.nan       |          |             |

<a name="methods-js-objects"></a>
### JS Objects

| Method       | Alias     | Notes         |
| :----------- | :-------- | :------------ |
| are.object   | are.obj   |               |
| are._object  | are._obj  | Operates the same as ``` are.object ``` except it returns ``` true ``` for functions. |
| are.function | are.fn &#124; are.func |  |
| are.regexp   | are.regex |               |
| are.array    | are.arr   |               |
| are._array   | are._arr  | Operates the same as ``` are.array ``` except it returns ``` true ``` for arguments. |
| are.args     | are.arguments |           |

<a name="methods-dom-objects"></a>
### DOM Objects

| Method       | Alias    |
| :----------- | :------- |
| are.element  | are.elem |
| are.document | are.doc  |

<a name="methods-special"></a>
### Special Checks

| Method    | Notes   |
| :-------- | :------ |
| are.empty | Returns ``` false ``` for ``` 0, "", {}, [], null, undefined, false, NaN, function(){...} // empty functions have no defined params ```. |

<a name="methods-node"></a>
### Node.js Only

| Method          | Alias    |
| :-------------- | :------- |
| are.buffer      | are.buff |
| are.directory   | are.dir  |
| are.file        |          |


<a name="compatibility"></a>
<br />
## Compatibility
Accessing properties using reserved keywords will fail in some JavaScript engines. See the following table for methods that could produce issues.

| Method        | Use Instead | EcmaScript Versions |
| :------------ | :---------- | :------------------ |
| are.null      | are.nil     | ES1+                |
| are.boolean   | are.bool    | ES2-ES4             |
| are.function  | are.func    | ES1+                |
| are.arguments | are.args    | ES5+                |


<br />
--
**Happy Developing,**

<a href="http://www.algorithmiv.com/are"><img src="http://www.algorithmiv.com/images/aIV-logo.png" alt="Algorithm IV Logo" /></a>
