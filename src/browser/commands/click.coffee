module.exports = (payload) ->
  $e = $(document).xpath(payload.data.path)
  $e.val(payload.data.value)
  $e.trigger("keydown")
  $e.trigger("keyup")