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

const davet = new MessageButton()
  .setStyle("LINK")
  .setLabel("Invite Moderator")
  .setEmoji(main.displaythings.emojis.emoj_main)
  .setURL(main.displaythings.cdn.bot_invite);

const supp = new MessageButton()
  .setStyle("LINK")
  .setLabel("Support Server")
  .setEmoji(main.displaythings.emojis.emoj_sup)
  .setURL(main.displaythings.cdn.vote_link);

const site = new MessageButton()
  .setStyle("LINK")
  .setLabel("Web Panel, Privacy Policy, Commands etc.")
  .setEmoji(main.displaythings.emojis.emoj_web)
  .setURL(`https://${main.displaythings.info.bot_website}/`);

const oyver = new MessageButton()
  .setStyle("LINK")
  .setLabel("Vote Moderator")
  .setEmoji(main.displaythings.emojis.emoj_vote)
  .setURL(main.displaythings.cdn.vote_link);

const row = new MessageActionRow().addComponents([davet, supp, site, oyver]);
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  if (!interaction.inGuild()) return;

  if (interaction.isButton) {
    const collector = interaction.channel.createMessageComponentCollector();

    collector.on("collect", async (i) => {
      if (i.customId == "email-button")
        await discordModal.showModal(modal, {
          client: client,
          interaction: interaction,
        });
    });
  }

  const command = await client.commands.get(interaction.commandName);
  let needagreed = command.options.needagreed;
  let permissions = command.options.perms;
  let cooldownconf = command.options.cooldown;

  const userConfig = await userSchema.findOne({
    discordId: interaction.user.id,
  });

  let checkagree = userConfig.rules_accepted;
  let blacklist = userConfig.blacklisted;

  const serverConf = await guildSchema.findOne({
    discordId: interaction.guild.id,
  });
  let lang = serverConf.needed.systems.langPr;

  if (userConfig == null) {
    const document = new userSchema({
      discordId: interaction.user.id,
    });

    await document
      .save()
      .then(
        console.log(
          "🔼[ADDED USER DB] A user added to DB named " +
            interaction.user.username
        )
      );
  }

  if (lang == "en") {
    if (blacklist == false) {
      if (needagreed == true) {
        if (checkagree == true) {
          if (
            permissions.some(
              (res) => interaction.memberPermissions.has(res) || null
            ) == false
          ) {
            return interaction.reply({
              components: `${interaction.user}`,
              embeds: [
                embed(
                  "error",
                  "ERRCD: PERM_ERR",
                  `To run this command, you need this permission(s):\n> \`${command.options.perms.join(
                    ", "
                  )}\``
                ),
              ],
              ephemeral: true,
            });
          } else {
            if (
              client.cooldowns.has(
                `${interaction.commandName}_${interaction.user.id}`
              )
            ) {
              const finish = client.cooldowns.get(
                `${interaction.commandName}_${interaction.user.id}`
              );
              const date = new Date();
              const kalan = (new Date(finish - date).getTime() / 1000).toFixed(
                2
              );
              return interaction.reply({
                content: `${interaction.user}`,
                embeds: [
                  embed(
                    "warn",
                    "You are still in the cooldown",
                    `You are still in the cooldown. Sorry, cooldowns are required to avoid overload.\n\n> Your remaining cooldown:\n` +
                      Formatters.codeBlock(kalan + " seconds")
                  ),
                ],
                ephemeral: true,
              });
            }
            const finish = new Date();
            finish.setSeconds(finish.getSeconds() + cooldownconf);
            try {
              await command
                .execute(interaction)
                .then(
                  console.info(
                    "📌[INTERACTION HANDLER] Command Used: " +
                      interaction.commandName +
                      " by " +
                      interaction.user.id
                  )
                );
            } catch (error) {
              console.error(error);
              await interaction.reply({
                content: `${interaction.user}`,
                embeds: [
                  embed(
                    "error",
                    "ERRCD: RUNTIME_" + error.name.toUpperCase(),
                    `There was an error while executing this command. Contact with developer.\n\n> **Error Message:**\n` +
                      Formatters.codeBlock(error.message)
                  ),
                ],
                ephemeral: true,
              });
            }
            if (command.options.cooldown > 0) {
              client.cooldowns.set(
                `${interaction.commandName}_${interaction.user.id}`,
                finish
              );
              setTimeout(() => {
                client.cooldowns.delete(
                  `${interaction.commandName}_${interaction.user.id}`
                );
              }, command.options.cooldown * 1000);
            }
          }
        } else if (checkagree == false) {
          interaction.reply({
            content: `${interaction.user}`,
            embeds: [
              embed(
                "error",
                "ERRCD: NOT_AGREED",
                `This command needs "E-mail Confirmation" to run. Please confirm your email on: **[Support server](${main.displaythings.cdn.bot_supserver})>#email-confirmation**`
              ),
            ],
            ephemeral: true,
            components: [row],
          });
        }
      } else if (needagreed == false) {
        if (
          permissions.some(
            (res) => interaction.memberPermissions.has(res) || null
          ) == false
        ) {
          return interaction.reply({
            components: `${interaction.user}`,
            embeds: [
              embed(
                "err",
                "ERRCD: PERM_ERR",
                `To run this command, you need this permission(s):\n> \`${command.options.perms.join(
                  ", "
                )}\``
              ),
            ],
            ephemeral: true,
          });
        } else {
          if (
            client.cooldowns.has(
              `${interaction.commandName}_${interaction.user.id}`
            )
          ) {
            const finish = client.cooldowns.get(
              `${interaction.commandName}_${interaction.user.id}`
            );
            const date = new Date();
            const kalan = (new Date(finish - date).getTime() / 1000).toFixed(2);
            return interaction.reply({
              content: `${interaction.user}`,
              embeds: [
                embed(
                  "warn",
                  "You are still in the cooldown",
                  `You are still in the cooldown. Sorry, cooldowns are required to avoid overload.\n\n> Your remaining cooldown:\n` +
                    Formatters.codeBlock(kalan + " seconds")
                ),
              ],
              ephemeral: true,
            });
          }
          const finish = new Date();
          finish.setSeconds(finish.getSeconds() + cooldownconf);
          try {
            await command
              .execute(interaction)
              .then(
                console.info(
                  "📌[INTERACTION HANDLER] Command Used: " +
                    interaction.commandName +
                    " by " +
                    interaction.user.id
                )
              );
          } catch (error) {
            console.error(error);
            await interaction.reply({
              content: `${interaction.user}`,
              embeds: [
                embed(
                  "error",
                  "ERRCD: RUNTIME_" + error.name.toUpperCase(),
                  `There was an error while executing this command. Contact with developer.\n\n> **Error Message:**\n` +
                    Formatters.codeBlock(error.message)
                ),
              ],
              ephemeral: true,
            });
          }
          if (command.options.cooldown > 0) {
            client.cooldowns.set(
              `${interaction.commandName}_${interaction.user.id}`,
              finish
            );
            setTimeout(() => {
              client.cooldowns.delete(
                `${interaction.commandName}_${interaction.user.id}`
              );
            }, command.options.cooldown * 1000);
          }
        }
      }
    } else if (blacklist == true) {
      await interaction.reply({
        content: `${interaction.user}`,
        embeds: [embed("blacklisted")],
        ephemeral: true,
      });
    }
  } else if (lang == "tr") {
    if (blacklist == false) {
      if (needagreed == true) {
        if (checkagree == true) {
          if (
            permissions.some(
              (res) => interaction.memberPermissions.has(res) || null
            ) == false
          ) {
            return interaction.reply({
              content: `${interaction.user}`,
              embeds: [
                embed(
                  "error_tr",
                  "ERRCD: PERM_ERR",
                  `Bu komutu çalıştırabilmek için şu izin(ler)e ihtiyacınız var:\n> \`${command.options.perms.join(
                    ", "
                  )}\``
                ),
              ],
              ephemeral: true,
            });
          } else {
            if (
              client.cooldowns.has(
                `${interaction.commandName}_${interaction.user.id}`
              )
            ) {
              const finish = client.cooldowns.get(
                `${interaction.commandName}_${interaction.user.id}`
              );
              const date = new Date();
              const kalan = (new Date(finish - date).getTime() / 1000).toFixed(
                2
              );
              return interaction.reply({
                content: `${interaction.user}`,
                embeds: [
                  embed(
                    "warn_tr",
                    "Hâla beklemedesiniz",
                    `Hâla bekleme süresindesiniz. Maalesef fazla yük olmaması için bekleme süreleri gereklidir.\n\n> Kalan bekleme süreniz:\n` +
                      Formatters.codeBlock(kalan + " saniye")
                  ),
                ],
                ephemeral: true,
              });
            }
            const finish = new Date();
            finish.setSeconds(finish.getSeconds() + cooldownconf);
            try {
              await command
                .execute(interaction)
                .then(
                  console.info(
                    "📌[INTERACTION HANDLER] Command Used: " +
                      interaction.commandName +
                      " by " +
                      interaction.user.id
                  )
                );
            } catch (error) {
              console.error(error);
              await interaction.reply({
                content: `${interaction.user}`,
                embeds: [
                  embed(
                    "error_tr",
                    "ERRCD: RUNTIME_" + error.name.toUpperCase(),
                    `Komut çalıştırılırken bir hata oluştu. Geliştirici ile iletişime geçin.\n\n> **Hata Mesajı:**\n` +
                      Formatters.codeBlock(error.message)
                  ),
                ],
                ephemeral: true,
              });
            }
            if (command.options.cooldown > 0) {
              client.cooldowns.set(
                `${interaction.commandName}_${interaction.user.id}`,
                finish
              );
              setTimeout(() => {
                client.cooldowns.delete(
                  `${interaction.commandName}_${interaction.user.id}`
                );
              }, command.options.cooldown * 1000);
            }
          }
        } else if (checkagree == false) {
          interaction.reply({
            content: `${interaction.user}`,
            embeds: [
              embed(
                "error_tr",
                "ERRCD: NOT_AGREED",
                `Bu komutun çalıştırılabilmesi için "E-mail Doğrulaması" gerektirmektedir. Lütfen mail adresinizi şurada doğrulayın: **[Destek sunucusu](${main.displaythings.cdn.bot_supserver})>#email-confirmation**`
              ),
            ],
            ephemeral: true,
            components: [row],
          });
        }
      } else if (needagreed == false) {
        if (
          permissions.some(
            (res) => interaction.memberPermissions.has(res) || null
          ) == false
        ) {
          return interaction.reply({
            components: `${interaction.user}`,
            embeds: [
              embed(
                "error_tr",
                "ERRCD: PERM_ERR",
                `Bu komutu çalıştırabilmek için şu izin(ler)e ihtiyacınız var:\n> \`${command.options.perms.join(
                  ", "
                )}\``
              ),
            ],
            ephemeral: true,
          });
        } else {
          if (
            client.cooldowns.has(
              `${interaction.commandName}_${interaction.user.id}`
            )
          ) {
            const finish = client.cooldowns.get(
              `${interaction.commandName}_${interaction.user.id}`
            );
            const date = new Date();
            const kalan = (new Date(finish - date).getTime() / 1000).toFixed(2);
            return interaction.reply({
              content: `${interaction.user}`,
              embeds: [
                embed(
                  "warn_tr",
                  "Hâla beklemedesiniz",
                  `Hâla bekleme süresindesiniz. Maalesef fazla yük olmaması için bekleme süreleri gereklidir.\n\n> Kalan bekleme süreniz:\n` +
                    Formatters.codeBlock(kalan + " saniye")
                ),
              ],
              ephemeral: true,
            });
          }
          const finish = new Date();
          finish.setSeconds(finish.getSeconds() + cooldownconf);
          try {
            await command
              .execute(interaction)
              .then(
                console.info(
                  "📌[INTERACTION HANDLER] Command Used: " +
                    interaction.commandName +
                    " by " +
                    interaction.user.id
                )
              );
          } catch (error) {
            console.error(error);
            await interaction.reply({
              content: `${interaction.user}`,
              embeds: [
                embed(
                  "error_tr",
                  "ERRCD: RUNTIME_" + error.name.toUpperCase(),
                  `Komut çalıştırılırken bir hata oluştu. Geliştirici ile iletişime geçin.\n\n> **Hata Mesajı:**\n` +
                    Formatters.codeBlock(error.message)
                ),
              ],
              ephemeral: true,
            });
          }
          if (command.options.cooldown > 0) {
            client.cooldowns.set(
              `${interaction.commandName}_${interaction.user.id}`,
              finish
            );
            setTimeout(() => {
              client.cooldowns.delete(
                `${interaction.commandName}_${interaction.user.id}`
              );
            }, command.options.cooldown * 1000);
          }
        }
      }
    }
  }
});
