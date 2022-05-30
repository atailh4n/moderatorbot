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

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Ban somebody from server")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("Who to ban from server")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("Reason to ban")
        .setRequired(false)
    )
    .addIntegerOption((option) =>
      option
        .setName("days")
        .setDescription("How much days for ban (1-7 Days)")
        .setRequired(false)
    ),

  async execute(interaction) {
    const serverConf = await guildConf.findOne({
      discordId: interaction.guild.id,
    });
    const lang = serverConf.needed.systems.langPr;

    const userRes = interaction.options.getUser("user");
    const reasonRes =
      interaction.options.getString("reason") ||
      t("ban.noreason", { ns: "commands", lng: interaction.locale });
    const daysRes = interaction.options.getInteger("days") || null;

    const guild = interaction.guild;

    if (interaction.user.id == userRes.id) {
      interaction.reply({
        content: `${interaction.user}`,
        embeds: [
          embed(
            t("ban.errcd2", { ns: "commands", lng: interaction.locale }),
            t("ban.errusg", { ns: "commands", lng: interaction.locale })
          ),
        ],
        ephermal: true,
      });
      return;
    }

    if (interaction.applicationId == userRes.id) {
      interaction.reply({
        content: `${interaction.user}`,
        embeds: [
          embed(
            t("ban.errcd3", { ns: "commands", lng: interaction.locale }),
            t("ban.errusg", { ns: "commands", lng: interaction.locale })
          ),
        ],
        ephermal: true,
      });
      return;
    }

    if (
      reasonRes ==
      t("ban.noreason", { ns: "commands", lng: interaction.locale })
    ) {
      if (daysRes == null) {
        interaction.reply({
          content: `${interaction.user}`,
          embeds: [
            embed(
              t("ban.successcd", { ns: "commands", lng: interaction.locale }),
              t("ban.success_title", {
                ns: "commands",
                lng: interaction.locale,
              }),
              t("ban.success_desc", { ns: "commands", lng: interaction.locale, usrRes: userRes.username })
            ),
          ],
        });
        setTimeout(() => interaction.deleteReply(), 10000);
        guild.members.ban(userRes);
      } else {
        if (daysRes >= 8 || daysRes <= 0 || isNaN(daysRes))
          return interaction.reply({
            content: `${interaction.user}`,
            embeds: [
              embed(
                t("ban.warncd1", { ns: "commands", lng: interaction.locale }),
                t("ban.warnusg", { ns: "commands", lng: interaction.locale })
              ),
            ],
            ephermal: true,
          });
        interaction.reply({
          content: `${interaction.user}`,
          embeds: [
            embed(
              t("ban.successcd", { ns: "commands", lng: interaction.locale }),
              t("ban.success_title", {
                ns: "commands",
                lng: interaction.locale,
              }),
              t("ban.success_desc2", {
                ns: "commands",
                lng: interaction.locale,
                usrRes: userRes.username,
                days: daysRes,
              })
            ),
          ],
        });
        setTimeout(() => interaction.deleteReply(), 10000);
        guild.members.ban(userRes, { days: daysRes });
      }
    } else {
      if (daysRes == null) {
        interaction.reply({
          content: `${interaction.user}`,
          embeds: [
            embed(
              t("ban.successcd", { ns: "commands", lng: interaction.locale }),
              t("ban.success_title", {
                ns: "commands",
                lng: interaction.locale,
              }),
              t("ban.success_desc3", {
                ns: "commands",
                lng: interaction.locale,
                usrRes: userRes.username,
                rsn: reasonRes,
              })
            ),
          ],
        });
        setTimeout(() => interaction.deleteReply(), 10000);
        guild.members.ban(userRes, { reason: reasonRes });
      } else {
        if (daysRes >= 8 || daysRes <= 0 || isNaN(daysRes))
          return interaction.reply({
            content: `${interaction.user}`,
            embeds: [
              embed(
                t("ban.warncd1", { ns: "commands", lng: interaction.locale }),
                t("ban.warnusg", { ns: "commands", lng: interaction.locale })
              ),
            ],
            ephermal: true,
          });
        interaction.reply({
          content: `${interaction.user}`,
          embeds: [
            embed(
              t("ban.successcd", { ns: "commands", lng: interaction.locale }),
              t("ban.success_title", {
                ns: "commands",
                lng: interaction.locale,
              }),
              t("ban.success_desc4", {
                ns: "commands",
                lng: interaction.locale,
                usrRes: userRes.username,
                rsn: reasonRes,
                days: daysRes,
              })
            ),
          ],
        });
        setTimeout(() => interaction.deleteReply(), 10000);
        guild.members.ban(userRes, { reason: reasonRes, days: daysRes });
      }
    }
  },
};

module.exports.options = {
  needagreed: true,
  perms: ["4"],
  cooldown: 15,
};
