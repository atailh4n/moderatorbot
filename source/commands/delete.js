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
const embed = require('../data/embeds');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("delete")
    .setDescription("Delete messages")
    .addIntegerOption((option) =>
      option
        .setName("amount")
        .setDescription("Delete amount (1-100)")
        .setRequired(true)
    )
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("Delete a spesific users message")
        .setRequired(false)
    ),

  async execute(interaction) {
    const deleteamount = interaction.options.getInteger("amount");
    const user_bulk = interaction.options.getUser("user");
    const del_ch = interaction.channel;
    const serverConf = await GuildModel.findOne({
      discordId: interaction.guild.id,
    });
    let langDb = await serverConf.needed.systems.langPr;

      if (deleteamount > 100)
        return interaction.reply({
          content: `${interaction.user}`,
          embeds: [
            embed(
              t("delete.warn1.warncd", { ns: "commands", lng: interaction.locale }),
              t("delete.warn1.title", { ns: "commands", lng: interaction.locale }),
              t("delete.warn1.desc", { ns: "commands", lng: interaction.locale })
            ),
          ],
          ephemeral: true,
        });
      if (deleteamount < 1)
        return interaction.reply({
          content: `${interaction.user}`,
          embeds: [
            embed(
              t("delete.warn2.warncd", { ns: "commands", lng: interaction.locale }),
              t("delete.warn2.title", { ns: "commands", lng: interaction.locale }),
              t("delete.warn2.desc", { ns: "commands", lng: interaction.locale })
            ),
          ],
          ephemeral: true,
        });
      if (user_bulk == null) {
        del_ch.bulkDelete(deleteamount);
        await interaction.reply({
          content: `${interaction.user}`,
          embeds: [
            embed(
              t("delete.success1.succcd", { ns: "commands", lng: interaction.locale }),
              t("delete.success1.title", { ns: "commands", lng: interaction.locale }),
              t("delete.success1.desc", { ns: "commands", lng: interaction.locale, delamt: deleteamount })
            ),
          ],
        });
      } else if (
        user_bulk != null &&
        interaction.guild.members.cache.get(user_bulk.id)
      ) {
        return interaction.reply({
          content: t("delete.userdelete.desc", { ns: "commands", lng: interaction.locale }),
          ephermal: true,
        });
      } else if (
        user_bulk != null &&
        !interaction.guild.members.cache.get(user_bulk.id)
      ) {
        return interaction.reply({
          content: `${interaction.user}`,
          embeds: [
            embed(
              t("delete.err1.errcd", { ns: "commands", lng: interaction.locale }),
              t("delete.err1.title", { ns: "commands", lng: interaction.locale }),
              t("delete.err1.desc", { ns: "commands", lng: interaction.locale })
            ),
          ],
          ephermal: true,
        });
      } else {
        return;
      }
  },
};

module.exports.options = {
  needagreed: true,
  perms: ["8192"],
  cooldown: 20,
};
