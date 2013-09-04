actions      = require "./actions"
Commands     = require "../common/clients/commands"
RemoteClient = require "./clients/remote"
Logger       = require "./clients/logger"
DOMClient    = require "./clients/dom"
xpgen        = require "xpgen"

hooks        = require "./hooks"


onKeyUp        = require "./commands/keyup"
onDomEvent     = require "./commands/domEvent"

class Ditto

  ###
  ###

  constructor: () ->
    @actions  = actions
    @commands = new Commands()

    @commands.register "keyup keydown", onKeyUp
    @commands.register "click mousedown mouseup", onDomEvent
    @commands.register "scroll", hooks.scroll.handler

    rc = new RemoteClient("http://localhost:8083/sock")
    rc.copy().to(@commands)


    for hookName of hooks
      hooks[hookName].dispatcher.copy().to(rc)


window.xpgen = xpgen()
module.exports = window.ditto = new Ditto()