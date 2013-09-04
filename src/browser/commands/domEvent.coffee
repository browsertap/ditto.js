module.exports = (payload) =>
  $(document).xpath(payload.data.path).trigger(payload.event)
