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
```
> { "name": "Josh", "age": 10, "job": undefined }

### Clone Data (to avoid call by reference)
```node
var data = {
  x: 1,
  y: 2,
  z: 3
};
var clone = dvalue.clone(data);
```
> { x: 1, y: 2, z: 3 }

### Merge Array
```node
var arr1 = [1, 2, 3];
var arr2 = [4, 5, 6];
var arr3 = [7, 8, 9];
var result = dvalue.merge(arr1, arr2, arr3);
```
> [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]

### Random Pick n Items in Array
```node
var dvalue = require('dvalue');
var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var picks = dvalue.randomPick(arr, 2);
```
> [ 9, 5 ]

### Shuffle
```node
var dvalue = require('dvalue');
var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
dvalue.shuffle(arr);
```
>> [5, 9, 1, 6, 3, 7, 8, 0, 4, 2]

### Search Object In Array
```node
var dvalue = require('dvalue');
var arr = [{id: 0, name: 'Alan'}, {id: 1, name: 'Becca'}, {id: 2, name: 'Cori'}, {id: 3, name: 'David'}];
var find = dvalue.search(arr, {id: 2});
```
> {"id": 2, "name": "Cori"}

### Search multi Objects In Array
```node
var dvalue = require('dvalue');
var arr = [{id: 0, name: 'Alan'}, {id: 1, name: 'Becca'}, {id: 2, name: 'Cori'}, {id: 3, name: 'David'}, {id: 4, name: 'Cori'}];
var find = dvalue.search(arr, {name: 'Cori'});
```
> [{"id": 2, "name": "Cori"}, {"id": 4, "name": "Cori"}]

### Generate GUID
```node
var dvalue = require('dvalue');
var ID = dvalue.guid();
```
> 82c750dd-5625-ad01-10d6-6c5995ad3798

### Generate Random ID
```node
var dvalue = require('dvalue');
var ID = dvalue.randomID();
```
> 8FUoTTCG

### Generate Random Code
```node
var dvalue = require('dvalue');
var code = dvalue.randomCode(16, {number: 5, lower: 3, upper: 1, symbol: 0});
```
> l7d8vf6JgbQpaf19

### Display Data Size
```node
var dvalue = require('dvalue');
var size = dvalue.displayByte(124124124,2)
```
> [ 118.37, "MB" ]

### Parse String With Parameter
```node
var dvalue = require('dvalue');
var string = dvalue.sprintf("Hello, %s give me %d woods", "Fiona", 58);
```
> Hello, Fiona give me 58 woods
