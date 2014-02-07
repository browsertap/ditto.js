var http  = require("http"),
httpProxy = require("http-proxy"),
Url       = require("url"),
connect   = require("connect"),
adapters  = require("../adapters");

module.exports = function (options, ditto) {

  var p = httpProxy.createProxyServer({
    target: options.proxy
  });

  connect.createServer(
    adapters(ditto).connect,
    function (req, res, next) {
      var _write = res.write,
      _setHeader = res.setHeader;


      if (~req.headers.accept.indexOf("text/html")) {

        var script = "\n<script type=\"text/javascript\" src=\"/hotswap.js\"></script>\n";

        res.setHeader = function (type, value) {

          if (type == "content-type" && !~value.indexOf("text/html")) {
            // abort! not text/html.
            res.setHeader = _setHeader;
            res._write    = _write;
            return res.setHeader(type, value);
          }

          if (type.toLowerCase() == "content-length") {
            value = String(Number(value) + script.length);
          }

          _setHeader.call(res, type, value);
        };

        res.write = function (data) {
          _write.call(res, String(data).replace("<head>", "<head>" + script));
        }  
      }
      
      next();
    },
    function (req, res) {
      p.web(req, res);
    }
  ).listen(options.port);


  console.log("HTTP server listening on port %d", options.port);
} 