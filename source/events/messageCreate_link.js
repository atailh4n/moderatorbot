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
const guildSchema = require("../models/GuildModel");
const wait = require("node:timers/promises").setTimeout;

client.on("messageCreate", async (message) => {
  /*
  const serverConf = await guildSchema.findOne({ discordId: message.guild.id });
  const userConf = await userSchema.findOne({ discordId: message.author.id });

  let isActivated = serverConf.needed.systems.linkKill;

  //if (isActivated == false) return;

  let logValue = serverConf.needed.systems.logSys;
  let modlogValue = serverConf.needed.texts.modlog;
  let safeLinks = serverConf.needed.safe.safeLink;
  let killType = serverConf.needed.events.msgSnd.killty;
  let safeBot = serverConf.needed.safe.safeBot;
  let safeUser = serverConf.needed.safe.safeUsr;
  let safeRol = serverConf.needed.safe.safeRol;
  let lang = serverConf.needed.systems.langPr;

  let usrwarn = userConf.warns;
  let sendLog = client.channels.cache.get(modlogValue);

  let wrnG = null;
  let wrnA = null;

  for (var i in usrwarn) {
    return wrnG = message.guildId, wrnA = i.warn
  }

  if (
    message.content.includes("http") ||
    message.content.includes("https") ||
    /(https?:\/\/[^\s]+)/g.test(message.content) === true ||
    /(http?:\/\/[^\s]+)/g.test(message.content) === true ||
    /(([a-z]+:\/\/)?(([a-z0-9\-]+\.)+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel|local|internal|tk|ml|gq|ml|co|xyz|tr))(:[0-9]{1,5})?(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&amp;]*)?)?(#[a-zA-Z0-9!$&'()*+.=-_~:@/?]*)?)(\s+|$)/gi.test(
      message.content
    )
  ) {
    if (safeLinks.some((res) => message.content.includes(res))) {
      return;
    } else {
      if (logValue != false && client.channels.cache.get(modlogValue)) {
        if (killType != null) {
          if (killType == "kick") {
            message.delete();
            wait(400);
            message.channel
              .send({
                embeds: [
                  embed(
                    "warn",
                    "You are sended a link.",
                    "please dont send bro"
                  ),
                ],
              })
              .then((x) => setTimeout(() => x.delete(), 5000));
          } else if (killType == "ban") {
            message.delete();
            wait(400);
            message.channel
              .send({
                embeds: [
                  embed(
                    "warn",
                    "You are sended a link.",
                    "please dont send bro"
                  ),
                ],
              })
              .then((x) => setTimeout(() => x.delete(), 5000));
          } else if (killType == "mute") {
            message.delete();
            wait(400);
            message.channel
              .send({
                embeds: [
                  embed(
                    "warn",
                    "You are sended a link.",
                    "please dont send bro"
                  ),
                ],
              })
              .then((x) => setTimeout(() => x.delete(), 5000));
          } else if (killType == "jail") {
            message.delete();
            wait(400);
            message.channel
              .send({
                embeds: [
                  embed(
                    "warn",
                    "You are sended a link.",
                    "please dont send bro"
                  ),
                ],
              })
              .then((x) => setTimeout(() => x.delete(), 5000));
          }
        } else {
          return;
        }
      }
    }
  }
  */

  /*
  if (lang == "en-US") {
    if (
      badWords.some(
        (res) =>
          message.content.includes(res) || message.content.toLowerCase() == res
      )
    ) {
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
  */
});
