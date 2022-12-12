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

client.on("guildMemberRemove", async (member, guild) => {

  if (member.id == client.user.id) return;

  let los = client.users.cache.get(member.id);
  const req = await guildSchema.findOne({ discordId: member.guild.id });
  let onOff = req.needed.events.usrRem.activated;
  if (onOff == false) return;
  let lang = req.needed.systems.langPr;
  let preSys = req.other.preOne;


  const applyText = (canvas, text) => {
    const context = canvas.getContext("2d");
    let fontSize = 70;

    do {
      context.font = `${(fontSize -= 10)}px sans-serif`;
    } while (context.measureText(text).width > canvas.width - 300);

    return context.font;
  };

  const { MessageAttachment } = require("discord.js");
  const { createCanvas, Image } = require("@napi-rs/canvas");
  const { readFile, promises } = require("fs/promises");
  const { request } = require("undici");

  const canvas = createCanvas(700, 250);
  const context = canvas.getContext("2d");
  const wmcontext = canvas.getContext("2d");

  const background = await readFile("./source/data/img/wallpaper.jpg");
  const backgroundImage = new Image();
  backgroundImage.src = background;
  context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

  context.strokeStyle = "#0099ff";
  context.strokeRect(0, 0, canvas.width, canvas.height);

  context.font = "28px sans-serif";
  context.fillStyle = "#ffffff";
  context.fillText(t("usrRem.canvastxt", { ns: "events", lng: lang }), canvas.width / 2.5, canvas.height / 3.5);

  wmcontext.font = "12px sans-serif";
  wmcontext.fillStyle = "#ffffff";
  wmcontext.fillText("Moderator Discord Bot", canvas.width / 1.24, canvas.height / 1.03);
  
  context.font = "28px sans-serif";
  context.fillStyle = "#ffffff";
  context.font = applyText(canvas, `${member.displayName}`);
  context.fillStyle = "#ffffff";
  context.fillText(
    `${member.displayName}`,
    canvas.width / 2.5,
    canvas.height / 1.8
  );

  context.beginPath();
  context.arc(125, 125, 100, 0, Math.PI * 2, true);
  context.closePath();
  context.clip();

  const { body } = await request(
    member.displayAvatarURL({ format: "png" })
  );
  const avatar = new Image();
  avatar.src = Buffer.from(await body.arrayBuffer());
  context.drawImage(avatar, 25, 25, 200, 200);

  const attachment = new MessageAttachment(canvas.toBuffer("image/png"), "welcome-card-moderator.png");

  const kanal = member.guild.channels.cache.get(
    req.needed.texts.goodbye_channel
  );

  const embed = new MessageEmbed()
    .setAuthor({
      iconURL: client.user.displayAvatarURL(),
      name: t("usrRem.author", { ns: "events", lng: lang }),
      url: main.displaythings.cdn.bot_website_link,
    })
    .setTitle(t("usrRem.title", { ns: "events", lng: lang, usrn: member.user.username, srvn: member.guild.name }))
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    .setDescription(
      t("usrRem.desc", { ns: "events", lng: lang, usrm: los.tag, usrid: Formatters.inlineCode(member.user.id)}))
    .setImage(preSys ? null : main.displaythings.cdn.banner_gif)
    .setColor(main.displaythings.colors.color_info);

  if (onOff != null && onOff == true) {
    if (preSys != null && preSys === true) {
      await kanal.send({ embeds: [embed] });
      wait(500)
      await kanal.send({ files: [attachment] })
    } else {
      await kanal.send({ embeds: [embed] });
    }
  }
});
