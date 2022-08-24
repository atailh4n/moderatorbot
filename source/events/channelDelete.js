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

client.on("channelDelete", async (channel) => {
  const serverConf = await guildSchema.findOne({ discordId: channel.guild.id });

  let isActivated = serverConf.needed.events.chDel.activated;

  if (isActivated == false) return;

  let logValue = serverConf.needed.systems.logSys;
  let adminRol = serverConf.needed.roles.adminRol;
  let modlogValue = serverConf.needed.texts.modlog;
  let killType = serverConf.needed.events.chDel.killty;
  let safeBot = serverConf.needed.safe.safeBot;
  let safeUser = serverConf.needed.safe.safeUsr;
  let safeRol = serverConf.needed.safe.safeRol;
  let lang = serverConf.needed.systems.langPr;
  let sendLog = client.channels.cache.get(modlogValue);

  const fetchedLogs = await channel.guild.fetchAuditLogs({
    limit: 1,
    type: "CHANNEL_DELETE",
  });

  const deletionLog = fetchedLogs.entries.first();

  if (lang == "en-US") {
    if (!deletionLog) {
      sendLog.send({
        embeds: [
          embed(
            "info",
            "Deleted a channel",
            `${channel}(\`${channel.id}\`) is deleted but we dont know who is deleted. Are you sure that my role is at the top and that I have \`\`\`"ADMINISTRAOR"\`\`\` perm?`
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
          safeBot.some((res) => member.id == res) ||
          safeUser.some((res) => member.id == res) ||
          safeRol.some((res) => member.roles.has(res)) ||
          member.roles.cache.some((res) => res.id == adminRol) ||
          main.datasowner.ownerids.some((res) => member.id == res)
        ) {
          return sendLog.send({
            embeds: [
              embed(
                "info",
                "Deleted a channel",
                `${channel}(\`${channel.id}\`) is deleted.\n> **User:**\n${executor}(\`${executor.id}\`)`
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
          member.roles.cache.some((res) => res.id != adminRol) ||
          main.datasowner.ownerids.some((res) => member.id != res)
        ) {
          if ((killType = "kick")) {
            channel.delete().then(
              member
                .kick({
                  reason:
                    "This user is deleting channel without permission of guild owner. Protected",
                })
                .then(
                  sendLog.send({
                    embeds: [
                      embed(
                        "info",
                        "Deleted a channel without permission",
                        `${channel}(\`${channel.id}\`) is deleted. User is kicked.\n> **User:**\n${executor}(\`${executor.id}\`)`
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
                    "This user is deleting channel without permission of guild owner. Protected",
                })
                .then(
                  modlogValue.send({
                    embeds: [
                      embed(
                        "info",
                        "Deleted a channel without permission",
                        `${channel}(\`${channel.id}\`) is deleted. User is banned.\n> **User:**\n${executor}(\`${executor.id}\`)`
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
              "Deleted a channel",
              `${channel}(\`${channel.id}\`) is deleted but can't find punishment type./No punishment selected.\n> **User:** ${executor}(\`${executor.id}\`)`
            ),
          ],
        });
      }
    } else {
      return;
    }
  } else if (lang == "tr") {
    if (!deletionLog) {
      sendLog.send({
        embeds: [
          embed(
            "info_tr",
            "Kanal silindi",
            `${channel}(\`${channel.id}\`) adlı kanal silindi ancak kimin sildiği bilinmiyor. Rolümün en üstte olduğundan ve \`\`\`"ADMINISTRAOR"\`\`\` iznim olduğundan emin misin?`
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
          safeBot.some((res) => member.id == res) ||
          safeUser.some((res) => member.id == res) ||
          safeRol.some((res) => member.roles.has(res)) ||
          member.roles.cache.some((res) => res.id == adminRol) ||
          main.datasowner.ownerids.some((res) => member.id == res)
        ) {
          return sendLog.send({
            embeds: [
              embed(
                "info_tr",
                "Kanal silindi",
                `${channel}(\`${channel.id}\`) silindi.\n> **Kullanıcı:**\n${executor}(\`${executor.id}\`)`
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
          member.roles.cache.some((res) => res.id != adminRol) ||
          main.datasowner.ownerids.some((res) => member.id != res)
        ) {
          if ((killType = "kick")) {
            channel.delete().then(
              member
                .kick({
                  reason:
                    "Bu kullanıcı sunucu sahibinden izinsiz kanal silindi. Korundu.",
                })
                .then(
                  sendLog.send({
                    embeds: [
                      embed(
                        "info_tr",
                        "İzinsiz kanal silindi",
                        `${channel}(\`${channel.id}\`) silindi. Kullanıcı atıldı.\n> **Kullanıcı:**\n${executor}(\`${executor.id}\`)`
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
                    "Bu kullanıcı sunucu sahibinden izinsiz kanal silindi. Korundu.",
                })
                .then(
                  modlogValue.send({
                    embeds: [
                      embed(
                        "info_tr",
                        "İzinsiz kanal silindi",
                        `${channel}(\`${channel.id}\`) silindi. Kullanıcı banlandı.\n> **Kullanıcı:**\n${executor}(\`${executor.id}\`)`
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
              "info_tr",
              "Kanal silindi",
              `${channel}(\`${channel.id}\`) silindi ancak ceza bulunamadı/Cezalandırma devre dışı.\n> **Kullanıcı:** ${executor}(\`${executor.id}\`)`
            ),
          ],
        });
      }
    } else {
      return;
    }
  }
});
