Client = require "../../common/clients/base"
client = new Client()
findXPath = require "./findXPath"

handleEvent = (event) ->
  client.dispatch {
    event: event.type,
    data: {
      path: if event.target then findXPath(event.target) else undefined,
      value: String($(event.target).val())
    }
  }


for event in @_events = ["mousedown", "mouseup", "click", "keydown", "keyup"]
  document.addEventListener event, handleEvent, true

module.exports = {
  dispatcher: client
}