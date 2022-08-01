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

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  if (!interaction.inGuild()) return;

  const davet = new MessageButton()
    .setStyle("LINK")
    .setLabel(
      t("buttons.inv", {
        ns: "common",
        lng: interaction.locale,
        botn: main.displaythings.info.bot_name,
      })
    )
    .setEmoji(main.displaythings.emojis.emoj_main)
    .setURL(main.displaythings.cdn.bot_invite);

  const oyver = new MessageButton()
    .setStyle("LINK")
    .setLabel(
      t("buttons.vote", {
        ns: "common",
        lng: interaction.locale,
        botn: main.displaythings.info.bot_name,
      })
    )
    .setEmoji(main.displaythings.emojis.emoj_vote)
    .setURL(main.displaythings.cdn.vote_link);

  const site = new MessageButton()
    .setStyle("LINK")
    .setLabel(t("buttons.site", { ns: "common", lng: interaction.locale }))
    .setEmoji(main.displaythings.emojis.emoj_web)
    .setURL(main.displaythings.cdn.bot_webpanel);

  const supp = new MessageButton()
    .setStyle("LINK")
    .setLabel(t("buttons.support", { ns: "common", lng: interaction.locale }))
    .setEmoji(main.displaythings.emojis.emoj_web)
    .setURL(main.displaythings.cdn.bot_webpanel);

  const row = new MessageActionRow().addComponents([davet, supp, site, oyver]);

  const command = await client.commands.get(interaction.commandName);
  let needagreed = command.options.needagreed;
  let permissions = command.options.perms;
  let cooldownconf = command.options.cooldown;

  const userConfig = await userSchema.findOne({
    discordId: interaction.user.id,
  });

  const serverConf = await guildSchema.findOne({
    discordId: interaction.guild.id,
  });
  let lang = interaction.locale;

  if (userConfig == null) {
    return interaction.reply({
      content: `${interaction.user}`,
      embeds: [
        embed(
          t("intCr.usernull.warntype", {
            ns: "events",
            lng: interaction.locale,
          }),
          t("intCr.usernull.title", { ns: "events", lng: interaction.locale }),
          t("intCr.usernull.desc", { ns: "events", lng: interaction.locale })
        ),
      ],
      ephemeral: true,
      components: [row],
    });
  } else {
    let checkagree = userConfig.rules_accepted;
    let blacklist = userConfig.blacklisted;

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
                    t("intCr.err1.errcode", { ns: "events", lng: interaction.locale }),
                    t("intCr.err1.title", { ns: "events", lng: interaction.locale }),
                    t("intCr.err1.desc", { ns: "events", lng: interaction.locale, cmdperms: command.options.perms.join(', ') }),
                  ),
                ],
                ephemeral: true,
                components: [row],
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
                const kalan = (
                  new Date(finish - date).getTime() / 1000
                ).toFixed(2);
                return interaction.reply({
                  content: `${interaction.user}`,
                  embeds: [
                    embed(
                      t("intCr.warn1.warntype", { ns: "events", lng: interaction.locale }),
                      t("intCr.warn1.title", { ns: "events", lng: interaction.locale }),
                      t("intCr.warn1.desc", { ns: "events", lng: interaction.locale, cooldown: Formatters.codeBlock(kalan + ' ' + t("timeunit_s", { ns: "common", lng: interaction.locale }))}),
                    ),
                  ],
                  ephemeral: true,
                  components: [row],
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
                      t("intCr.err2.warntype", { ns: "events", lng: interaction.locale }),
                      t("intCr.err2.title", { ns: "events", lng: interaction.locale, runtimecd: error.name.toUpperCase() }),
                      t("intCr.err2.desc", { ns: "events", lng: interaction.locale, runtimemsg: Formatters.codeBlock(error.message) }),
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
                  t("intCr.err3.warntype", { ns: "events", lng: interaction.locale }),
                  t("intCr.err3.title", { ns: "events", lng: interaction.locale }),
                  t("intCr.err3.desc", { ns: "events", lng: interaction.locale, suppserver: main.displaythings.cdn.bot_supserver, rightarr: main.displaythings.emojis.emoj_arrow_right }),
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
                  t("intCr.err1.errcode", { ns: "events", lng: interaction.locale }),
                  t("intCr.err1.title", { ns: "events", lng: interaction.locale }),
                  t("intCr.err1.desc", { ns: "events", lng: interaction.locale, cmdperms: command.options.perms.join(', ') }),
                ),
              ],
              ephemeral: true,
              components: [row],
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
                    t("intCr.warn1.warntype", { ns: "events", lng: interaction.locale }),
                    t("intCr.warn1.title", { ns: "events", lng: interaction.locale }),
                    t("intCr.warn1.desc", { ns: "events", lng: interaction.locale, cooldown: Formatters.codeBlock(kalan + ' ' + t("timeunit_s", { ns: "common", lng: interaction.locale }))}),
                  ),
                ],
                ephemeral: true,
                components: [row],
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
                    t("intCr.err2.warntype", { ns: "events", lng: interaction.locale }),
                    t("intCr.err2.title", { ns: "events", lng: interaction.locale, runtimecd: error.name.toUpperCase() }),
                    t("intCr.err2.desc", { ns: "events", lng: interaction.locale, runtimemsg: Formatters.codeBlock(error.message) }),
                  ),
                ],
                ephemeral: true,
                components: [row],
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
        if (interaction.locale == "tr") {
          await interaction.reply({
            content: `${interaction.user}`,
            embeds: [embed("blacklisted_tr")],
            ephemeral: true,
            components: [row],
          });
        } else {
          await interaction.reply({
            content: `${interaction.user}`,
            embeds: [embed("blacklisted")],
            ephemeral: true,
            components: [row],
          });
        }
      }
    }
});
