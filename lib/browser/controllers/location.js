var BaseController = require("./base"),
hasher             = require("hasher"),
_                  = require("underscore");


function LocationController () {
  BaseController.apply(this, arguments);
}

BaseController.extend(LocationController, {

  /**
   */

  initialize: function () {
    var onChange = _.bind(this._onLocationChange, this);
    hasher.changed.add(onChange);
    hasher.initialized.add(onChange);
    hasher.init();
  },

  /**
   */

  _bindScope: function (scope) {
    scope.set("location", window.location.toString());
    scope.bind("location", function (value) {
      window.location = value;
    });
  },

  /**
   */

  _onLocationChange: function (newHash) {
    if (!this.scope) return;
    this.scope.set("location", window.location.toString());
  }
});

module.exports = function (hotswap) {
  return new LocationController(hotswap);
}