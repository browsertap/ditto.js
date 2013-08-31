class RemoteClient extends require("../../common/clients")

  ###
  ###

  constructor: (@_source) ->
    super()
    @_s = new SockJS @_source
    @_s.onmessage = @_onMessage

  ###
  ###

  dispatch: (data) ->
    @_s.send "event", data

  ###
  ###

  _onMessage: (event) ->
    for observer in @_observers
      observer event.data 



module.exports = RemoteClient