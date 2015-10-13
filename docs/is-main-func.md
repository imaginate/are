# _is_ Main Function
- [Overview](#overview)
- [Type Tests](#type-tests)
- [Special Characters](#special-chars)
- [Shorthand Type Test Options](#shorthand-tests)

<a name="overview"></a>

## Overview
(overview coming soon)


<a name="type-tests"></a>
<br />
## Type Tests
- [General](#type-general)
- [Arrays](#type-arrays)
- [Hash Maps](#type-maps)

<a name="type-general"></a>
### General

| Primitives | JS Objects | DOM Objects | Others |
| :--------- | :--------- | :---------- | :----- |
| null       | object     | element     | empty  |
| undefined  | function   | document    |        |
| boolean    | regexp     |             |        |
| string     | array      |             |        |
| number     | arguments  |             |        |

<a name="type-arrays"></a>
### Arrays

| Primitives | JS Objects | DOM Objects |
| :--------- | :--------- | :---------- |
| nulls      | objects    | elements    |
| booleans   | functions  | documents   |
| strings    | regexps    |             |
| numbers    | arrays     |             |

<a name="type-maps"></a>
### Hash Maps

| Primitives | JS Objects  | DOM Objects |
| :--------- | :---------- | :---------- |
| nullMap    | objectMap   | elementMap  |
| booleanMap | functionMap | documentMap |
| stringMap  | regexpMap   |             |
| numberMap  | arrayMap    |             |


<a name="special-chars"></a>
<br />
## Special Characters

| Char   | Details                                  | Example            |
| :----- | :--------------------------------------- | :----------------- |
| *      | value can be any type                    | *                  |
| &#124; | separates multiple type options          | string&#124;number |
| !      | marks objects as non-nullable            | !stringMap         |
| ?      | marks primitives & functions as nullable | ?string            |
| =      | value may be undefined                   | string&#124;array= |


<a name="shorthand-tests"></a>
<br />
## Shorthand Type Test Options
- [General](#shorthand-general)
- [Arrays](#shorthand-arrays)
- [Hash Maps](#shorthand-maps)

<a name="shorthand-general"></a>
### General

| Type  | same as | Type      |
| :---- | :-----: | :-------- |
| nil   | =>      | null      |
| str   | =>      | string    |
| num   | =>      | number    |
| bool  | =>      | boolean   |
| obj   | =>      | object    |
| fn    | =>      | function  |
| func  | =>      | function  |
| regex | =>      | regexp    |
| arr   | =>      | array     |
| args  | =>      | arguments |
| elem  | =>      | element   |
| doc   | =>      | document  |
| any   | =>      | *         |

<a name="shorthand-arrays"></a>
### Arrays

| Type   | same as | Type      |
| :----- | :-----: | :-------- |
| nils   | =>      | nulls     |
| strs   | =>      | strings   |
| nums   | =>      | numbers   |
| bools  | =>      | booleans  |
| objs   | =>      | objects   |
| fns    | =>      | functions |
| funcs  | =>      | functions |
| regexs | =>      | regexps   |
| arrs   | =>      | arrays    |
| elems  | =>      | elements  |
| docs   | =>      | documents |

<a name="shorthand-maps"></a>
### Hash Maps

| Type     | same as | Type        |
| :------- | :-----: | :---------- |
| nilMap   | =>      | nullMap     |
| strMap   | =>      | stringMap   |
| numMap   | =>      | numberMap   |
| boolMap  | =>      | booleanMap  |
| objMap   | =>      | objectMap   |
| fnMap    | =>      | functionMap |
| funcMap  | =>      | functionMap |
| regexMap | =>      | regexpMap   |
| arrMap   | =>      | arrayMap    |
| elemMap  | =>      | elementMap  |
| docMap   | =>      | documentMap |


<br />
--
**Happy Developing,**

<a href="http://www.algorithmiv.com/are"><img src="http://www.algorithmiv.com/images/aIV-logo.png" alt="Algorithm IV Logo" /></a>
