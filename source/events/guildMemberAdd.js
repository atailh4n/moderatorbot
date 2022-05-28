const guildSchema = require("../models/GuildModel");
const { client } = require("../../index");
const main = require("../data/main");
const Discord = require("discord.js");
const moment = require("moment");

client.on("guildMemberAdd", async (member, guild) => {
  /*
    let los = client.users.cache.get(member.id);
    const req = await guildSchema.findOne({ discordId: member.guild.id });
    let lang = req.needed.systems.langPr;
    require("moment-duration-format");
    const kurulus = new Date().getTime() - los.createdAt.getTime();
    const authSys = req.other.preOne;
  
  var kontrol;
  if (kurulus < 1296000000) kontrol = `Account Safety: **Not Safe. Protected.** ${main.displaythings.emoj_err}`
  if (kurulus > 1296000000) kontrol = `Hesap Durumu: **Safe. Can join.** ${main.displaythings.emoj_succ}`
    moment.locale("tr");
    const kanal = member.guild.channels.cache.get(req.needed.texts.modlog)
    const kuruluss = new Date().getTime() - los.createdAt.getTime();  
    const gecen = moment.duration(kuruluss).format(`YY **[Years,]** DD **[Days,]** HH **[Hour,]** mm **[Minitues,]** ss **[Seconds]**`) 
    if (authSys != null || authSys == true) {
const embed = new Discord.MessageEmbed()
.setAuthor(`${main.displaythings.emojis.emoj_wel_header_one}${main.displaythings.emojis.emoj_wel_header_two}`)
.setTitle(`Sunucuya katılan üye: ${member.user.username}`)
.setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
.setDescription(`Member named ${los} is joined server.

Account is created at \`${gecen}\` ago.

`+ kontrol +`

`)

.setColor("GREEN")
kanal.send(`<@&${req.adminRole}>`)
kanal.send({ embeds: [embed]})
} else if (authSys == null || authSys == false) {
  const embed = new Discord.MessageEmbed()
.setTitle(`Sunucuya katılan üye: ${member.user.username}`)
.setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
.setDescription(`${los} dlı üye sunucunuza katılmıştır`)
}
*/
});
