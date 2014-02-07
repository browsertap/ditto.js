var protoclass = require("protoclass"),
_              = require("underscore"),
BaseController = require("./base"),
gaze           = require("gaze"),
path           = require("path");

function FileWatchController () {
  BaseController.apply(this, arguments);
}


var mimeTypes = {
  "less": "css",
  "styl": "css",
  "css": "css"
}

BaseController.extend(FileWatchController, {

  /**
   */

  initialize: function () {

    var ops = this.hotswap.options.watch;

    if (!ops) return;


    var tops = {};

    if (typeof ops == "string") {
      tops.pattern = ops;
    } else {
      tops = ops;
    }

    tops.tester = this._getTester(tops.test);


    if (this.hotswap.verbose) {
      console.log("Watching directory %s for any changes", tops.pattern.green);
    }

    this.tops = tops;
    gaze(tops.pattern, _.bind(this._onWatcher, this));
  },

  /**
   */

  _onWatcher: function (err, watcher) {
    var self = this;
    watcher.on("all", function (err, file) {
      if (!self.tops.tester.test(file)) return;

      if (self.hotswap.verbose) {
        console.log("changed: %s", file.green);
      }

      var ext = path.extname(file).substr(1);

      self.scope.emit("fileChanged", {
        ext: ext,
        type: mimeTypes[ext] || ext
      });
    })  
  },


  /**
   */

  _getTester: function (op) {
    if (op && op.test) {
      return op;
    }
    return {
      test: function () { return true; }
    }
  }
});

module.exports = function (hotswap) {
  return new FileWatchController(hotswap);
}