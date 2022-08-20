const { client } = require("../..");

module.exports = {
    name: "simjoin",
  
    async execute(message) {
        client.emit('guildMemberAdd', message.member)
  }
  }