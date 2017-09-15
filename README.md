# [dot](https://github.com/olado/doT) loader for [webpack](http://webpack.github.io/)

## Usage

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

``` javascript
var template = require("dot!./file.dot");
// => returns file.dot compiled as template function
```

### Recommended config

``` javascript
module.exports = {
  module: {
    loaders: [
      { test: /\.dot$/, loader: "dot-loader" }
    ]
  }
};
```

Then you only need to write: `require("./file.dot")`

### templateSettings

loader's query would be parsed as dot settings


``` javascript
module.exports = {
  module: {
    loaders: [
      { test: /\.dot$/, loader: "dot-loader", query: { strip: false } }
    ]
  }
};
```

### partial support

put your PARTIAL_NAME.def files under a folder, and specify that in `defDir` query param


``` javascript
module.exports = {
  module: {
    loaders: [
      { test: /\.dot$/, loader: "dot-loader", query: { defDir: YOUR_DEF_DIR } }
    ]
  }
};
```

invoke your partial with

``` dot
{{#def.PARTIAL_NAME}}
```

set `defArg` query param to a regex against first line of your PARTIAL_NAME.def to support partial param


