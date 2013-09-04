events      = require "events"
CopyClient  = require "./copy"

_id = 

class BaseClient

  ###
  ###

  constructor: () ->
    @_id = Number(Date.now()) + "_" + Math.round(Math.random() * 999999999)
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

    unless data.origin
      data.origin = @_id

    for observer in @_observers
      observer data

  ###
  ###

  handle: (data) =>

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
  

module.exports = BaseClient