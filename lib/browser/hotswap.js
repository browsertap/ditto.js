var BaseHotSwap    = require("../base/hotswap"),
Connection         = require("./connection"),
_                  = require("underscore"),
bindable           = require("bindable");

function BrowserHotSwap (options) {
  BaseHotSwap.apply(this, arguments);
  this.port = options.port;
}


BaseHotSwap.extend(BrowserHotSwap, {

  /**
   */

  connect: function () {
    this.connection = new Connection({ port: this.port });
    this.connection.on("scope", _.bind(this._onScope, this));
    this.connection.on("reconnect", this._onReconnect);
    this.connection.connect();
  },

  /**
   */

  _onScope: function (scope) {
    var self = this;
    this.set("scope", scope);
  },

  /**
   */

  _onReconnect: function () {
    // on reconnect, need to reload the page incase any templates / controllers
    // have changed
    this.emit("reconnect");
  }
});

module.exports = function (options) {
  return new BrowserHotSwap(options);
};