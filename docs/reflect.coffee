# SERVER

express = require("express")
ditto   = require("ditto")

actions  = new ditto.Actions()

express().
use(actions.middleware).
listen(8080)


# copying user interactions


client = new ditto.Client()
remote = new ditto.RemoteClient("http://localhost:8080")
client.copy().from(new ditto.DOMClient())
client.copy().filter((event, data) ->
  data.source isnt client._id
).from(remote)
client.copy().to(remote).to(ditto.actions)


ditto.actions.type("input", "blah").click("submit")





