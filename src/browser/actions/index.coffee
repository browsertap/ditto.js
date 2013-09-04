fasten = require("fasten")()
type   = require "type-component"


fasten.add("actions", {
  "click": {
    call: (path, next) ->
      $(document).xpath(path).click()
      next null, @
  },
  "type": {
    call: (path, value, next) ->
      ($el = $(document).xpath(path)).val(value)
      $el.trigger "keydown"
      $el.trigger "keyup"
      next null, @
  },
  "next": {
    call: (fn, next) -> fn () => next null, @
  },
  "wait": {
    call: (fn, next) =>

      if type(fn) is "number"
        return setTimeout next, fn

      check = () =>
        if fn()
          next null, @

        setTimeout 500, next

      check()
  },
  "visit": {
    call: (location, next) =>
      window.location = location
      next()
  },
  "dispatch": {
    call: (data, next) =>
      next null, @
  },
  "handle": {
    call: (data, next) =>
      next null, @
  }
  "find": {
    call: (path, next) ->
      console.log $(document).xpath(path)
      next null, @
  }
})


module.exports = fasten.wrap("actions", {
  and: (fn) -> 
    fn()
    @
})
