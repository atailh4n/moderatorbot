// Tanımlayıcılar
const {
  MessageActionRow,
  MessageButton,
  MessageEmbed,
  Formatters,
  Permissions,
} = require("discord.js");
const { t } = require("i18next");
const { SlashCommandBuilder } = require("@discordjs/builders");
const main = require("../data/main");
const GuildModel = require("../models/GuildModel");

(module.exports = {
  data: new SlashCommandBuilder()
  .setName("help")
  .setNameLocalizations({
    tr: "yardım"
  })
  .setDescription("Help Menu")
  .setDescriptionLocalizations({
    tr: "Yardım menüsü"
  }),

  async execute(interaction) {
    const serverConf = await GuildModel.findOne({
      discordId: interaction.guild.id,
    });
    const helpembed = new MessageEmbed()
      .setAuthor({
        name: `${t("help.embed.author", {
          ns: "commands",
          lng: interaction.locale,
        })}`,
        iconUrl: `${main.displaythings.cdn.bot_logo}`,
      })
      .setTitle(
        t("help.embed.title", {
          ns: "commands",
          lng: interaction.locale,
          usr: interaction.user.username,
        })
      )
      .setDescription(
        t("help.embed.desc", { ns: "commands", lng: interaction.locale })
      )
      .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
      .setColor(main.displaythings.colors.color_main)
      .setFooter(
        `${main.displaythings.info.bot_name} | Ver: ${main.displaythings.info.version} | Prefix: ${main.displaythings.info.prefix} | ${main.displaythings.info.bot_website}`,
        main.displaythings.cdn.bot_logo
      )
      .setImage(main.displaythings.cdn.banner_static);

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
      .setURL(main.displaythings.cdn.bot_website_link);

    const supp = new MessageButton()
      .setStyle("LINK")
      .setLabel(t("buttons.support", { ns: "common", lng: interaction.locale }))
      .setEmoji(main.displaythings.emojis.emoj_sup)
      .setURL(main.displaythings.cdn.bot_supserver);

    const row = new MessageActionRow().addComponents([
      davet,
      supp,
      site,
      oyver,
    ]);
    interaction.reply({
      content: `${interaction.user}`,
      ephemeral: true,
      embeds: [helpembed],
      components: [row],
    });
  },
}),
  (module.exports.options = {
    needagreed: false,
    perms: ["0"],
    cooldown: 10,
  });
