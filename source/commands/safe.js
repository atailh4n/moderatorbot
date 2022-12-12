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
  const embed = require("../data/embeds");
  const userConfig = require("../models/UserModel");
  const guildConf = require("../models/GuildModel");

  (module.exports = {
    data: new SlashCommandBuilder()
    .setName("safe")
    .setNameLocalizations({
      tr: "güvenli"
    })
    .setDescription("Set new safe perms")
    .setDescriptionLocalizations({
      tr: "Yeni güvenli kullanıcı/link v.b. ayarlayın"
    })
    .addSubcommand(subcommand =>
      subcommand
        .setName('user')
        .setNameLocalizations({
          tr: "kullanıcı"
        })
        .setDescription('Add a user to give admin perm safely')
        .setDescriptionLocalizations({
          tr: "Güvenli bir şekilde admin olabilecek kullanıcıları ekleyin"
        })
        .addUserOption(option => option.setName('user').setNameLocalizations({tr: "kullanıcı"}).setDescription('The user who can use admin perm safely').setDescriptionLocalizations({tr: "Güvenli adminlik verilecek kullanıcı"}).setRequired(true)))
    .addSubcommand(subcommand =>
      subcommand
        .setName('bot')
        .setNameLocalizations({
          tr: "bot"
        })
        .setDescription('Add a bot to give admin perm safely')
        .setDescriptionLocalizations({
          tr: "Güvenli bir şekilde admin olabilecek botları ekleyin"
        })
        .addUserOption(option => option.setName('bot').setNameLocalizations({tr: "bot"}).setDescription('The bot who can use admin perm safely').setDescriptionLocalizations({tr: "Güvenli adminlik verilecek bot"}).setRequired(true)))
    .addSubcommand(subcommand =>
      subcommand
        .setName('role')
        .setNameLocalizations({
          tr: "rol"
        })
        .setDescription('Add a role to give admin perm safely')
        .setDescriptionLocalizations({
          tr: "Güvenli bir şekilde sunucuyu yönetebilecek rolleri ekleyin"
        })
        .addRoleOption(option => option.setName('role').setNameLocalizations({tr: "rol"}).setDescription('Add a role to give admin perm safely').setDescriptionLocalizations({tr: "Güvenli adminlik verilecek rol"}).setRequired(true)))
    .addSubcommand(subcommand =>
      subcommand
        .setName('link')
        .setNameLocalizations({
          tr: "link"
        })
        .setDescription('Add a link for not delete automaticly by Moderator')
        .setDescriptionLocalizations({
          tr: "Güvenli bir şekilde paylaşılabilecek ve Moderator tarafondan engellenmeyecek linkleri ekleyin"
        })
        .addStringOption(option => option.setName('link').setNameLocalizations({tr: "link"}).setDescription('Add a link for not delete automaticly by Moderator').setDescriptionLocalizations({tr: "Moderator tarafından otomatik engellenmeyecek link"}).setRequired(true))),

    async execute(interaction) {
      const guildDb = await guildConf.findOne({ discordId: interaction.guild.id });

      if (interaction.user.id !== guildDb.ownerId) return;
      if (interaction.options.getSubcommand() === "user") {
        
        const usertofetch = interaction.options.getUser('user');

        if (usertofetch.bot === true) return interaction.reply({ content: `${interaction.user}`, embeds: [embed(t("safecommand.warn2.warncd", { ns: "commands", lng: guildDb.needed.systems.langPr }), t("safecommand.warn2.title", { ns: "commands", lng: guildDb.needed.systems.langPr }), t("safecommand.warn2.desc", { ns: "commands", lng: guildDb.needed.systems.langPr }))]});
        await guildConf.findOneAndUpdate({ discordId: interaction.guild.id }, { $addToSet: { "needed.safe.safeUsr": usertofetch.id}}, { new: true });
        await interaction.reply({ content: `${interaction.user}`, embeds: [embed(t("safecommand.succ1.succcd", { ns: "commands", lng: guildDb.needed.systems.langPr }), t("safecommand.succ1.title", { ns: "commands", lng: guildDb.needed.systems.langPr, setname: "Safe User" }), t("safecommand.succ1.desc", { ns: "commands", lng: guildDb.needed.systems.langPr, objec: usertofetch.username, setname: "Safe User" }))] });
        
      } else if (interaction.options.getSubcommand() === "bot") {

        const bottofetch = interaction.options.getUser('bot');

        if (bottofetch.bot === false) return interaction.reply({ content: `${interaction.user}`, embeds: [embed(t("safecommand.warn3.warncd", { ns: "commands", lng: guildDb.needed.systems.langPr }), t("safecommand.warn3.title", { ns: "commands", lng: guildDb.needed.systems.langPr }), t("safecommand.warn3.desc", { ns: "commands", lng: guildDb.needed.systems.langPr }))]});
        await guildConf.findOneAndUpdate({ discordId: interaction.guild.id }, { $addToSet: { "needed.safe.safeBot": bottofetch.id}}, { new: true });
        await interaction.reply({ content: `${interaction.user}`, embeds: [embed(t("safecommand.succ1.succcd", { ns: "commands", lng: guildDb.needed.systems.langPr }), t("safecommand.succ1.title", { ns: "commands", lng: guildDb.needed.systems.langPr, setname: "Safe Bot" }), t("safecommand.succ1.desc", { ns: "commands", lng: guildDb.needed.systems.langPr, objec: bottofetch.username, setname: "Safe Bot" }))] });

      } else if (interaction.options.getSubcommand() === "role") {

        const roletofetch = interaction.options.getRole('role');

        await guildConf.findOneAndUpdate({ discordId: interaction.guild.id }, { $addToSet: { "needed.safe.safeRol": roletofetch.id}}, { new: true });
        await interaction.reply({ content: `${interaction.user}`, embeds: [embed(t("safecommand.succ1.succcd", { ns: "commands", lng: guildDb.needed.systems.langPr }), t("safecommand.succ1.title", { ns: "commands", lng: guildDb.needed.systems.langPr, setname: "Safe Role" }), t("safecommand.succ1.desc", { ns: "commands", lng: guildDb.needed.systems.langPr, objec: roletofetch.name, setname: "Safe Role" }))] });

      } else if (interaction.options.getSubcommand() === "link") {

        const linktofetch = interaction.options.getString('link');

        if (linktofetch.includes("https") || linktofetch.includes("http") || linktofetch.includes("/") || linktofetch.includes(":") ) return interaction.reply({ content: `${interaction.user}`, embeds: [embed(t("safecommand.warn1.warncd", { ns: "commands", lng: guildDb.needed.systems.langPr }), t("safecommand.warn1.desc", { ns: "commands", lng: guildDb.needed.systems.langPr }), t("safecommand.warn1.desc", { ns: "commands", lng: guildDb.needed.systems.langPr }))] })

        await guildConf.findOneAndUpdate({ discordId: interaction.guild.id }, { $addToSet: { "needed.safe.safeLink": linktofetch}}, { new: true });
        await interaction.reply({ content: `${interaction.user}`, embeds: [embed(t("safecommand.succ1.succcd", { ns: "commands", lng: guildDb.needed.systems.langPr }), t("safecommand.succ1.title", { ns: "commands", lng: guildDb.needed.systems.langPr, setname: "Safe Link" }), t("safecommand.succ1.desc", { ns: "commands", lng: guildDb.needed.systems.langPr, objec: linktofetch, setname: "Safe Link" }))] });

      };
    }
  })

  module.exports.options = {
    needagreed: false,
    needvote: false,
    perms: ["4"],
    cooldown: 15,
  };
