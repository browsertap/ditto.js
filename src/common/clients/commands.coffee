class CommandsClient extends require("./base")

  ###
  ###

  constructor: () ->
    super()
    @_commands = {}
    @observe @handle

  ###
  ###

  register: (commands, listener) ->
    for command in commands.split(" ")
      @_commands[command] = listener

  ###
  ###

  handle: (data) =>
    listener = @_commands[data.event] ? @_commands["*"]
    return unless listener
    listener data


module.exports = CommandsClient