# _is_ Main Function
- [Overview](#overview)
- [Type Tests](#type-tests)
- [Special Characters](#special-chars)
- [Shorthand Type Test Options](#shorthand-tests)

<a name="overview"></a>

## Overview
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla consequat sollicitudin dolor. Ut hendrerit tortor risus, at rhoncus augue imperdiet eget. Nunc dapibus vel neque sit amet porttitor. Duis ipsum ex, malesuada a auctor a, tincidunt non ligula. Etiam vel consequat felis. In id porta est, sit amet ullamcorper nisl. Nunc euismod felis molestie suscipit efficitur. Vestibulum odio ante, convallis vel massa vitae, imperdiet consectetur neque.


<a name="type-tests"></a>
<br />
## Type Tests

| Primitives | JS Objects | DOM Objects | Arrays    | Hash Maps   | Others |
| :--------- | :--------- | :---------- | :-------- | :---------- | :----- |
| null       | object     | element     | nulls     | nullMap     | empty  |
| undefined  | function   | document    | booleans  | booleanMap  |        |
| boolean    | regexp     |             | strings   | stringMap   |        |
| string     | array      |             | numbers   | numberMap   |        |
| number     |            |             | objects   | objectMap   |        |
|            |            |             | functions | functionMap |        |
|            |            |             | regexps   | regexpMap   |        |
|            |            |             | arrays    | arrayMap    |        |
|            |            |             | elements  | elementMap  |        |
|            |            |             | documents | documentMap |        |


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