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
    require("moment-duration-format");
    const kurulus = new Date().getTime() - los.createdAt.getTime();
    const authSys = req.other.preOne;
  
  var kontrol;
  if (kurulus < 1296000000) kontrol = `Account Safety: **Not Safe. Protected.** ${main.displaythings.emoj_err}`
  if (kurulus > 1296000000) kontrol = `Account Safety: **Safe. Can join.** ${main.displaythings.emoj_succ}`
    moment.locale("tr");
    const kanal = member.guild.channels.cache.get(req.needed.texts.welcome_channel)
    const kuruluss = new Date().getTime() - los.createdAt.getTime();  
    const gecen = moment.duration(kuruluss).format(`YY **[Years,]** DD **[Days,]** HH **[Hour,]** mm **[Minitues,]** ss **[Seconds]**`) 
    if (authSys != null || authSys == true) {
const embed = new Discord.MessageEmbed()
.setAuthor({
  iconURL: client.user.displayAvatarURL(),
  name: `${main.displaythings.emojis.emoj_wel_header_one}${main.displaythings.emojis.emoj_wel_header_two}`,
  url: main.displaythings.cdn.bot_website_link
})
.setTitle(`${member.user.username} joined to *${member.guild.name}*`)
.setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
.setDescription(`Member named ${los}(${Formatters.codeBlock(member.user.id)}) is joined server.

Account is created at \`${gecen}\` ago.

`+ kontrol +`

`)
.setColor(main.displaythings.colors.color_info)
kanal.send(`<@&${req.adminRole}>`)
wait(400);
kanal.send({ embeds: [embed]})
} else if (authSys == null || authSys == false) {
  return
}
});
