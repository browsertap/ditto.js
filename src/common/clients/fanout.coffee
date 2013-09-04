class Fanout extends require("./base")
  
  ###
  ###

  constructor: () ->
    super()
    @_clients = []

  ###
  ###

  add: (client) ->
    @_clients.push client


  ###
  ###

  remove: (client) ->
    return unless ~(i = @_clients.indexOf(client))
    @_clients.splice(i, 1)


  ###
  ###

  dispatch: (data) -> 
    for client in @_clients