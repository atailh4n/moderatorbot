// Tanımlayıcılar
const { MessageActionRow, MessageButton, MessageEmbed, Formatters, Permissions } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const main = require('../data/main');
const GuildModel = require('../models/GuildModel');

module.exports = {
   data: new SlashCommandBuilder()
      .setName('help')
      .setDescription('Help Menu'),
      
   async execute(interaction) {
   const serverConf = await GuildModel.findOne({ discordId: interaction.guild.id });
   let langDb = serverConf.needed.systems.langPr;
       
   console.log(langDb)

   if (langDb == "en") {
      const helpembed  = new MessageEmbed()
  .setAuthor('Moderator Bot - Always be safe!', main.displaythings.cdn.bot_logo)
  .setTitle(`Hello ${interaction.user.username}`)
  .setDescription(`> **Hey! Need some help? Like commands, set values etc. Click buttons bellow for help!**`)
  .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
  .setColor(main.displaythings.colors.color_main)
  .setFooter(`${main.displaythings.info.bot_name} | Ver: ${main.displaythings.info.version} | Prefix: ${main.displaythings.info.prefix} | ${main.displaythings.info.bot_website}`, main.displaythings.cdn.bot_logo)
  .setImage(main.displaythings.cdn.banner_gif);

  const davet = new MessageButton()
  .setStyle("LINK")
  .setLabel('Invite Moderator')
  .setEmoji(main.displaythings.emojis.emoj_main)
  .setURL(main.displaythings.cdn.bot_invite);

  const oyver = new MessageButton()
  .setStyle('LINK')
  .setLabel('Vote Moderator')
  .setEmoji(main.displaythings.emojis.emoj_vote)
  .setURL(main.displaythings.cdn.vote_link);

  const site = new MessageButton()
  .setStyle("LINK")
  .setLabel('Web Panel, Commands etc.')
  .setEmoji(main.displaythings.emojis.emoj_web)
  .setURL(main.displaythings.cdn.bot_webpanel);

  const row = new MessageActionRow().addComponents([davet, oyver, site]);
  interaction.reply({ content: `${interaction.user}`, ephemeral: true, embeds: [helpembed], components: [row] });

   } else if (langDb == "tr") {

   const helpembed  = new MessageEmbed()
  .setAuthor('Moderator Bot - Her zaman güvende olun!', main.displaythings.cdn.bot_logo)
  .setTitle(`Merhaba ${interaction.user.username}`)
  .setDescription(`> **Hey! Biraz yardıma mı ihtiyacın var? Komutlar, değerleri ayarlamak v.b. gibi. Aşağıdaki butonlara tıklayarak yardım alabilirsin!**`)
  .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
  .setColor(main.displaythings.colors.color_main)
  .setFooter(`${main.displaythings.info.bot_name} | Ver: ${main.displaythings.info.version} | Prefix: ${main.displaythings.info.prefix} | ${main.displaythings.info.bot_website}`, main.displaythings.cdn.bot_logo)
  .setImage(main.displaythings.cdn.banner_gif);

  const davet = new MessageButton()
  .setStyle("LINK")
  .setLabel('Davet et')
  .setEmoji(main.displaythings.emojis.emoj_main)
  .setURL(main.displaythings.cdn.bot_invite);

  const oyver = new MessageButton()
  .setStyle('LINK')
  .setLabel('Oy ver')
  .setEmoji(main.displaythings.emojis.emoj_vote)
  .setURL(main.displaythings.cdn.vote_link);

  const site = new MessageButton()
  .setStyle("LINK")
  .setLabel('Web Panel, Komutlar v.b.')
  .setEmoji(main.displaythings.emojis.emoj_web)
  .setURL(main.displaythings.cdn.bot_webpanel);

  const row = new MessageActionRow().addComponents([davet, oyver, site]);
  interaction.reply({ content: `${interaction.user}`, ephemeral: true, embeds: [helpembed], components: [row] });
   };
},

},

module.exports.options = {
   needagreed: false,
   perms: ["0"],
   cooldown: 10
}