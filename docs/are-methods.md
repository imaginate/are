# _are_ Methods
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

| Method        | Alias    | Notes       |
| :------------ | :------- | :---------- |
| are.null      | are.nil  |             |
| are.undefined |          |             |
| are.boolean   | are.bool |             |
| are.string    | are.str  |             |
| are._string   | are._str | Operates the same as ``` are.string ``` except it returns ``` false ``` for empty strings. |
| are.number    | are.num  |             |
| are._number   | are._num | Operates the same as ``` are.number ``` except it returns ``` false ``` for zero. |

<a name="methods-js-objects"></a>
### JS Objects

| Method       | Alias     | Notes         |
| :----------- | :-------- | :------------ |
| are.object   | are.obj   |               |
| are._object  | are._obj  | Operates the same as ``` are.object ``` except it returns ``` true ``` for functions. |
| are.function | are.fn &#124; are.func |  |
| are.regexp   | are.regex |               |
| are.array    | are.arr   |               |

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


<br />
--
**Happy Developing,**

<a href="http://www.algorithmiv.com/are"><img src="http://www.algorithmiv.com/images/aIV-logo.png" alt="Algorithm IV Logo" /></a>
