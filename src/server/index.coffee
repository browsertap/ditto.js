express    = require "express"
browserify = require "browserify-middleware"
sockjs     = require "sockjs"
http       = require "http"
Commands   = require "../common/clients/commands"
platform   = require "platform"

module.exports = () ->
  startServer()


class BrowserClient 
  
  ###
  ###

  constructor: (@_siblings, @_con) ->
    @_commands = new Commands()

    @_platform = {
      name: "Browser",
      version: "unknown"
    }

    @_commands.register "log", @_onLog
    @_commands.register "platform", @_onPlatform
    @_commands.register "*", @_onCommand

    @_con.on "data", @_onMessage

  ###
  ###

  dispatch: (payload) =>
    @_con.write JSON.stringify payload

  ###
  ###

  _onMessage: (message) =>
    @_commands.dispatch JSON.parse message

  ###
  ###

  _onLog: (payload) =>
    process.stdout.write "#{@_platform.name}@#{@_platform.version}: "
    console.log payload.data...

  ###
  ###

  _onPlatform: (payload) =>
    @_platform = platform.parse payload.data


  ###
  ###

  _onCommand: (payload) =>
    for client in @_siblings
      continue if client is @
      client.dispatch payload




startServer = () ->
  app = express()
  server = http.createServer app
  app.use("/js/ditto.js", browserify(__dirname + "/../browser/index.js"))
  app.use(express.static(__dirname + "/public"));
  sock = sockjs.createServer({sockjs_url: "http://cdn.sockjs.org/sockjs-0.3.min.js"})

  clients = []

  sock.on("connection", (con) ->
    clients.push new BrowserClient clients, con
  )


  sock.installHandlers(server, { prefix: '/sock' })
  server.listen(8083)
  app