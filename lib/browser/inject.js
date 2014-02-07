var hotSwap = require("./hotswap"),
controllers = require("./controllers"),
domready    = require("domready");

require("jquery-browserify");

domready(function () {


  var hotswap = hotSwap({ 
    port: window.location.port,
    path: "/ditto/dnode"
  });

  hotswap.use(
    controllers.css,
    controllers.events,
    controllers.focus,
    controllers.keys,
    controllers.location,
    controllers.scroll,
    controllers.reload,
    controllers.console,
    controllers.uncaughtException
  );

  hotswap.connect();
});