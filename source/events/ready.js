const { client } = require("../../index");
const main = require("../data/main");
const Discord = require("discord.js")
const moment = require("moment");
require("moment-duration-format");

client.on("ready", async (client) => {
  client.user.setPresence({
    activities: [{ name: "/help | moderatorbot.gq", type: "WATCHING" }],
    status: "dnd",
  });
  console.log("🆔[LOGIN]Logged as: " + client.user.username);

  const guild = client.guilds.cache.get(main.datasowner.mainserver)
  const channel = guild.channels.cache.get("980851819918024745");

  const seksizaman = moment
  .duration(client.uptime)
  .format(" D [Gün], H [Saat], m [Dakika], s [Saniye]");

  const cse = new Discord.MessageEmbed()
    .setColor(main.displaythings.colors.color_main)
    .setTitle(`${client.user.username} Live Stats`)
    .setThumbnail(client.user.avatarURL())
    .setFooter("2020-2022, Kokturk Web Software", client.user.avatarURL())
    .setDescription(
      `**:eight_pointed_black_star:  Total User:** __` +
      client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString() +
      `\n__**✴  Total Server:** __` +
      client.guilds.cache.size.toLocaleString() +
      `\n__**✴  Total Channel:** __` +
      client.channels.cache.size.toLocaleString() +
      `__\n \n` +
      `✴  **RAM Usage: **__` +
      (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) +
      ` MB__\n` +
      `✴   **Runtime: **__${seksizaman}__\n \n` +
      `✴  **Discord.JS Version:** __v` +
      Discord.version +
      `__`
    )
  channel.send({ content: "LiveSS", embeds: [cse]})

  setInterval(() => {
    channel.lastMessage.edit({ content:"Live Stat", embeds: [cse] })
  }, 15000);
});
