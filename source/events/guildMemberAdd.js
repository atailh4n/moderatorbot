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
const moment = require("moment");
require("moment-duration-format");
const { t } = require("i18next");

moment.locale("tr");

client.on("guildMemberAdd", async (member, guild) => {
  let los = client.users.cache.get(member.id);
  const req = await guildSchema.findOne({ discordId: member.guild.id });
  let autoRole = req.needed.roles.autoRole;
  let susRole = req.needed.roles.susRol;
  let autoRoleOnof = req.needed.systems.autoRoleSys;
  let onOff = req.needed.events.usrAdd.activated;
  if (onOff == false) return;
  let lang = req.needed.systems.langPr;

  const kurulus = new Date().getTime() - los.createdAt.getTime();
  const authSys = req.other.preOne;

  var kontrol = "";
  var safety = 0;
  var lastEmoj = null;
  if (kurulus < 1296000000) 
  safety = 0;
  kontrol = t("usrAdd.control0_pre", { ns: "events", lng: lang });
  if (kurulus > 1296000000)
  safety = 1;
  kontrol = t("usrAdd.control1", { ns: "events", lng: lang });

  if (authSys != null && authSys == true) {
    if (safety == 0) lastEmoj = main.displaythings.emojis.emoj_err;
    if (safety == 1) lastEmoj = main.displaythings.emojis.emoj_succ;
  } else {
    lastEmoj = null
  }

  const kanal = member.guild.channels.cache.get(
    req.needed.texts.welcome_channel
  );
  const kuruluss = new Date().getTime() - los.createdAt.getTime();
  const gecen = moment
    .duration(kuruluss)
    .format(
      t("usrAdd.year", { ns: "events", lng: lang })
    );

  const embed = new MessageEmbed()
    .setAuthor({
      iconURL: client.user.displayAvatarURL(),
      name: t("usrAdd.author", { ns: "events", lng: lang }),
      url: main.displaythings.cdn.bot_website_link,
    })
    .setTitle(t("usrAdd.title", { ns: "events", lng: lang, usrn: member.user.username, srvn: member.guild.name }))
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    .setDescription(
      t("usrAdd.desc", { ns: "events", lng: lang, usrm: los.tag, usrid: Formatters.inlineCode(member.user.id), time: (authSys ? gecen : t("usrAdd.control2", { ns: "events", lng: lang })), contr: (authSys ? kontrol : t("usrAdd.control0", { ns: "events", lng: lang }))}) + (lastEmoj != null ? lastEmoj : "")
    )
    .setImage(main.displaythings.cdn.banner_gif)
    .setColor(main.displaythings.colors.color_info);

    const supp = new MessageButton()
    .setStyle("LINK")
    .setLabel(t("buttons.support", { ns: "common", lng: lang }))
    .setEmoji(main.displaythings.emojis.emoj_sup)
    .setURL(main.displaythings.cdn.bot_supserver);

  const row = new MessageActionRow().addComponents([supp]);

  if (onOff != null && onOff == true) {
    if (autoRoleOnof != null || autoRoleOnof == true) {
      const userToRole = await client.guilds.cache
        .get(member.guild.id)
        .members.fetch(los);
      if (authSys != null && authSys == true) {
        if (safety == 0) {
          await userToRole.roles.add(susRole);
          await kanal.send(`<@&${req.needed.roles.adminRol}> & ${los}`);
          wait(400);
          await kanal.send({ embeds: [embed] });
        } else if (safety == 1) {
          await userToRole.roles.add(autoRole);
          await kanal.send(`<@&${req.needed.roles.adminRol}> & ${los}`);
          wait(400);
          await kanal.send({ embeds: [embed] });
        }
      } else {
        await userToRole.roles.add(autoRole);
        await kanal.send(`<@&${req.needed.roles.adminRol}> & ${los}`);
        wait(400);
        await kanal.send({ embeds: [embed], components: [row] });
      }
    } else {
      return
    }
  }
});
