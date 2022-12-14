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

client.on("guildUpdate", async (oldGuild, newGuild) => {
  const serverConf = await guildSchema.findOne({ discordId: newGuild.id });

  let isActivated = serverConf.needed.events.guildUp.activated;

  if (isActivated == false) return;

  let logValue = serverConf.needed.systems.logSys;
  let adminRol = serverConf.needed.roles.adminRol;
  let modlogValue = serverConf.needed.texts.modlog;
  let killType = serverConf.needed.events.guildUp.killty;
  let safeBot = serverConf.needed.safe.safeBot;
  let safeUser = serverConf.needed.safe.safeUsr;
  let safeRol = serverConf.needed.safe.safeRol;
  let lang = serverConf.needed.systems.langPr;
  let sendLog = client.channels.cache.get(modlogValue);

  const fetchedLogs = await newGuild.fetchAuditLogs({
    limit: 1,
    type: "GUILD_UPDATE",
  });

  const deletionLog = fetchedLogs.entries.first();

  if (lang == "en-US") {
    if (!deletionLog) {
      sendLog.send({
        embeds: [
          embed(
            "info",
            "Guild updated",
            `${newGuild.name}(\`${newGuild.id}\`) is updated some settings but we dont know who is updated. Are you sure that my role is at the top and that I have \`\`\`"ADMINISTRAOR"\`\`\` perm?`
          ),
        ],
      });
    }
    const { target, executor } = deletionLog;
    if (logValue != null && client.channels.cache.get(modlogValue)) {
      if (killType != null) {
        let guild = client.guilds.cache.get(newGuild.id);
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
                "Guild updated",
                `${newGuild.name}(\`${newGuild.id}\`) is updated.\n> **User:**\n${executor}(\`${executor.id}\`)`
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
                    "This user is updating guild without permission of guild owner. Protected",
                })
                .then(
                  sendLog.send({
                    embeds: [
                      embed(
                        "info",
                        "Updated guild without permission",
                        `${newGuild.name}(\`${newGuild.id}\`) is updated. User is kicked.\n> **User:**\n${executor}(\`${executor.id}\`)`
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
                    "This user is updating guild without permission of guild owner. Protected",
                })
                .then(
                  modlogValue.send({
                    embeds: [
                      embed(
                        "info",
                        "Updated guild without permission",
                        `${newGuild.name}(\`${newGuild.id}\`) is updated. User is banned.\n> **User:**\n${executor}(\`${executor.id}\`)`
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
              "Updated guild",
              `${newGuild.name}(\`${newGuild.id}\`) is updated but can't find punishment type./No punishment selected.\n> **User:** ${executor}(\`${executor.id}\`)`
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
            "Sunucu g??ncellendi",
            `${newGuild.name}(\`${newGuild.id}\`) adl?? kanal olu??turuldu ancak kimin olu??turuldu??u bilinmiyor. Rol??m??n en ??stte oldu??undan ve \`\`\`"ADMINISTRAOR"\`\`\` iznim oldu??undan emin misin?`
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
                "Sunucu g??ncellendi",
                `${newGuild.name}(\`${newGuild.id}\`) g??ncellendi.\n> **Kullan??c??:**\n${executor}(\`${executor.id}\`)`
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
                    "Bu kullan??c?? sunucu sahibinden izinsiz sunucuyu g??ncelledi. Korundu.",
                })
                .then(
                  sendLog.send({
                    embeds: [
                      embed(
                        "info_tr",
                        "??zinsiz sunucu g??ncellendi",
                        `${newGuild.name}(\`${newGuild.id}\`) olu??turuldu. Kullan??c?? at??ld??.\n> **Kullan??c??:**\n${executor}(\`${executor.id}\`)`
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
                    "Bu kullan??c?? sunucu sahibinden izinsiz sunucuyu g??ncelledi. Korundu.",
                })
                .then(
                  modlogValue.send({
                    embeds: [
                      embed(
                        "info_tr",
                        "??zinsiz sunucu g??ncellendi",
                        `${newGuild.name}(\`${newGuild.id}\`) g??ncellendi. Kullan??c?? banland??.\n> **Kullan??c??:**\n${executor}(\`${executor.id}\`)`
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
              "Sunucu g??ncellendi",
              `${newGuild.name}(\`${newGuild.id}\`) g??ncellendi ancak ceza bulunamad??/Cezaland??rma devre d??????.\n> **Kullan??c??:** ${executor}(\`${executor.id}\`)`
            ),
          ],
        });
      }
    } else {
      return;
    }
  }
});
