var protoclass = require("protoclass"),
_              = require("underscore"),
BaseController = require("./base");

function FocusController () {
  BaseController.apply(this, arguments);
}

BaseController.extend(FocusController, {

  /**
   */

  initialize: function () {
    $(document).mousemove(_.bind(this._onMouseMove, this));
    $(document).mouseout(_.bind(this._onMouseLeave, this));
    $(document).mouseenter(_.bind(this._onMouseEnter, this));
  },

  /**
   */

  _onMouseMove: function () {
    this.hotswap.set("focused", true);
  },
  /**
   */

  _onMouseEnter: function (event) {
    this.hotswap.set("focused", true);
  },
  /**
   */

  _onMouseLeave: function (event) {
    if (event.relatedTarget || event.toElement) return
    this.hotswap.set("focused", false);
  }
});

module.exports = function (hotswap) {
  return new FocusController(hotswap);
}