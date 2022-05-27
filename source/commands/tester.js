const { SlashCommandBuilder } = require("@discordjs/builders");
const GuildModel = require('../models/GuildModel');
const embed = require('../data/embeds');
const main = require('../data/main');
const { MessageEmbed, MessageActionRow, MessageAttachment, MessageButton} = require('discord.js');
const { Modal, TextInputComponent, showModal } = require('discord-modals');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('testerr')
    .setDescription('Start working'),

    async execute(interaction) {

        const modal = new Modal() // We create a Modal
        .setCustomId('email-modal')
        .setTitle('E-mail Confirmation Screen')
        .addComponents(
          new TextInputComponent() // We create a Text Input Component
          .setCustomId('email_input')
          .setLabel('Please enter your mail')
          .setStyle('SHORT') //IMPORTANT: Text Input Component Style can be 'SHORT' or 'LONG'
          .setMinLength(4)
          .setPlaceholder('Mail here!')
          .setRequired(true), // If it's required or not

          new TextInputComponent() // We create a Text Input Component
          .setCustomId('code_input')
          .setLabel('Please enter your code')
          .setStyle('SHORT') //IMPORTANT: Text Input Component Style can be 'SHORT' or 'LONG'
          .setMinLength(10)
          .setMaxLength(10)
          .setPlaceholder('Code here!')
          .setRequired(true)
        );

        const mailbutton = new MessageButton()
        .setStyle("PRIMARY")
        .setLabel('E-mail')
        .setEmoji("📧")
        .setCustomId("email-button")


        const row = new MessageActionRow().addComponents([mailbutton]);

        

        await interaction.reply({content: `<@&877671612156084225>`, embeds: [
            new MessageEmbed()
            .setAuthor('Moderator Email Confirmation :e_mail:')
            .setTitle(`Hello/Merhaba`)
            .addField(":flag_gb: English", `> Now only **"Confirmed Users"** can use bot. Because of spams and rate limits we decided to make e-mail confirmation system.\n\n<:sup:888738778355740683> **How does it work?**\n> Step 1: Click on "E-mail" button, and type your mail. It must be an e-mail address containing .com\n<:arr:878338531641139210> eg: test123@example.com\n\n> Step 2: Click to "Code" button write the incoming code completely and including the MDRT- prefix with all to be uppercase\n<:sup:888738778355740683> eg: MDRT-A1B2C`)
            .addField(":flag_tr: Türkçe", `> Artık sadece **"Onaylanmış Kullanıcılar"** botu kullanabilir. Spamlar ve rate limitleri nedeniyle e-posta onay sistemi yapmaya karar verdik.\n\n<:sup:888738778355740683> **Nasıl çalışır?**\n> Adım 1: "E-mail" butonuna tıklayın, ve e-postanızı yazın. .com ile bitmek zorundadır\n<:arr:878338531641139210> örn: test123@ornek.com\n\n> Adım 2: "Code" düğmesine tıklayın, gelen kodu MDRT- öneki dahil tam olarak yazın. Tümü büyük harf olacak şekilde olmalıdır\n<:sup:888738778355740683> örn: MDRT-A1B2C`)
            .setDescription(`> :flag_gb: **If you can't see any mail, check Spam. You have 2 min. to get code**\n> :flag_tr: **E-postayı göremiyorsanız, Spam'i kontrol edin. Kodu alabilmek için 2 dakikanız var**`)
            .setThumbnail(main.displaythings.cdn.bot_logo)
            .setColor(main.displaythings.colors.color_main)
            .setFooter(`${main.displaythings.info.bot_name} | Ver: ${main.displaythings.info.version} | Prefix: ${main.displaythings.info.prefix} | ${main.displaythings.info.bot_website}`, main.displaythings.cdn.bot_logo)
            .setImage(main.displaythings.cdn.banner_gif)
        ], components: [row]});


  },
}

module.exports.options = {
    needagreed: false,
  perms: ["8"],
  cooldown: 10
 }