events      = require "events"
CopyEmitter = require "./copy"

_id = Number Date.now()

class BaseClient

  ###
  ###

  constructor: () ->
    @_id = _id++
    @_observers = []

  ###
  ###

  init: () ->

  ###
   copies events from / to this client
  ###

  copy: () -> new CopyClient @

  ###
  ###

  dispatch: (data) -> 
    for observer in @_observers
      observer data

  ###
  ###

  observe: (observer) -> 

    unless @_initialized
      @_initialized = true
      @init()

    @_observers.push observer

    {
      dispose: () ->
        i = @_observers.indexOf(observer)
        return unless ~i
        @_observers.splice(i, 1)
    }
  

module.exports = BaseEmitter