class LogClient extends require("../../common/clients/base")
  
  ###
  ###

  constructor: () ->
    super()
    @_shim()


  ###
  ###

  handle: (payload) =>
    @_ignoreDispatch = true
    console.log payload.data...
    @_ignoreDispatch = false

  ###
  ###

  _shim: () ->
    oldLog = console.log
    console.log = () =>
      oldLog.apply console, arguments
      return if @_ignoreDispatch
      @dispatch { event: "log", data: Array.prototype.slice.call(arguments, 0) }


module.exports = LogClient