var protoclass     = require("protoclass"),
_                  = require("underscore"),
bindable           = require("bindable");

function HotSwap (options) {
  this.options = options;
  bindable.Object.call(this, this);
  this._id = Date.now() + "." + Math.round(Math.random() * 99999999);
  if (options.scope) this.set("scope", options.scope);
}


protoclass(bindable.Object, HotSwap, {

  /**
   */

  use: function (plugins) {
    for (var i = arguments.length; i--;) {
      arguments[i](this);
    }
  }

});

module.exports = HotSwap;