// Generated by CoffeeScript 1.6.2
(function() {
  var Commands, DOMClient, Ditto, Logger, RemoteClient, actions, hooks, onDomEvent, onKeyUp, xpgen;

  actions = require("./actions");

  Commands = require("../common/clients/commands");

  RemoteClient = require("./clients/remote");

  Logger = require("./clients/logger");

  DOMClient = require("./clients/dom");

  xpgen = require("xpgen");

  hooks = require("./hooks");

  onKeyUp = require("./commands/keyup");

  onDomEvent = require("./commands/domEvent");

  Ditto = (function() {
    /*
    */
    function Ditto() {
      var hookName, rc;

      this.actions = actions;
      this.commands = new Commands();
      this.commands.register("keyup keydown", onKeyUp);
      this.commands.register("click mousedown mouseup", onDomEvent);
      this.commands.register("scroll", hooks.scroll.handler);
      rc = new RemoteClient("http://localhost:8083/sock");
      rc.copy().to(this.commands);
      for (hookName in hooks) {
        hooks[hookName].dispatcher.copy().to(rc);
      }
    }

    return Ditto;

  })();

  window.xpgen = xpgen();

  module.exports = window.ditto = new Ditto();

}).call(this);