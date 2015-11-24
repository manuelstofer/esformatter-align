# esformatter-align

[esformatter](https://github.com/millermedeiros/esformatter) plugin for alignment.



## Usage

install it:

```sh
npm install esformatter-align
```

and add to your esformatter config file:

```json
{
  "plugins": [
    "esformatter-align"
  ]
}
``

## Examples

input:

```js
var longer = require('hello');
var small = require('hello');
var muchlonger = require('hello');
```

output:

```js
var longer     = require('hello');
var small      = require('hello');
var muchlonger = require('hello');
```

input:

```js
var x = {
  a: 5,
  bla: ''
};
```

output:

```js
var x = {
  a:   5,
  bla: ''
};
```

## License

Released under the [MIT License](http://opensource.org/licenses/MIT).

