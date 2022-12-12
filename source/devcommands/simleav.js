const { client } = require("../..");

module.exports = {
    name: "simleave",
  
    async execute(message) {
        client.emit('guildMemberRemove', message.member)
  }
  }