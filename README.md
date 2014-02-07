### Summary

Ditto is a development utility that synchronizes changes across any browser you have running. It's perfect for testing Websites for cross-browser, cross-mobile compatibility.

### Features

- synchronize CSS / JS / HTML changes
- synchronize navigation
- synchronize console logs across all browsers - see console logs in terminal window
- see any uncaught exceptions in ditto terminal window
- synchronize mouse & keyboard interactions
- syhcnronize CSS & DOM changes in Chrome

### Express Usage

```javascript
var express = require("express"),
ditto       = require("ditto"),
app         = express();

// register the express middleware
app.use(ditto({
  watch: {
    path: "/path/to/files/to/watch"
  }
}).adapters.connect);

app.listen(8080);
```

In your HTML app, insert this tag in your header:

```html
<script type="text/javascript" src="/ditto/hotswap.js"></script>
```

### Command Line Usage

You can also setup ditto to automatically proxy, and inject itself into any website simply by running:

```
ditto-proxy [proxy] --watch=[path] --port=[proxy-port]
```

This assumes you have ditto installed globally:

```
npm install ditto -g
```
