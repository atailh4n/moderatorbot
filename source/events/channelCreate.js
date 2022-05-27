const guildSchema = require('../models/GuildModel');
const { client } = require('../../index');
const main = require('../data/main');
const Discord = require('discord.js');
const embed = require('../data/embeds');

client.on("channelCreate", async channel => {

const serverConf = await guildSchema.findOne({ discordId: channel.guild.id });

  let logValue = serverConf.needed.systems.logSys;
  let modlogValue = serverConf.needed.texts.modlog;
  let killType = serverConf.needed.events.chCr.killty;
  let safeBot = serverConf.needed.safe.safeBot;
  let safeUser = serverConf.needed.safe.safeUsr;
  let safeRol = serverConf.needed.safe.safeRol;
  let lang = serverConf.needed.systems.langPr;
  let sendLog = client.channels.cache.get(modlogValue);

  const fetchedLogs = await channel.guild.fetchAuditLogs({
    limit: 1,
    type: "CHANNEL_CREATE"
  });

  const deletionLog = fetchedLogs.entries.first();

  if (lang == "en") {

    if (!deletionLog) {
        sendLog.send({
          embeds: [
            embed(
              "info",
              "Created a channel",
              `${channel}(\`${channel.id}\`) is created but we dont know who is created. Are you sure that my role is at the top and that I have \`\`\`"ADMINISTRAOR"\`\`\` perm?`
            )
          ]
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
            safeBot.some(res => member.id == res) ||
            safeUser.some(res => member.id == res) ||
            safeRol.some(res => member.roles.has(res))
          ) {
            return sendLog.send({
              embeds: [
                embed(
                  "info",
                  "Created a channel",
                  `${channel}(\`${channel.id}\`) is created.\n> **User:**\n${executor}(\`${executor.id}\`)`
                )
              ]
            });
          }
          if (
            safeBot.some(res => member.id != res) ||
            safeUser.some(res => member.id != res) ||
            safeRol.some(res => !member.roles.has(res)) ||
            member.id != ownerFetch.id ||
            member.id != client.id
          ) {
            if ((killType = "kick")) {
              channel.delete().then(
                member
                  .kick({
                    reason:
                      "This user is creating channel without permission of guild owner. Protected"
                  })
                  .then(
                    sendLog.send({
                      embeds: [
                        embed(
                          "info",
                          "Created a channel without permission",
                          `${channel}(\`${channel.id}\`) is created. User is kicked.\n> **User:**\n${executor}(\`${executor.id}\`)`
                        )
                      ]
                    })
                  )
              );
            } else if ((killType = "ban")) {
              channel.delete().then(
                member
                  .ban({
                    reason:
                      "This user is creating channel without permission of guild owner. Protected"
                  })
                  .then(
                    modlogValue.send({
                      embeds: [
                        embed(
                          "info",
                          "Created a channel without permission",
                          `${channel}(\`${channel.id}\`) is created. User is banned.\n> **User:**\n${executor}(\`${executor.id}\`)`
                        )
                      ]
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
            )
          ]
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
              "Kanal oluşturuldu",
              `${channel}(\`${channel.id}\`) adlı kanal oluşturuldu ancak kimin oluşturulduğu bilinmiyor. Rolümün en üstte olduğundan ve \`\`\`"ADMINISTRAOR"\`\`\` iznim olduğundan emin misin?`
            )
          ]
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
            safeBot.some(res => member.id == res) ||
            safeUser.some(res => member.id == res) ||
            safeRol.some(res => member.roles.has(res))
          ) {
            return sendLog.send({
              embeds: [
                embed(
                  "info_tr",
                  "Kanal oluşturuldu",
                  `${channel}(\`${channel.id}\`) oluşturuldu.\n> **Kullanıcı:**\n${executor}(\`${executor.id}\`)`
                )
              ]
            });
          }
          if (
            safeBot.some(res => member.id != res) ||
            safeUser.some(res => member.id != res) ||
            safeRol.some(res => !member.roles.has(res)) ||
            member.id != ownerFetch.id ||
            member.id != client.id
          ) {
            if ((killType = "kick")) {
              channel.delete().then(
                member
                  .kick({
                    reason:
                      "Bu kullanıcı sunucu sahibinden izinsiz kanal oluşturdu. Korundu."
                  })
                  .then(
                    sendLog.send({
                      embeds: [
                        embed(
                          "info_tr",
                          "İzinsiz kanal oluşturuldu",
                          `${channel}(\`${channel.id}\`) oluşturuldu. Kullanıcı atıldı.\n> **Kullanıcı:**\n${executor}(\`${executor.id}\`)`
                        )
                      ]
                    })
                  )
              );
            } else if ((killType = "ban")) {
              channel.delete().then(
                member
                  .ban({
                    reason:
                      "Bu kullanıcı sunucu sahibinden izinsiz kanal oluşturdu. Korundu."
                  })
                  .then(
                    modlogValue.send({
                      embeds: [
                        embed(
                          "info_tr",
                          "İzinsiz kanal oluşturuldu",
                          `${channel}(\`${channel.id}\`) Oluşturuldu. Kullanıcı banlandı.\n> **Kullanıcı:**\n${executor}(\`${executor.id}\`)`
                        )
                      ]
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
              "Kanal oluşturuldu",
              `${channel}(\`${channel.id}\`) oluşturuldu ancak ceza bulunamadı/Cezalandırma devre dışı.\n> **Kullanıcı:** ${executor}(\`${executor.id}\`)`
            )
          ]
        });
        }
      } else {
        return;
      }

  }
});