const { MessageActionRow, MessageButton, MessageEmbed, Formatters, Permissions } = require('discord.js');
const { SlashCommandBuilder } = require("@discordjs/builders");
const GuildModel = require('../models/GuildModel');
const embed = require('../data/embeds');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Ban somebody from server')
    .addUserOption(option => option.setName('user').setDescription("Who to ban from server").setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription("Reason to ban").setRequired(false))
    .addIntegerOption(option => option.setName("days").setDescription("How much days for ban (1-7 Days)").setRequired(false)),

    async execute(interaction) {

      const serverConf = await GuildModel.findOne({ discordId: interaction.guild.id })
      const lang = serverConf.needed.systems.langPr;

      const userRes = interaction.options.getUser('user');
      const reasonRes = interaction.options.getString('reason') || "No reason given";
      const daysRes = interaction.options.getInteger('days') || null;

      const guild = interaction.guild

      if (lang == "en") {

        if (interaction.user.id == userRes.id) {
          interaction.reply({ content: `${interaction.user}`, embeds: [embed("err2", "ban user reason day(1-7)")], ephermal: true })
          return;
        }

        if (interaction.applicationId == userRes.id) {
          interaction.reply({ content: `${interaction.user}`, embeds: [embed("err3", "ban user reason day(1-7)")], ephermal: true })
          return;
        }

        if (reasonRes == "No reason given") {
          if (daysRes == null) {
            interaction.reply({
              content: `${interaction.user}`,
              embeds: [
                embed(
                  "success",
                  "Someone banned from server",
                  `Member named ${userRes} was banned from the server forever for no reason.`
                )
              ]
            });
            setTimeout(() => interaction.deleteReply(), 10000);
            guild.members.ban(userRes);
          } else {
            if (daysRes >= 8 || daysRes <= 0 || isNaN(daysRes))
              return interaction.reply({
                content: `${interaction.user}`,
                embeds: [embed("warn1", "ban reason day(1-7)")],
                ephermal: true
              });
            interaction.reply({
              content: `${interaction.user}`,
              embeds: [
                embed(
                  "success",
                  "Someone banned from server",
                  `Member named ${userRes} was banned from the server ${daysRes} days for no reason.`
                )
              ]
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
                  "success",
                  "Someone banned from server",
                  `Member named ${userRes} was banned from the server forever for ${reasonRes} reason.`
                )
              ]
            });
            setTimeout(() => interaction.deleteReply(), 10000);
            guild.members.ban(userRes, { reason: reasonRes });
          } else {
            if (daysRes >= 8 || daysRes <= 0 || isNaN(daysRes))
              return interaction.reply({
                content: `${interaction.user}`,
                embeds: [embed("warn1", "ban reason day(1-7)")],
                ephermal: true
              });
            interaction.reply({
              content: `${interaction.user}`,
              embeds: [
                embed(
                  "success",
                  "Someone banned from server",
                  `Member named ${userRes} was banned from the server ${daysRes} days for ${reasonRes} reason.`
                )
              ]
            });
            setTimeout(() => interaction.deleteReply(), 10000);
            guild.members.ban(userRes, { reason: reasonRes, days: daysRes });
          }
        }

      } else if (lang == "tr") {

        if (interaction.user.id == userRes.id) {
          interaction.reply({ content: `${interaction.user}`, embeds: [embed("err2_tr", "ban user(Kullanıcı) reason(Sebep) day(Gün sayısı 1-7)")], ephermal: true })
          return;
        }

        if (interaction.applicationId == userRes.id) {
          interaction.reply({ content: `${interaction.user}`, embeds: [embed("err3_tr", "ban user reason day(1-7)")], ephermal: true })
          return;
        }

        if (reasonRes == "No reason given") {
          if (daysRes == null) {
            interaction.reply({
              content: `${interaction.user}`,
              embeds: [
                embed(
                  "success_tr",
                  "Birileri sunucudan banlandı",
                  `${userRes} isimli kullanıcı sebepsiz şekilde banlandı.`
                )
              ]
            });
            setTimeout(() => interaction.deleteReply(), 10000);
            guild.members.ban(userRes);
          } else {
            if (daysRes >= 8 || daysRes <= 0 || isNaN(daysRes))
              return interaction.reply({
                content: `${interaction.user}`,
                embeds: [embed("warn1_tr", "ban reason(Sebep) day(Gün sayısı 1-7)")],
                ephermal: true
              });
            interaction.reply({
              content: `${interaction.user}`,
              embeds: [
                embed(
                  "success_tr",
                  "Birileri sunucudan banlandı",
                  `${userRes} adlı kullanıcı ${daysRes} gün boyunca sebepsiz olarak banlandı.`
                )
              ]
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
                  "success_tr",
                  "Birileri sunucudan banlandı",
                  `${userRes} isimli kullanıcı ${reasonRes} sebebi ile sonsuza kadar banlandı.`
                )
              ]
            });
            setTimeout(() => interaction.deleteReply(), 10000);
            guild.members.ban(userRes, { reason: reasonRes });
          } else {
            if (daysRes >= 8 || daysRes <= 0 || isNaN(daysRes))
              return interaction.reply({
                content: `${interaction.user}`,
                embeds: [embed("warn1", "ban reason(Sebep) day(Gün sayısı 1-7)")],
                ephermal: true
              });
            interaction.reply({
              content: `${interaction.user}`,
              embeds: [
                embed(
                  "success_tr",
                  "Birileri sunucudan banlandı",
                  `${userRes} adlı kullanıcı ${daysRes} gün boyunca ${reasonRes} sebebiyle banlandı.`
                )
              ]
            });
            setTimeout(() => interaction.deleteReply(), 10000);
            guild.members.ban(userRes, { reason: reasonRes, days: daysRes });
          }
        }

      }



  },
}

module.exports.options = {
  needagreed: true,
  perms: ["4"],
  cooldown: 15
}