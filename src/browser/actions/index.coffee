fasten = require("fasten")()
type   = require "type-component"


fasten.add("actions", {
  "click": {
    call: (path, next) ->
      $.xpath(path).click()
      next()
  },
  "type": {
    call: (path, next) ->
      ($el = $.xpath(path)).val(path)
      $el.trigger "keydown"
      $el.trigger "keyup"
      next()
  },
  "next": {
    call: (fn, next) -> fn next
  },
  "wait": {
    call: (fn, next) =>

      if type(fn) is "number"
        return setTimeout next, fn

      check = () ->
        if fn()
          next()

        setTimeout 500, next

      check()
  },
  "visit": {
    call: (location, next) =>
      window.location = location
      next()
  }
})


module.exports = fasten.wrap({
  and: (fn) -> 
    fn()
    @
}, "actions")
