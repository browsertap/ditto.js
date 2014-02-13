var dnode = require("dnode"),
shoe      = require("shoe"),
bindable  = require("bindable"),
_         = require("underscore"),
browserify = require("browserify"),
memoize    = require("async").memoize,
Url        = require("url");


module.exports = function (ditto) {


  return function (req, res, next) {

  
    if (!req.socket.server.__dittofied) {
      req.socket.server.__dittofied = true;
      _installDNode(req.socket.server, ditto);
    }


    if (Url.parse(req.url).pathname === "/hotswap.js") {
      return _loadHotSwapScript(function (content) {
        res.setHeader("content-type", "text/javascript");
        // res.setHeader("content-length", String(content.length + ));
        res.write(content);
        res.end();
      });
    }

    next();
  }
}




function _installDNode (server, ditto) {

  var sock = shoe(function (stream) {
    var d = dnode(_clone(ditto.scope));
    d.pipe(stream).pipe(d);
  });

  sock.install(server, "/ditto/dnode");
}

var _loadHotSwapScript = memoize(function (next) {
  var b = browserify();
  b.add(__dirname + "/../browser/inject.js");
  b.bundle(function (err, content) {
    next(content || String(err.stack));
  })
});





function _clone (target) {
  var clone = {};

  for (var property in target) {
    var value = target[property];

    if (typeof value === "function") {
      value = _.bind(value, target);
    }

    clone[property] = value;
  } 
  return clone;
}