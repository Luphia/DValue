# DValue
A Default Value handler for javascript

## Install
```shell
npm install dvalue
```
## How to use
### Default Value
```node
var dvalue = require('dvalue');

var data = {name: 'Josh'};
var default = {age: 10, job: undefined};
data = dvalue.default(data, default);

/* Result
{
  name: 'Josh',
  age: 10,
  job: undefined
}
 */
```
### Clone Data (to avoid call by reference)
```node
var data = {
  x: 1,
  y: 2,
  z: 3
};
var clone = dvalue.clone(data);
```
### Merge Array
```node
var arr1 = [1, 2, 3];
var arr2 = [4, 5, 6];
var arr3 = [7, 8, 9];
var result = dvalue.merge(arr1, arr2, arr3);
```
### Random Pick n Items in Array
```node
var dvalue = require('dvalue');
var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var picks = dvalue.randomPick(arr, 2);
```
### Generate GUID
```node
var dvalue = require('dvalue');
var ID = dvalue.guid();
```
### Generate Random ID
```node
var dvalue = require('dvalue');
var ID = dvalue.randomID();
```
