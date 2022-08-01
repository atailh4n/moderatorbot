module.exports = {
  name: "leav",

  async execute(message) {
      const main = require("../data/main");
const guild = message.guild;
if(!main.datasowner.ownerids.includes(message.author.id)) return;
      guild.leave().then(message.author.send("ayrıldım"));
}
}