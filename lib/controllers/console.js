var _          = require("underscore"),
BaseController = require("./base");


function ConsoleController () {
  BaseController.apply(this, arguments);
  this._queue = [];
}

var colors = {
  warn  : "yellow",
  error : "red",
  log   : "grey"
};

BaseController.extend(ConsoleController, {

  /**
   */

  _bindScope: function (scope) {
    scope.on("log", _.bind(this._log, this));
  },

  /**
   */

  _log: function (platform, level, args) {

    args[0] = (platform + ": ")[colors[level]] + args[0];

    console[level].apply(console, args);
  }
});

module.exports = function (hotswap) {
  return new ConsoleController(hotswap);
}