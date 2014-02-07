var BaseController = require("./base"),
_                  = require("underscore"),
utils              = require("./utils");

function KeysController () {
  BaseController.apply(this, arguments);
}

BaseController.extend(KeysController, {

  /**
   */

  initialize: function () {
    $(document).keyup(_.bind(this._onKeyDown, this));
  },

  /**
   */

  _bindScope: function (scope) {
    var self = this;

    // listen for keys event dispatched by other browsers
    scope.on("keys", function (value, path) {

      if (self.hotswap.focused) return;

      // find the target element based on the emitted path
      var target = utils.findElementByPath(path);

      // the element might not exist - this migth happen when
      // there is a location mismatch
      if (!target) return;

      // set the value of the input
      $(target).val(value);
    });
  },

  /**
   */

  _onKeyDown: function (event) {
    var newValue = $(event.target).val();

    // make sure that we don't emit a change when there is none - this
    // might happen when hitting something like ctrl+a
    if (this.value == newValue) return;

    if (!this.scope) return;

    // emit the new value of the input, along with the path to the given input
    // so that each other open browser kind find the correct DOM element
    this.scope.emit("keys", this.value = newValue, utils.getElementPath(event.target));
  }
});

module.exports = function (hotswap) {
  return new KeysController(hotswap);
}