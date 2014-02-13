var protoclass = require("protoclass"),
BaseController = require("./base");


function RefreshController () {
  BaseController.apply(this, arguments);
  this._queue = [];
}

BaseController.extend(RefreshController, {

  /**
   */

  initialize: function () {
    this.hotswap.on("reconnect", function () {
      window.location.reload();
    });
  },

  /**
   */

  _bindScope: function (scope) {
    scope.on("reload", function () {
      window.location.reload();
    })
  }
});

module.exports = function (hotswap) {
  return new RefreshController(hotswap);
}