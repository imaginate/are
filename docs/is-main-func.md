### Main Function: is


| Primitives | Objects  | Arrays     | Hash Maps   | DOM Objects |
| :--------: | :------: | :--------: | :---------: | :---------: |
| string     | object   | strings    | stringMap   | element     |
| number     | function | numbers    | numberMap   | document    |
| boolean    | regexp   | booleans   | booleanMap  |             |
| undefined  | array    | emptyArray | emptyMap    |             |
|            |          | objects    | objectMap   |             |
|            |          | functions  | functionMap |             |
|            |          | regexps    | regexpMap   |             |
|            |          | arrays     | arrayMap    |             |
|            |          | elements   | elementMap  |             |
|            |          | documents  | documentMap |             |


### Important Characters:
| Char | Details                                  | Example         |
| :--- | :--------------------------------------- | :-------------- |
| *    | value can be any type                    |                 |
| \|   | separates multiple type options          | string\|number  |
| !    | marks objects as non-nullable            | !stringMap      |
| ?    | marks primitives & functions as nullable | ?string         |
| =    | value may be undefined                   | string\|array=  |


### Valid General Shorthand:
| Name  | Value     |
| :---- | :-------- |
| str   | string    |
| num   | number    |
| bool  | boolean   |
| obj   | object    |
| func  | function  |
| regex | regexp    |
| arr   | array     |
| elem  | element   |
| doc   | document  |
| empty | undefined |
| any   | *         |
| null  | ?         |

### Valid Array Shorthand:
| Name   | Value     |
| :----- | :-------- |
| strs   | strings   |
| nums   | numbers   |
| bools  | booleans  |
| objs   | objects   |
| funcs  | functions |
| regexs | regexps   |
| arrs   | arrays    |
| elems  | elements  |
| docs   | documents |

### Valid Hash Map Shorthand:
| Name     | Value       |
| :------- | :---------- |
| strMap   | stringMap   |
| numMap   | numberMap   |
| boolMap  | booleanMap  |
| objMap   | objectMap   |
| funcMap  | functionMap |
| regexMap | regexpMap   |
| arrMap   | arrayMap    |
| elemMap  | elementMap  |
| docMap   | documentMap |


<br />
--
**Happy Developing,**

<a href="http://www.algorithmiv.com/are"><img src="http://www.algorithmiv.com/images/aIV-logo.png" alt="Algorithm IV Logo" /></a>