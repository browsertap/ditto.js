
var bindable = require("bindable"),
protoclass   = require("protoclass"),
adapters     = require("./adapters"),
BaseHotSwap  = require("./base/hotswap"),
controllers  = require("./controllers");


function Ditto (options) {
  options.scope = new bindable.Object();
  BaseHotSwap.apply(this, arguments);

  this.use(
    controllers.watch
  )
}

BaseHotSwap.extend(Ditto, {

});


module.exports = function (options) {
  var ditto = new Ditto(options || {});
  return {
    adapters: adapters(ditto)
  }
}