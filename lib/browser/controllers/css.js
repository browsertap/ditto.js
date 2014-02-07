var _          = require("underscore"),
BaseController = require("./base");

function CssController () {
  BaseController.apply(this, arguments);
}

BaseController.extend(CssController, {

  /**
   */

  _bindScope: function (scope) {
    var self = this;
    scope.on("fileChanged", function(options) {
      if (options.type !== "css") return;
      self._onCssChange();
    })
  },

  /**
   */

  _onCssChange: function () {

    var links = Array.prototype.slice.call(document.getElementsByTagName("link"), 0).filter(function (link) {
      return link.getAttribute("rel") === "stylesheet";
    });

    for (var i = 0; i < links.length; i++) {

      var link   = links[i],
      parentNode = link.parentNode,
      linkClone  = link.cloneNode();

      // need to bust the cache for some browsers
      linkClone.setAttribute("href", linkClone.getAttribute("href").replace(/\?.*/, "") + "?" + Date.now())

      // remove the old link
      // parentNode.removeChild(link);

      // set the new one - new changes
      parentNode.appendChild(linkClone);

      this._removeLater(link);
    }
  },

  /**
   */

  _removeLater: function (node) {
    setTimeout(function () {
      node.parentNode.removeChild(node);
    }, 500);
  }
});

module.exports = function (hotswap) {
  return new CssController(hotswap);
}