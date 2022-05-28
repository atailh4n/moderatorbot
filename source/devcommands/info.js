module.exports = {
  name: "info",

  async execute(interaction) {
    const guildSchema = require("../models/GuildModel");
    const { client } = require("../../index");
    const main = require("../data/main");
    const embed = require("../data/embeds");
    const Discord = require("discord.js");
    const moment = require("moment");
    require("moment-duration-format");

    const duration = moment
      .duration(client.uptime)
      .format(" D [gün], H [saat], m [dakika], s [saniye]");
    interaction.reply(`= İstatistikler =
• Bellek kullanımı :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
• Kullanıcılar     :: ${client.users.cache.size}
• Sunucular        :: ${client.guilds.cache.size}
• Kanallar         :: ${client.channels.cache.size}
• Ping             :: ${client.ws.ping}`);
  },
};
