const { client } = require("../../index");
const main = require("../data/main");
const Discord = require("discord.js");
const moment = require("moment");
const UserModel = require("../models/UserModel");
const GuildModel = require("../models/GuildModel");
const { joinVoiceChannel } = require("@discordjs/voice")
require("moment-duration-format");

client.on("ready", async (client) => {

  const connection = joinVoiceChannel(
    {
        channelId: "1006844255047798805",
        guildId: "877671612156084224",
        adapterCreator: client.guilds.cache.get("877671612156084224").voiceAdapterCreator
    });

  async function updatedInfos() {
    const seksizaman = moment
      .duration(client.uptime)
      .format(" D [Days], H [Hours], m [Mins], s [Secs]");
    const cse = new Discord.MessageEmbed()
      .setColor(main.displaythings.colors.color_main)
      .setTitle(` ${client.user.username} İstatistik`)
      .setThumbnail(client.user.avatarURL())
      .setFooter("©️ 2020-2022 Kokturk Web Software", client.user.avatarURL())

      .setDescription(
        `**Creator of the bot:**\n**Ata İlhan#0528**\n \n**Total User:** __` +
          client.guilds.cache
            .reduce((a, b) => a + b.memberCount, 0)
            .toLocaleString() +
          `\n__**Total Server:** __` +
          client.guilds.cache.size.toLocaleString() +
          `\n__**Total Channel:** __` +
          client.channels.cache.size.toLocaleString() +
          `__\n \n` +
          `**RAM Usage: **__` +
          (process.memoryUsage().heapUsed / 1024 / 512).toFixed(2) +
          ` MB__\n` +
          `**Uptime: **__${seksizaman}__\n \n` +
          `**Discord.JS Version:** __v` +
          Discord.version +
          `__`
      );

    let msg = await client.channels.cache
      .get("980851819918024745")
      .messages.fetch("1006478664642330624");

    return await msg.edit({ embeds: [cse] });
  }

  const statusArray = [
    {
      type: "LISTENING",
      content: `/help | Please help to improve us!`,
      status: "dnd",
    },
    {
      type: "WATCHING",
      content: `/help | www.moderatorbot.gq`,
      status: "dnd",
    },
    {
      type: "WATCHING",
      content: `/help | Our Sponsor: www.dostsunucum.com`,
      status: "dnd",
    },
    {
      type: "LISTENING",
      content: `/help | Our Sponsor: www.dostsunucum.com`,
      status: "dnd",
    },
    {
      type: "PLAYING",
      content: `/help | Fully Turkish🇹🇷 and English🇺🇸 Moderation Bot`,
      status: "dnd",
    },
    {
      type: "WATCHING",
      content: `/help | Version: ${main.displaythings.info.version}`,
      status: "dnd",
    },
    {
      type: "WATCHING",
      content: `/help | Always Stay Safe!`,
      status: "dnd",
    },
  ];
  async function pickPresence() {
    const option = Math.floor(Math.random() * statusArray.length);
    try {
      await client.user.setPresence({
        activities: [
          {
            name: statusArray[option].content,
            type: statusArray[option].type,
            url: statusArray[option].url,
          },
        ],
        status: statusArray[option].status,
      });
    } catch (error) {
      console.error(error);
    }
  }

  pickPresence();
  setInterval(pickPresence, 1000 * 60 * 120);
  updatedInfos();
  setInterval(updatedInfos, 1000 * 60 * 5);

  console.log("🆔[LOGIN/READY]Logged as: " + client.user.username);
});
