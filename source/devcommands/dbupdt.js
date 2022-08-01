module.exports = {
  name: "dbupdt",

  async execute(message) {
    const guildSchema = require("../models/GuildModel");
    const userSchema = require('../models/UserModel');
    const { client } = require("../../index");
    const main = require("../data/main");
    const embed = require("../data/embeds");
    const Discord = require("discord.js");

    const splitted = message.content.split(' ');
    
    if (splitted[1] && splitted[2] && splitted[3] && splitted[4] && splitted[5] == null) return message.channel.send('enter args ```md.dbupdt userdb/guilddb discordId type(push, set) key data```');
    const idToChange = splitted[2].toString();
    const __typeToChange = splitted[3].toString();
    const keyToChange = splitted[4].toString();
    const dataToChange = splitted[5].toString();

    if (splitted[1] == "guilddb") {
      
      await guildSchema.findOneAndUpdate({ discordId: idToChange }, { $set: { keyToChange: dataToChange }}, { new: true }).then((err, data) => {
        if (err) {
          message.channel.send(err)
        } else if (data) {
          message.channel.send('data successfully send')
        }
      });

    } else if (splitted[1] = "userdb") {

      await userSchema.findOneAndUpdate({ discordId: idToChange }, { $set: { keyToChange: dataToChange }}, { new: true }).then((err, data) => {
        if (err) {
          message.channel.send(err)
        } else if (data) {
          message.channel.send('data successfully send')
        }
      });

    }

  },
};
