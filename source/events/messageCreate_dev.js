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

client.on("messageCreate", async (message) => {
  const prefix = main.datasowner.devprefix;
  const owners = main.datasowner.ownerids;

  if (!message.content.startsWith(prefix)) return;
  if (!main.datasowner.ownerids.includes(message.author.id)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.devcommands.get(commandName);
  if (!command) return;

  try {
    await command.execute(message);
  } catch (error) {
    console.error(error);
  }
});
