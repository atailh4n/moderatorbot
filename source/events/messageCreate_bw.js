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
  const serverConf = await guildSchema.findOne({ discordId: message.guild.id });

  let isActivated = serverConf.needed.events.chCr.activated;

  if (isActivated == false) return;

  let logValue = serverConf.needed.systems.logSys;
  let modlogValue = serverConf.needed.texts.modlog;
  let badWkiller = serverConf.needed.events.msgSnd.badWordPr;
  let killType = serverConf.needed.events.msgSnd.killty;
  let safeBot = serverConf.needed.safe.safeBot;
  let safeUser = serverConf.needed.safe.safeUsr;
  let safeRol = serverConf.needed.safe.safeRol;
  let lang = serverConf.needed.systems.langPr;
  let sendLog = client.channels.cache.get(modlogValue);

  const badWords = require("../models/BadWordModel");

  if (lang == "en") {
    if (
      badWords.some(
        (res) =>
          message.content.includes(res) || message.content.toLowerCase() == res
      )
    ) {
      if (logValue != false && client.channels.cache.get(modlogValue)) {
        if (killType != null) {
          let guild = client.guilds.cache.get(channel.guild.id);
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
                  "info",
                  "Sended a bad word!",
                  `\`${message.content}\`(\`${message.channel.id}\`) is sended.\n> **User:**\n${message.member}(\`${message.member.id}\`)`
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
            if ((killType = "kick")) {
              channel.delete().then(
                member
                  .kick({
                    reason:
                      "This user is sayin badwords without permission of guild owner. Protected",
                  })
                  .then(
                    sendLog.send({
                      embeds: [
                        embed(
                          "info",
                          "Sayed a badword without permission",
                          `\`${message.content}\`(\`${message.channel.id}\`) is sayed. User is kicked.\n> **User:**\n${message.member}(\`${message.member.id}\`)`
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
                      "This user is saying badword without permission of guild owner. Protected",
                  })
                  .then(
                    modlogValue.send({
                      embeds: [
                        embed(
                          "info",
                          "Sayed a badword without permission",
                          `\`${message.content}\`(\`${message.channel.id}\`) is created. User is banned.\n> **User:**\n${message.member}(\`${message.member.id}\`)`
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
                "Sayed a badword!",
                `${message.content}(\`${message.member.id}\`) is sayed but can't find punishment type.\n> **User:** ${message.member}(\`${message.member.id}\`)`
              ),
            ],
          });
        }
      } else {
        return;
      }
    } else {
      return;
    }
  } else if (lang == "tr") {
    if (
      badWords.some(
        (res) =>
          message.content.includes(res) || message.content.toLowerCase() == res
      )
    ) {
      if (logValue != false && client.channels.cache.get(modlogValue)) {
        if (killType != null) {
          let guild = client.guilds.cache.get(channel.guild.id);
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
                  "info_tr",
                  "Küfür edildi",
                  `\`${message.content}\`(\`${message.channel}\`) küfür edildi.\n> **Kullanıcı:**\n${message.member}(\`${message.member.id}\`)`
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
              channel.delete().then(
                member
                  .kick({
                    reason:
                      "Bu kullanıcı sunucu sahibinden izinsiz küfür etti. Korundu",
                  })
                  .then(
                    sendLog.send({
                      embeds: [
                        embed(
                          "info_tr",
                          "İzinsiz küfür edildi",
                          `\`${message.content}\`(\`${message.channel}\`) küfür edildi. Kullanıcı atıldı.\n> **Kullanıcı:**\n${message.member}(\`${message.member.id}\`)`
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
                      "Bu kullanıcı sunucu sahibinden izinsiz küfür etti. Korundu",
                  })
                  .then(
                    modlogValue.send({
                      embeds: [
                        embed(
                          "info_tr",
                          "İzinsiz küfür edildi",
                          `\`${message.content}\`(\`${message.channel}\`) küfür edildi. Kullanıcı banlandı.\n> **Kullanıcı:**\n${message.member}(\`${message.member.id}\`)`
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
                "Küfür edildi",
                `${message.content}(\`${message.member}\`) küfür etti ancak ceza bulunamadı./Cezalandırma devre dışı.\n> **Kullanıcı:** ${message.member}(\`${message.member.id}\`)`
              ),
            ],
          });
        }
      } else {
        return;
      }
    } else {
      return;
    }
  }
});
