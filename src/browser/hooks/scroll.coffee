Client = require "../../common/clients/base"
client = new Client()

_ignoreScroll = false


onEvent = () ->  
  return if _ignoreScroll

  $d = $(document)


  client.dispatch {
    event: "scroll",
    data: {
      top: $d.scrollTop(),
      left: $d.scrollLeft()
    }
  }


$(document).scroll onEvent

handle = (payload) ->
  _ignoreScroll = true
  $(document).scrollTop payload.data.top
  $(document).scrollLeft payload.data.left
  _ignoreScroll = false

module.exports = {
  handler: handle
  dispatcher: client
}