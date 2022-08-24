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
const { t } = require("i18next");

client.on("inviteCreate", async (invite) => {
  const serverConf = await guildSchema.findOne({ discordId: invite.guild.id });

  let isActivated = serverConf.needed.events.invCr.activated;

  if (isActivated == false) return;

  let logValue = serverConf.needed.systems.logSys;
  let adminRol = serverConf.needed.roles.adminRol;
  let modlogValue = serverConf.needed.texts.modlog;
  let killType = serverConf.needed.events.invCr.killty;
  let safeBot = serverConf.needed.safe.safeBot;
  let safeUser = serverConf.needed.safe.safeUsr;
  let safeRol = serverConf.needed.safe.safeRol;
  let lang = serverConf.needed.systems.langPr;
  let sendLog = client.channels.cache.get(modlogValue);

  const fetchedLogs = await invite.guild.fetchAuditLogs({
    limit: 1,
    type: "INVITE_CREATE",
  });

  const deletionLog = fetchedLogs.entries.first();

    if (!deletionLog) {
      sendLog.send({
        embeds: [
          embed(
            t("invCr.infocd", { ns: "events", lng: lang }),
            t("invCr.info_title_unc", { ns: "events", lng: lang }),
            t("invCr.info_desc_unc", { ns: "events", lng: lang })
          ),
        ],
      });
    }
    const { target, executor } = deletionLog;
    if (logValue != null && client.channels.cache.get(modlogValue)) {
      if (killType != null) {
        let guild = client.guilds.cache.get(channel.guild.id);
        let member = await guild.members.fetch(executor.id);

        const ownerFetch = await guild.fetchOwner();
        if (
          member.id == ownerFetch.id ||
          member.id == client.id ||
          safeBot.includes(member.id) ||
          safeUser.includes(member.id) ||
          member.roles.cache.hasAny(safeRol) ||
          member.roles.cache.hasAny((res) => res.id == adminRol) ||
          main.datasowner.ownerids.includes(member.id)
        ) {
          return sendLog.send({
            embeds: [
              embed(
                "info",
                "Created a channel",
                `${channel}(\`${channel.id}\`) is created.\n> **User:**\n${executor}(\`${executor.id}\`)`
              ),
            ],
          });
        }
        if (
          safeBot.some((res) => member.id != res) ||
          safeUser.some((res) => member.id != res) ||
          safeRol.some((res) => !member.roles.has(res)) ||
          member.id != ownerFetch.id ||
          member.id != client.id ||
          main.datasowner.ownerids.some((res) => member.id != res)
        ) {
          if ((killType = "kick")) {
            channel.delete().then(
              member
                .kick({
                  reason:
                    "This user is creating channel without permission of guild owner. Protected",
                })
                .then(
                  sendLog.send({
                    embeds: [
                      embed(
                        "info",
                        "Created a channel without permission",
                        `${channel}(\`${channel.id}\`) is created. User is kicked.\n> **User:**\n${executor}(\`${executor.id}\`)`
                      ),
                    ],
                  })
                )
            );
          } else if ((killType = "ban")) {
            channel.delete().then(
              member
                .ban({
                  reason:
                    "This user is creating channel without permission of guild owner. Protected",
                })
                .then(
                  modlogValue.send({
                    embeds: [
                      embed(
                        "info",
                        "Created a channel without permission",
                        `${channel}(\`${channel.id}\`) is created. User is banned.\n> **User:**\n${executor}(\`${executor.id}\`)`
                      ),
                    ],
                  })
                )
            );
          }
        }
      } else {
        return sendLog.send({
          embeds: [
            embed(
              "info",
              "Created a channel",
              `${channel}(\`${channel.id}\`) is created but can't find punishment type./No punishment selected.\n> **User:** ${executor}(\`${executor.id}\`)`
            ),
          ],
        });
      }
    } else {
      return;
    }
});
