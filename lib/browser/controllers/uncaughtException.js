var _          = require("underscore"),
BaseController = require("./base");

function UncaughtExceptionController () {
  BaseController.apply(this, arguments);
}

BaseController.extend(UncaughtExceptionController, {

  /**
   */

  initialize: function () {
    var _onerror = window.onerror;

    // listen for errors thrown in the browser, then relay them back
    // to console log, which should get sent back to the console window
    // where ditto is running ASSUMING the console controller is ALSO
    // installed.
    window.onerror = function (error) {

      console.error(error);

      if (_onerror) {
        _onerror.apply(window, _onerror)
      }
    }
  }
});

module.exports = function (hotswap) {
  return new UncaughtExceptionController(hotswap);
}