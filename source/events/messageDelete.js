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
const { codeBlock, inlineCode } = require("@discordjs/builders");
const { t } = require("i18next");

client.on("messageDelete", async (message) => {
    const serverConf = await guildSchema.findOne({ discordId: message.guildId });

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

    if (logValue != false && client.channels.cache.get(modlogValue)) {
      if (killType != null) {
        let guild = client.guilds.cache.get(message.guild.id);
        let member = await guild.members.fetch(message.member.id);

        const ownerFetch = await guild.fetchOwner();
        if (
          member.id == ownerFetch.id ||
          member.id == client.id ||
          safeBot.some((res) => member.id == res) ||
          safeUser.some((res) => member.id == res) ||
          safeRol.some((res) => member.roles.has(res))
        ) {
          return sendLog.send({
            embeds: [
              embed(
                t("msgDel.infocd", { ns: "events", lng: lang }),
                t("msgDel.title", { ns: "events", lng: lang }),
                t("msgDel.infodesc_safe", { ns: "events", lng: lang, cnt: inlineCode(message.content), chname: inlineCode(message.channel.name), chid: inlineCode(message.channelId), membr: message.member.displayName, membrid: inlineCode(message.member.id) })
              ),
            ],
          });
        }
        if (
          safeBot.some((res) => member.id != res) ||
          safeUser.some((res) => member.id != res) ||
          safeRol.some((res) => !member.roles.has(res)) ||
          member.id != ownerFetch.id ||
          member.id != client.id
        ) {
          if (killType == "kick") {

          }
          return sendLog.send({
            embeds: [
              embed(
                "info",
                "Dela msh!",
                `Deleted: \`${message.content}\`(\`${message.channel.id}\`) is sended.\n> **User:**\n${message.member}(\`${message.member.id}\`)`
              ),
            ],
          });
        }

      } else {
        return
      }
    } else {
      return
    }
})