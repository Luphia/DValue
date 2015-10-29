# DValue
A Default Value handler for javascript

## Install
```shell
npm install dvalue
```
## How to use
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
