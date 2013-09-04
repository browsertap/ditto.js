// Generated by CoffeeScript 1.6.2
(function() {
  var Client, client, handle, oldLog,
    _this = this;

  Client = require("../../common/clients/base");

  client = new Client();

  oldLog = console.log;

  handle = function(payload) {
    return oldLog.apply(console.apply(null, payload.data));
  };

  console.__log = oldLog;

  console.log = function() {
    oldLog.apply(console, arguments);
    return client.dispatch({
      event: "log",
      data: Array.prototype.slice.call(arguments, 0)
    });
  };

  module.exports = {
    dispatcher: client,
    handler: handle
  };

}).call(this);