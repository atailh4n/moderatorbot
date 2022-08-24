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

client.on("guildBanAdd", async (ban) => {
  const serverConf = await guildSchema.findOne({ discordId: ban.guild.id });

  let isActivated = serverConf.needed.events.banAdd.activated;

  if (isActivated == false) return;

  let logValue = serverConf.needed.systems.logSys;
  let adminRol = serverConf.needed.roles.adminRol;
  let modlogValue = serverConf.needed.texts.modlog;
  let killType = serverConf.needed.events.banAdd.killty;
  let safeBot = serverConf.needed.safe.safeBot;
  let safeUser = serverConf.needed.safe.safeUsr;
  let safeRol = serverConf.needed.safe.safeRol;
  let lang = serverConf.needed.systems.langPr;
  let sendLog = client.channels.cache.get(modlogValue);

  const fetchedLogs = await ban.guild.fetchAuditLogs({
    limit: 1,
    type: "MEMBER_BAN_ADD"
  });

  const deletionLog = fetchedLogs.entries.first();

  if (lang == "en-US") {
    if (!deletionLog) {
      sendLog.send({
        embeds: [
          embed(
            "info",
            "Banned a user",
            `${ban}(\`${ban.id}\`) is banned but we dont know who is banned. Are you sure that my role is at the top and that I have \`\`\`"ADMINISTRAOR"\`\`\` perm?`
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
                "Banned a user",
                `${ban}(\`${ban.id}\`) is banned.\n> **User:**\n${executor}(\`${executor.id}\`)`
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
                    "This user is banning users without permission of guild owner. Protected",
                })
                .then(
                  sendLog.send({
                    embeds: [
                      embed(
                        "info",
                        "Banned a user without permission",
                        `${ban}(\`${ban.id}\`) is banned. User is kicked.\n> **User who banned:**\n${executor}(\`${executor.id}\`)`
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
                    "This user is banning users without permission of guild owner. Protected",
                })
                .then(
                  modlogValue.send({
                    embeds: [
                      embed(
                        "info",
                        "Banned a user without permission",
                        `${ban}(\`${ban.id}\`) is banned. User is banned.\n> **User who banned:**\n${executor}(\`${executor.id}\`)`
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
              "Banned a user",
              `${ban}(\`${ban.id}\`) is banned but can't find punishment type./No punishment selected.\n> **User who banned:** ${executor}(\`${executor.id}\`)`
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
            "Kullanıcı yasaklandı",
            `${ban}(\`${ban.id}\`) adlı kullanıcı yasaklandı ancak kimin güncellediği bilinmiyor. Rolümün en üstte olduğundan ve \`\`\`"ADMINISTRAOR"\`\`\` iznim olduğundan emin misin?`
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
                "Kullanıcı yasaklandı",
                `${ban}(\`${ban.id}\`) adlı kullanıcı yasaklandı.\n> **Yasaklayan kullanıcı:**\n${executor}(\`${executor.id}\`)`
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
                    "Bu kullanıcı sunucu sahibinden izinsiz yasaklama yaptı. Korundu.",
                })
                .then(
                  sendLog.send({
                    embeds: [
                      embed(
                        "info_tr",
                        "İzinsiz kullanıcı yasaklandı",
                        `${ban}(\`${ban.id}\`) adlı kullanıcı izinsiz yasaklandı. Kullanıcı atıldı.\n> **Yasaklayan kullanıcı:**\n${executor}(\`${executor.id}\`)`
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
                    "Bu kullanıcı sunucu sahibinden izinsiz kullanıcı yasakladı. Korundu.",
                })
                .then(
                  modlogValue.send({
                    embeds: [
                      embed(
                        "info_tr",
                        "İzinsiz kullanıcı yasaklandı",
                        `${ban}(\`${ban.id}\`) adlı kullanıcı izinsiz yasaklandı. Kullanıcı banlandı.\n> **Yasaklayan kullanıcı:**\n${executor}(\`${executor.id}\`)`
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
              "Kullanıcı yasaklandı",
              `${ban}(\`${ban.id}\`) yasaklandı ancak ceza bulunamadı/Cezalandırma devre dışı.\n> **Yasaklayan Kullanıcı:** ${executor}(\`${executor.id}\`)`
            ),
          ],
        });
      }
    } else {
      return;
    }
  }
});
