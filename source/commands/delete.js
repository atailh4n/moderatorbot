// Tanımlayıcılar
const { MessageActionRow, MessageButton, MessageEmbed, Formatters, Permissions } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const main = require('../data/main');
const GuildModel = require('../models/GuildModel');
const embed = require("../data/embeds");

module.exports = {
   data: new SlashCommandBuilder()
      .setName('delete')
      .setDescription('Delete messages')
      .addStringOption(option => option.setName('amount').setDescription("Delete amount (1-100)").setRequired(true))
      .addUserOption(option => option.setName('user').setDescription("Delete a spesific users message").setRequired(false)),
      
   async execute(interaction) {
       const deleteamount = interaction.options.getString("amount");
       const user_bulk = interaction.options.getUser("user");
       const del_ch = interaction.channel;
   const serverConf = await GuildModel.findOne({ discordId: interaction.guild.id });
   let langDb = await serverConf.needed.systems.langPr;

   if (langDb == "en") {
  
         if (deleteamount > 100)
    return interaction.reply({
      content: `${interaction.user}`,
      embeds: [
        embed(
          "warn1",
          "/delete {amount(1-100)} [@user]",
          "Delete amount cannot bigger than 100"
        )
      ],
      ephemeral: true
    });
  if (deleteamount < 1)
    return interaction.reply({
      content: `${interaction.user}`,
      embeds: [
        embed(
          "warn1",
          "/delete {amount(1-100)} [@user]",
          "Delete amount cannot smaller than 1"
        )
      ],
      ephemeral: true
    });
  if (user_bulk == null) {
    del_ch.bulkDelete(deleteamount);
    await interaction.reply({
      content: `${interaction.user}`,
      embeds: [
        embed(
          "success",
          "Deleted messages",
          `${deleteamount} message is deleted.`
        )
      ]
    });
    setTimeout(() => interaction.deleteReply(), 10000);
  } else if (user_bulk != null && interaction.guild.members.cache.get(user_bulk.id)) {
    return interaction.reply({
      content: `This option is developing...`,
      ephermal: true
    });
  } else if (user_bulk != null && !interaction.guild.members.cache.get(user_bulk.id)) {
    return interaction.reply({
      content: `${interaction.user}`,
      embeds: [
        embed(
          "err1",
          "Mentioned user in options of /delete command",
          "Any user of this ID or name."
        )
      ],
      ephermal: true
    });
  } else {
    return;
  }

   } else if (langDb == "tr") {
       
       if (deleteamount > 100)
    return interaction.reply({
      content: `${interaction.user}`,
      embeds: [
        embed(
          "warn1_tr",
          "/delete {amount(Miktar 1-100)} [@user (Kullanıcı)]",
          "Silme miktarı 100'den fazla olamaz."
        )
      ],
      ephemeral: true
    });
  if (deleteamount < 1)
    return interaction.reply({
      content: `${interaction.user}`,
      embeds: [
        embed(
          "warn1_tr",
          "/delete {amount(Miktar 1-100)} [@user]",
          "Silme miktarı 1'den ufak olamaz."
        )
      ],
      ephemeral: true
    });
  if (user_bulk == null) {
    del_ch.bulkDelete(deleteamount);
    await interaction.reply({
      content: `${interaction.user}`,
      embeds: [
        embed(
          "success_tr",
          "Mesajlar silindi",
          `${deleteamount} tane mesaj silindi.`
        )
      ]
    });
    setTimeout(() => interaction.deleteReply(), 10000);
  } else if (user_bulk != null && interaction.guild.members.cache.get(user_bulk.id)) {
    return interaction.reply({
      content: `Geliştirme aşamasındadır.`,
      ephermal: true
    });
  } else if (user_bulk != null && !interaction.guild.members.cache.get(user_bulk.id)) {
    return interaction.reply({
      content: `${interaction.user}`,
      embeds: [
        embed(
          "err1_tr",
          "/delete komutunda etiketlenen kullanıcı",
          "Herhangi bir kulanıcı"
        )
      ],
      ephermal: true
    });
  } else {
    return;
  }
};

   }
}

module.exports.options = {
   needagreed: false,
   perms: ["8192"],
   cooldown: 20
}