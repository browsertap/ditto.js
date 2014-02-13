
var bindable = require("bindable"),
protoclass   = require("protoclass"),
adapters     = require("./adapters"),
BaseHotSwap  = require("./base/hotswap"),
controllers  = require("./controllers"),
mitm         = require("./mitm");

require("colors");


function Ditto (options) {
  options.scope = new bindable.Object();
  BaseHotSwap.apply(this, arguments);
  this.verbose = options.verbose;

  this.use(
    controllers.watch,
    controllers.console
  )
}

BaseHotSwap.extend(Ditto, {

});


module.exports = function (options) {
  var ditto = new Ditto(options || {});

  return {
    adapters: adapters(ditto),
    hotswap: ditto,
    mitm: function (options) {
      return mitm(options, ditto);
    }
  };
}