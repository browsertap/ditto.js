var _          = require("underscore"),
BaseController = require("./base"),
platform       = require("platform");


if (!global.console) {
  global.console = {
    log   : function () { },
    warn  : function () { },
    error : function () { }
  }
}

function ConsoleController () {
  this._queue = [];
  this.label = platform.name + "@" + platform.version;
  BaseController.apply(this, arguments);
}

BaseController.extend(ConsoleController, {

  /**
   */

  initialize: function () {

    var self = this;
    // shim various console logs
    ["log", "warn", "error"].forEach(function (level) {
      var _logger = _.bind(global.console[level], global.console);

      global.console["_" + level] = _logger;



      global.console[level] = function () {

        var args = Array.prototype.slice.call(arguments, 0);
        self._log(level, args);
        _logger.apply(null, args);
      };
    }); 
  },

  /**
   */

  _bindScope: function (scope) {
    // log all the queued items
    // copy the logs, and destroy them;
    var q = this._queue.concat();

    this._queue = [];

    for (var i = 0, n = q.length; i < n; i++) {
      var log = q[i];
      this._log(log[0], log[1]);
    }


    scope.on("log", _.bind(this._onLog, this));
  },

  /**
   */

  _log: function (level, args) {

    if (this._ignore) return;
    this._ignore = true;

    // log might happen before there is a connection established, 
    // so throw in a temporary queue
    if (!this.scope) {
      return this._queue.push([level, args]);
    }


    // log the curently logged items
    this.scope.emit("log", this.label, level, args);

    this._ignore = false;
  },

  /**
   */

  _onLog: function (label, level, args) {

    if (this.label == label) return;

    this._ignore = true;
    args[0] = label + ": " + args[0];
    console[level].apply(console, args);
    this._ignore = false;
  }
});

module.exports = function (hotswap) {
  return new ConsoleController(hotswap);
}