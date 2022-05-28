const guildSchema = require("../models/GuildModel");
const { client } = require("../../index");
const main = require("../data/main");
const Discord = require("discord.js");

client.on("guildCreate", async (guild) => {
  const document = new guildSchema({
    discordId: guild.id,
  });

  await document
    .save()
    .then(console.log("🔼[ADDED TO SERVER] Bot added to " + guild.name));

  const guildId_unique = await guildSchema.findOne({ discordId: guild.id });

  let botname = main.displaythings.info.bot_name;

  const welcmemb = new Discord.MessageEmbed()
    .setThumbnail(main.displaythings.botlogo)
    .setAuthor(`${botname} Discord Bot`, `${main.displaythings.cdn.bot_logo}`)
    .addField(
      `<:arr:878338531641139210> ${botname} | Hello!`,
      `**Hello. I'm ${main.displaythings.info.ownername}. Developer of ${botname} Discord Bot. Thanks for adding my bot. I hope you like and enjoy with my bot**\n\n> *This Server Unique DB ID: ||${guildId_unique._id}||*`
    )
    .addField(
      `<:arr:878338531641139210> ${botname} | Language`,
      `> ${botname} has 2 languages; Türkçe🇹🇷, English🇬🇧. Değiştirmek için **"Web Panel"**e gidin/For change go to **"Web Panel"**`
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
      `> To change the server settings, you must go to **"Web Panel"**.`
    )
    .addField(
      `<:arr:878338531641139210> ${botname} | Links`,
      `> For Links: \`/links\``
    )
    .addField(
      `<:arr:878338531641139210> ${botname} | Saving datas`,
      `> We always store user data with encryption. For help with the "Which datas we save?", contact the developer and read or Privacy Policy. When adding the ${botname}, you will be deemed to have accepted rules.\n> *Developer:* **${main.displaythings.info.ownerdcname}**`
    )
    .addField(
      `<:arr:878338531641139210> ${botname} | Open Source`,
      `> **This bot was coded by Ata İlhan Köktürk.** Please do not delete the reference part! You can only copy this infrastructure for personal use (for example: Training, Learning Code and Handler systems, etc.). If it is copied for profit, the legal process will be initiated! The most important reason it's open source code is to show that there's no malware in our bot. For more information:\n> *DM my Instagram address:* **@atailh4n**`
    )
    .setDescription(
      `**[Invite Bot](${main.displaythings.cdn.bot_invite})** | **[Support Server](${main.displaythings.cdn.bot_supserver})** | **[Website](https://${main.displaythings.info.bot_website}/)**`
    )
    .setFooter(
      `${botname} | Advanced Moderation Bot | 2020-2021`,
      `${main.displaythings.cdn.bot_logo}`
    )
    .setImage(main.displaythings.cdn.banner_added)
    .setColor(main.displaythings.colors.color_main)
    .setTimestamp();

  const davet = new Discord.MessageButton()
    .setStyle("LINK")
    .setLabel("Invite Moderator")
    .setEmoji(main.displaythings.emojis.emoj_main)
    .setURL(main.displaythings.cdn.bot_invite);

  const supp = new Discord.MessageButton()
    .setStyle("LINK")
    .setLabel("Support Server")
    .setEmoji(main.displaythings.emojis.emoj_sup)
    .setURL(main.displaythings.cdn.vote_link);

  const site = new Discord.MessageButton()
    .setStyle("LINK")
    .setLabel("Web Panel, Privacy Policy, Commands etc.")
    .setEmoji(main.displaythings.emojis.emoj_main)
    .setURL(`https://${main.displaythings.info.bot_website}/`);

  const oyver = new Discord.MessageButton()
    .setStyle("LINK")
    .setLabel("Vote Moderator")
    .setEmoji(main.displaythings.emojis.emoj_vote)
    .setURL(main.displaythings.cdn.vote_link);

  const row = new Discord.MessageActionRow().addComponents([
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
