var protoclass = require("protoclass"),
dnode          = require("dnode"),
shoe           = require("shoe"),
events         = require("events");

function Connection (options) {
  this.port = options.port || window.location.port;
  this.path = options.path || "/ditto/dnode";
}

protoclass(events.EventEmitter, Connection, {

  /**
   */

  connect: function () {
    var stream = shoe(window.location.protocol + "//" + window.location.hostname + ":" + this.port + this.path),
    d          = dnode(),
    self       = this;

    d.on("remote", function (remote) {
        
      if (self.connected) {
        self.emit("reconnect");
      }

      self.connected = true;

      self.emit("scope", remote);
    });

    stream.on("end", function () {
      setTimeout(function () {
        self.connect();
      }, 500);
    })

    d.pipe(stream).pipe(d);
  }
});

module.exports = Connection;