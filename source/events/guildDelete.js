const embed = require("../data/embeds");
const main = require("../data/main");
const {
  MessageActionRow,
  MessageButton,
  MessageEmbed,
  Formatters,
} = require("discord.js");
const { client } = require("../../index");
const userSchema = require("../models/UserModel");
const discordModal = require("discord-modals");
const guildSchema = require("../models/GuildModel");

client.on("guildDelete", async (guild) => {
  await guildSchema
    .deleteMany({ discordId: guild.id })
    .then(console.log("🔽[LEAVED SERVER] Leaved from " + guild.name));
});
