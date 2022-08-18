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
const wait = require("node:timers/promises").setTimeout;

client.on("guildMemberAdd", async (member, guild) => {
    let los = client.users.cache.get(member.id);
    const req = await guildSchema.findOne({ discordId: member.guild.id });
    let onOff = req.needed.events.usrAdd.activated;
    if (onOff === false) return;
    let lang = req.needed.systems.langPr;
    const moment = require("moment")
    require("moment-duration-format");
    const kurulus = new Date().getTime() - los.createdAt.getTime();
    const authSys = req.other.preOne;
  
  var kontrol = "";
  if (kurulus < 1296000000) kontrol = `> ${main.displaythings.emojis.emoj_sup} **Account Safety: Not Safe. Protected.** ${main.displaythings.emojis.emoj_err}`
  if (kurulus > 1296000000) kontrol = `> ${main.displaythings.emojis.emoj_sup} **Account Safety: Safe. Can join.** ${main.displaythings.emojis.emoj_succ}`
    moment.locale("tr");
    const kanal = member.guild.channels.cache.get(req.needed.texts.welcome_channel)
    const kuruluss = new Date().getTime() - los.createdAt.getTime();  
    const gecen = moment.duration(kuruluss).format(`YY **[Years,]** DD **[Days,]** HH **[Hour,]** mm **[Minitues,]** ss **[Seconds]**`) 
    if (authSys != null && authSys == true) {
const embed = new MessageEmbed()
.setAuthor({
  iconURL: client.user.displayAvatarURL(),
  name: `Welcome To Server!`,
  url: main.displaythings.cdn.bot_website_link
})
.setTitle(`${member.user.username} joined to *${member.guild.name}*`)
.setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
.setDescription(`${main.displaythings.emojis.emoj_wel_header_one}${main.displaythings.emojis.emoj_wel_header_two} Member named ${los}(${Formatters.inlineCode(member.user.id)}) is joined to server.

Account is created at \`${gecen}\` ago.

`+ kontrol +`

`)
.setImage(main.displaythings.cdn.banner_gif)
.setColor(main.displaythings.colors.color_info)
kanal.send(`<@&${req.needed.roles.adminRol}> & ${los}`)
wait(400);
kanal.send({ embeds: [embed]})
} else if (authSys == null || authSys == false) {
  return
}
});
