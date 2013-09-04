findXPath = require "./findXPath"

class DOMClient extends require("../../../common/clients/base")

  ###
  ###

  init: () ->
    for event in @_events = ["mousedown", "mouseup", "click", "keydown", "keyup"]
      document.addEventListener event, @_onEvent, true

  ###
  ###

  handle: (payload) ->

    e = payload.event
    return unless payload.data?.path
    @_ignoreEvent = true
    $e = $(document).xpath(payload.data.path)


    if /keydown|keyup/.test e
      $e.val(payload.data.value)
      $e.trigger("keydown")
      $e.trigger("keyup")
    else
      $e.trigger e

    @_ignoreEvent = false

  ###
  ###

  _onEvent: (event) =>
    return if @_ignoreEvent
    @dispatch {
      event: event.type,
      data: {
        path: if event.target then findXPath(event.target) else undefined,
        value: String($(event.target).val())
      }
    }


module.exports = DOMClient