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
    .setEmoji(main.displaythings.emojis.emoj_sup)
    .setURL(main.displaythings.cdn.bot_supserver);

  const row = new MessageActionRow().addComponents([davet, supp, site, oyver]);

  const acp = new MessageButton()
  .setStyle("SUCCESS")
  .setLabel(
    t("buttons.accept", {
      ns: "common",
      lng: interaction.locale,
    })
  )
  .setEmoji('✅')
  .setCustomId("acp");

const row2 = new MessageActionRow().addComponents([acp]);

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
    const mitEmbeden = new MessageEmbed()
    .setColor(main.displaythings.colors.color_main)
    .setThumbnail(main.displaythings.botlogo)
    .setAuthor({
      name: t("intCr.usernull.author", { ns: "events", lng: interaction.locale, bot_name: main.displaythings.info.bot_name }),
      iconUrl: main.displaythings.cdn.bot_logo_gif
    })
    .setTitle(t("intCr.usernull.title", { ns: "events", lng: interaction.locale, bot_name: main.displaythings.info.bot_name }))
    .setDescription(`[${t("intCr.usernull.desc.opensource", { ns: "events", lng: interaction.locale })}](https://github.com/atailh4n/moderatorbot) | [${t("intCr.usernull.desc.guide", { ns: "events", lng: interaction.locale })}](https://discord.com/guidelines) | [${t("intCr.usernull.desc.privacy", { ns: "events", lng: interaction.locale })}](${main.displaythings.cdn.privacypolicy}) | [${t("intCr.usernull.desc.webprivacy", { ns: "events", lng: interaction.locale })}](${main.displaythings.cdn.webpanelprivacy}) | [${t("intCr.usernull.desc.tos", { ns: "events", lng: interaction.locale })}](${main.displaythings.cdn.tos})`)
    .addField(
      t("intCr.usernull.field1.title", { ns: "events", lng: interaction.locale, bot_name: main.displaythings.info.bot_name }),
      t("intCr.usernull.field1.desc", { ns: "events", lng: interaction.locale, bot_name: main.displaythings.info.bot_name })
    )
    .addField(
      t("intCr.usernull.field2.title", { ns: "events", lng: interaction.locale, bot_name: main.displaythings.info.bot_name }),
      t("intCr.usernull.field2.desc", { ns: "events", lng: interaction.locale, bot_name: main.displaythings.info.bot_name })
    )
    .addField(
      t("intCr.usernull.field3.title", { ns: "events", lng: interaction.locale, bot_name: main.displaythings.info.bot_name }),
      t("intCr.usernull.field3.desc", { ns: "events", lng: interaction.locale, bot_name: main.displaythings.info.bot_name, privacy: main.displaythings.cdn.privacypolicy })
    )
    .addField(
      t("intCr.usernull.field4.title", { ns: "events", lng: interaction.locale, bot_name: main.displaythings.info.bot_name }),
      t("intCr.usernull.field4.desc", { ns: "events", lng: interaction.locale, bot_name: main.displaythings.info.bot_name })
    )
    .addField(
      t("intCr.usernull.field5.title", { ns: "events", lng: interaction.locale, bot_name: main.displaythings.info.bot_name }),
      t("intCr.usernull.field5.desc", { ns: "events", lng: interaction.locale, bot_name: main.displaythings.info.bot_name })
    )
    .setFooter({
      text: `${main.displaythings.info.bot_name} | Ver: ${main.displaythings.info.version} | Prefix: ${main.displaythings.info.prefix} | ${main.displaythings.info.bot_website}`
    })
    .setImage(main.displaythings.cdn.banner_gif);

        await interaction.reply({ content: `${interaction.user}`, embeds: [mitEmbeden], components: [row2], ephemeral: false, fetchReply: true }).then(async(message) => {
    
          setTimeout(async() => {
            message.delete()
          }, 60000);

          const filter_acp = i => i.customId === "acp" && i.user.id === interaction.user.id;

          const collector_acp = interaction.channel.createMessageComponentCollector({ filter_acp, time: 60000 });

          collector_acp.on('collect', async i => {
            const userprofile = new userSchema({
              discordId: i.user.id
             })
           await userprofile.save()
           .then(result => console.log("🔼[USER ADDED] New user added to Database. User ID: " + interaction.user.id))
           .catch(err => console.log(err));
            await i.reply({ content: `${interaction.user}`, embeds: [embed(t("intCr.usernull.success.succcd", { ns: "events", lng: interaction.locale }), t("intCr.usernull.success.title", { ns: "events", lng: interaction.locale }), t("intCr.usernull.success.desc", { ns: "events", lng: interaction.locale, usr_repl: interaction.user, botname: main.displaythings.info.bot_name }))] });
          });

          collector_acp.on("end", async(collected) => {
            interaction.channel.bulkDelete(1);
          })
     
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
