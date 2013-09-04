class CopyClient

  ###
  ###

  constructor: (@_client) ->
    @filter () -> true

  ###
  ###

  filter: (@_filter) ->
    @

  ###
  ###

  to: (client) ->
    @_observer = @_client.observe (data) =>
      return unless @_filter data
      client.handle data
    @

  ###
  ###

  from: (client) ->
    @_observer = client.observe (data) =>
      return unless @_filter data
      @_client.handle data
    @

  ###
  ###

  dispose: () ->
    @_observer?.dispose()
    @_observer = undefined

module.exports = CopyClient