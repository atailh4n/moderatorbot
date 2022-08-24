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

client.on("rateLimit", async (RateLimitError) => {
  console.error(
    "❗[RATELIMIT]Bot ratelimited for " +
      RateLimitError.limit.toLocaleString() + " days"
  );
});
