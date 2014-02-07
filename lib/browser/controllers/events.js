var _          = require("underscore"),
BaseController = require("./base"),
utils          = require("./utils");

function EventsController () {
  BaseController.apply(this, arguments);
}

BaseController.extend(EventsController, {

  /**
   */

  initialize: function () {

    var onEvent = _.bind(this._onEvent, this);

    ["enter", "submit", "click", "mouseup", "mousedown"].forEach(function (event) {
      document.addEventListener(event, onEvent, true);
    });
  },

  /**
   */

  _bindScope: function (scope) {
    var self = this;
    scope.on("event", function (name, path) {
      if (self.hotswap.focused) return;
      var target = utils.findElementByPath(path);
      if (!target) return;
      $(target).trigger($.Event(name));
    });
  },

  /**
   */

  _onEvent: function (event) {
    if (!this.hotswap.focused) return;
    this.scope.emit("event", event.type, utils.getElementPath(event.target));
  }
});

module.exports = function (hotswap) {
  return new EventsController(hotswap);
}