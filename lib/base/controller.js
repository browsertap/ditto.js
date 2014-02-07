var protoclass = require("protoclass"),
_              = require("underscore"),
bindable       = require("bindable");

function BaseController (hotswap) {
  this.hotswap = hotswap;
  bindable.Object.call(this, this);
  hotswap.bind("scope", _.bind(this._onScope, this)).now();
}

protoclass(bindable.Object, BaseController, {

  /**
   */

  initialize: function () {

  },

  /**
   */

  _onScope: function (scope) {

    if (this.scope) this._unbindScope(this.scope);

    if (!this._initialized) {
      this._initialized = true;
      this.initialize();
    }

    if (scope) this._bindScope(this.scope = scope);
  },

  /**
   */

  _bindScope: function (scope) {
    // override me
  },

  /**
   */

  _unbindScope: function (scope) {
    // override me
  }
});

module.exports = BaseController;