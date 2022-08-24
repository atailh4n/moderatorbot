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

client.on("messageDelete", async (message) => {
    const serverConf = await guildSchema.findOne({ discordId: message.guild.id });

    let isActivated = serverConf.needed.events.msgDel.activated;
  
    if (isActivated == false) return;
  
    let logValue = serverConf.needed.systems.logSys;
    let adminRol = serverConf.needed.roles.adminRol;
    let modlogValue = serverConf.needed.texts.modlog;
    let killType = serverConf.needed.events.msgDel.killty;
    let safeBot = serverConf.needed.safe.safeBot;
    let safeUser = serverConf.needed.safe.safeUsr;
    let safeRol = serverConf.needed.safe.safeRol;
    let lang = serverConf.needed.systems.langPr;
    let sendLog = client.channels.cache.get(modlogValue);
  
    const fetchedLogs = await message.guild.fetchAuditLogs({
      limit: 1,
      type: "MESSAGE_DELETE",
    });
  
    const deletionLog = fetchedLogs.entries.first();

    console.log(deletionLog);
})