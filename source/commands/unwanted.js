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
    .setName("unwanted")
    .setNameLocalizations({
      tr: "istenmeyen",
    })
    .setDescription("The things what you unwanted")
    .setDescriptionLocalizations({
      tr: "İstenmeyen şeyler",
    })
    .addSubcommand((subcommand) =>
      subcommand
        .setName("words")
        .setNameLocalizations({
          tr: "kelimeler",
        })
        .setDescription("Unwanted words")
        .setDescriptionLocalizations({
          tr: "İstenmeyen kelimeler",
        }).addStringOption(option => option.setName("word").setNameLocalizations({ tr: "kelime" }).setDescription("The word you unwanted").setDescriptionLocalizations({ tr: "İstenmeyen kelime" }))
    ),

  async execute(interaction) {
    const serverConf = await GuildModel.findOne({
      discordId: interaction.guild.id,
    });
    if (interaction.user.id !== guildDb.ownerId) return interaction.reply({ content: `${interaction.user}`, embeds: [embed(t("unwanted.errpermcd", { ns: "commands", lng: interaction.locale }), "GUILD_OWNER", interaction.member.permissions.join(', '))], ephemeral: true});
    if (interaction.options.getSubcommand() === "words") {

      const wordOp = interaction.options.getUser('word');
      let currentUnwW = serverConf.other.unwantedWordList;

      if (wordOp.includes(" ")) return interaction.reply({ content: `${interaction.user}`, embeds: [embed(t("unwanted.warn1.warncd", { ns: "commands", lng: interaction.locale }), t("unwanted.warn1.title", { ns: "commands", lng: interaction.locale }), t("unwanted.warn1.desc", { ns: "commands", lng: interaction.locale }))] });

      await GuildModel.findOneAndUpdate({ discordId: interaction.user.id }, { $addToSet: { "serverConf.other.unwantedWordList": wordOp }}, { new: true });
      await interaction.reply({ content: `${interaction.user}`, embeds: [embed(t("unwanted.succ1.succcd", { ns: "commands", lng: guildDb.needed.systems.langPr }), t("unwanted.succ1.title", { ns: "commands", lng: guildDb.needed.systems.langPr, setname: "Safe User" }), t("unwanted.succ1.desc", { ns: "commands", lng: guildDb.needed.systems.langPr, objec: usertofetch.username, setname: "Unwanted Words" }))] });


    }

   }
}),
  (module.exports.options = {
    needagreed: false,
    perms: ["0"],
    cooldown: 10,
  });
