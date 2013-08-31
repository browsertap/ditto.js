class DOMClient extends require("../../common/clients")

  ###
  ###

  init: () ->
    for event in ["mousedown", "mouseup", "click", "keydown", "keyup"]
      document.addEventListener event, @_onEvent, true

  ###
  ###

  _onEvent: (event) =>
    @dispatch {
      event: event.type,
      path: null, #xpath
    }


module.exports = DOMClient