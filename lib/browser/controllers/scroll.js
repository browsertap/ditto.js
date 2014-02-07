var BaseController = require("./base"),
_                  = require("underscore");



function ScrollController () {
  BaseController.apply(this, arguments);
}

BaseController.extend(ScrollController, {

  /**
   */

  initialize: function () {
    $(document).scroll(_.bind(this._onScroll, this));
  },  

  /**
   */

  _bindScope: function (scope) {  
    var self = this;
    scope.bind("scroll.top, scroll.left", function (top, left) {
      if (self.hotswap.focused) return;
      $(document).scrollTop(top);
      $(document).scrollLeft(left);
    });
  },

  /**
   */

  _onScroll: function () {
    this.scope.set("scroll.top", $(document).scrollTop());
    this.scope.set("scroll.left", $(document).scrollLeft());
  }
});

module.exports = function (hotswap) {
  return new ScrollController(hotswap);
}