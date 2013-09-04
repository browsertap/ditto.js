

class RemoteClient extends require("../../common/clients/base")

  ###
  ###

  constructor: (@_source) ->
    super()
    @_s = new SockJS @_source
    @_s.onmessage = @_onMessage
    @_s.onopen    = @_onOpen

  ###
  ###

  handle: (data) ->
    @_s.send JSON.stringify data

  ###
  ###

  _onMessage: (message) =>
    payload = JSON.parse message.data
    @dispatch payload

  ###
  ###

  _onOpen: () =>

    @dispatch { 
      event: "platform",
      data: String(navigator.userAgent)
    }



module.exports = RemoteClient