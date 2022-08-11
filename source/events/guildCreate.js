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

client.on("guildCreate", async (guild) => {
  const document = new guildSchema({
    discordId: guild.id,
  });

  await document
    .save()
    .then(console.log("🔼[ADDED TO SERVER] Bot added to " + guild.name));

  const guildId_unique = await guildSchema.findOne({ discordId: guild.id });

  let serverowner = await guild.fetchOwner();
  
  await guildSchema.findOneAndUpdate({ discordId: guild.id }, { $push: { "needed.safe.safeUser": serverowner.id }}, {new: true})

  let botname = main.displaythings.info.bot_name;

  const welcmemb = new MessageEmbed()
    .setThumbnail(main.displaythings.botlogo)
    .setAuthor({
      name: `${botname} Discord Bot`,
      iconURL: main.displaythings.cdn.bot_logo_gif,
      url: main.displaythings.cdn.bot_website_link
    })
    .addField(
      `<:arr:878338531641139210> ${botname} | Hello!`,
      `**Hello. I'm ${main.displaythings.info.ownername}. Developer of ${botname} Discord Bot. Thanks for adding my bot. I hope you like and enjoy with my bot**\n\n> *This Server Unique DB ID: ||${guildId_unique._id}||*`
    )
    .addField(
      `<:arr:878338531641139210> ${botname} | Language`,
      `> ${botname} has 2 languages for guilds; Türkçe🇹🇷, English🇬🇧. Sunucu dilini değiştirmek için **"Web Panel"**e gidin/For change guild language go to **"Web Panel"** (Normal kullanıcı diliniz algılanır/Your normal user language is detected)`
    )
    .addField(
      `<:arr:878338531641139210> ${botname} | Prefix`,
      `> **${botname}**'s has no prefix. Use slash commands. **If commands not displaying, refresh your Discord or kick and add bot again.**`
    )
    .addField(
      `<:arr:878338531641139210> ${botname} | How to use?`,
      `> To take advantage of all the features of **${botname}**, go to **"Web Panel"** and read the commands.`
    )
    .addField(
      `<:arr:878338531641139210> ${botname} | Guild Settings`,
      `> To change the server settings, you have to go **"Web Panel"**.`
    )
    .addField(
      `<:arr:878338531641139210> ${botname} | Help`,
      `> For help: \`/help\``
    )
    .addField(
      `<:arr:878338531641139210> ${botname} | Saving datas`,
      `> We always store user data with encryption. For help with the **"Which datas we save?"**, first read to **[our Privacy Policy](${main.displaythings.cdn.privacypolicy})** and after that if you have a question, contact with developer. When adding the ${botname}, you will be deemed to have accepted our policies and **[Term Of Service](${main.displaythings.cdn.tos})**.\n> *Developer:* **${main.displaythings.info.ownerdcname}**`
    )
    .addField(
      `<:arr:878338531641139210> ${botname} | Open Source`,
      `> **This bot was coded by Ata İlhan Köktürk.** Please do not delete the reference part! You can only copy this infrastructure for personal use (for example: Training, Learning Code and Handler systems, etc.). If it is copied for profit, the legal process will be initiated! The most important reason it's open source code is to show that there's no malware in our bot. For more information:\n> *DM our Instagram address:* **@kokturkwebsoftware**`
    )
    .setDescription(
      `**[Invite Bot](${main.displaythings.cdn.bot_invite})** | **[Support Server](${main.displaythings.cdn.bot_supserver})** | **[Website](https://${main.displaythings.info.bot_website}/)** | **[Term Of Service](${main.displaythings.cdn.tos})** | **[Privacy Policy](${main.displaythings.cdn.privacypolicy})**`
    )
    .setFooter({
      text: `${botname} | Advanced Moderation Bot | 2020-2022`,
      iconURL: main.displaythings.cdn.bot_logo  
    })
    .setImage(main.displaythings.cdn.banner_added)
    .setColor(main.displaythings.colors.color_main)
    .setTimestamp();

  const davet = new MessageButton()
    .setStyle("LINK")
    .setLabel("Invite Moderator")
    .setEmoji(main.displaythings.emojis.emoj_main)
    .setURL(main.displaythings.cdn.bot_invite);

  const supp = new MessageButton()
    .setStyle("LINK")
    .setLabel("Support Server")
    .setEmoji(main.displaythings.emojis.emoj_sup)
    .setURL(main.displaythings.cdn.vote_link);

  const site = new MessageButton()
    .setStyle("LINK")
    .setLabel("Web Panel, Privacy Policy, Commands etc.")
    .setEmoji(main.displaythings.emojis.emoj_main)
    .setURL(`https://${main.displaythings.info.bot_website}/`);

  const oyver = new MessageButton()
    .setStyle("LINK")
    .setLabel("Vote Moderator")
    .setEmoji(main.displaythings.emojis.emoj_vote)
    .setURL(main.displaythings.cdn.vote_link);

  const row = new MessageActionRow().addComponents([
    davet,
    supp,
    site,
    oyver,
  ]);

  let defaultChannel = await guild.fetchOwner();
  let snd = defaultChannel.id;
  if (!snd)
    guild.channels.cache.forEach((channel) => {
      if (channel.type == "text" && defaultChannel == "") {
        if (
          client.guilds.cache
            .get(guild.id)
            .members.fetch(client.user.id)
            .permissions.has("SEND_MESSAGES")
        ) {
          defaultChannel = channel;
        }
      }
    });

  defaultChannel.send({ embeds: [welcmemb], components: [row] });
});
