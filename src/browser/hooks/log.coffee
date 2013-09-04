Client = require "../../common/clients/base"
client = new Client()

oldLog = console.log

handle = (payload) ->
  oldLog.apply console payload.data...


console.__log = oldLog

console.log = () =>
  oldLog.apply console, arguments
  client.dispatch { event: "log", data: Array.prototype.slice.call(arguments, 0) }

module.exports = {
  dispatcher: client,
  handler: handle
}