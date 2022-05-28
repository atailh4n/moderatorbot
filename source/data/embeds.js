const { MessageEmbed } = require("discord.js");
const main = require("./main");
module.exports = (type, title, desc, image, author, thumb) => {
  const kokturkembed = new MessageEmbed().setTimestamp();

  let newColor = "";
  let emojidisp = "";
  let newFooter = "";
  let newThumb = "";
  let newAuthor = "";
  let newDescription = "";
  let newTitle = "";

  if (type == "general")
    (newColor = `${main.displaythings.colors.color_main}`),
      (emojidisp = `${main.displaythings.emojis.emoj_main}`),
      (newThumb = `${main.displaythings.cdn.bot_logo}`),
      (newFooter = `${main.displaythings.info.bot_name} | Ver: ${main.displaythings.info.version} | Prefix: ${main.displaythings.info.prefix} | ${main.displaythings.info.bot_website}`),
      (newAuthor = `${main.displaythings.info.bot_name}`),
      (newDescription = desc),
      (newTitle = title);
  else if (type == "error")
    (newColor = `${main.displaythings.colors.color_err}`),
      (emojidisp = `${main.displaythings.emojis.emoj_err}`),
      (newThumb = `${main.displaythings.cdn.logo_err}`),
      (newFooter = `${main.displaythings.info.bot_name} | Ver: ${main.displaythings.info.version} | Prefix: ${main.displaythings.info.prefix} | ${main.displaythings.info.bot_website}`),
      (newAuthor = `${main.displaythings.info.bot_name} | Error`),
      (newDescription = desc),
      (newTitle = title);
  else if (type == "error_tr")
    (newColor = `${main.displaythings.colors.color_err}`),
      (emojidisp = `${main.displaythings.emojis.emoj_err}`),
      (newThumb = `${main.displaythings.cdn.logo_err}`),
      (newFooter = `${main.displaythings.info.bot_name} | Ver: ${main.displaythings.info.version} | Prefix: ${main.displaythings.info.prefix} | ${main.displaythings.info.bot_website}`),
      (newAuthor = `${main.displaythings.info.bot_name} | Hata`),
      (newDescription = desc),
      (newTitle = title);
  else if (type == "info")
    (newColor = `${main.displaythings.colors.color_info}`),
      (emojidisp = `${main.displaythings.emojis.emoj_info}`),
      (newThumb = `${main.displaythings.cdn.logo_info}`),
      (newFooter = `${main.displaythings.info.bot_name} | Ver: ${main.displaythings.info.version} | Prefix: ${main.displaythings.info.prefix} | ${main.displaythings.info.bot_website}`),
      (newAuthor = `${main.displaythings.info.bot_name} | Info`),
      (newDescription = desc),
      (newTitle = title);
  else if (type == "info_tr")
    (newColor = `${main.displaythings.colors.color_info}`),
      (emojidisp = `${main.displaythings.emojis.emoj_info}`),
      (newThumb = `${main.displaythings.cdn.logo_info}`),
      (newFooter = `${main.displaythings.info.bot_name} | Ver: ${main.displaythings.info.version} | Prefix: ${main.displaythings.info.prefix} | ${main.displaythings.info.bot_website}`),
      (newDescription = desc),
      (newAuthor = `${main.displaythings.info.bot_name} | Bilgi`),
      (newTitle = title);
  else if (type == "blacklisted")
    (newColor = `#000000`),
      (emojidisp = `${main.displaythings.emojis.emoj_info}`),
      (newThumb = `${main.displaythings.cdn.logo_err}`),
      (newFooter = `${main.displaythings.info.bot_name} | Ver: ${main.displaythings.info.version} | Prefix: ${main.displaythings.info.prefix} | ${main.displaythings.info.bot_website}`),
      (newAuthor = `${main.displaythings.info.bot_name} | Blacklisted`),
      (newDescription =
        "You are blacklisted. This means you are not able to use bot **FOREVER!**"),
      (newTitle = "You are blacklisted");
  else if (type == "blacklisted_tr")
    (newColor = `#000000`),
      (emojidisp = `${main.displaythings.emojis.emoj_info}`),
      (newThumb = `${main.displaythings.cdn.logo_err}`),
      (newFooter = `${main.displaythings.info.bot_name} | Ver: ${main.displaythings.info.version} | Prefix: ${main.displaythings.info.prefix} | ${main.displaythings.info.bot_website}`),
      (newAuthor = `${main.displaythings.info.bot_name} | Karalistelendin`),
      (newDescription =
        "Karalistedesin. Bu bir daha **SONSUZA KADAR** botu kullanamayacaksın demek."),
      (newTitle = "Karalistedesin");
  else if (type == "warn")
    (newColor = `${main.displaythings.colors.color_warn}`),
      (emojidisp = `${main.displaythings.emojis.emoj_warn}`),
      (newThumb = `${main.displaythings.emojis.emoj_warn}`),
      (newFooter = `${main.displaythings.info.bot_name} | Ver: ${main.displaythings.info.version} | Prefix: ${main.displaythings.info.prefix} | ${main.displaythings.info.bot_website}`),
      (newAuthor = `${main.displaythings.info.bot_name} | Warning`),
      (newDescription = desc),
      (newTitle = title);
  else if (type == "err1")
    (newColor = `${main.displaythings.colors.color_err}`),
      (emojidisp = `${main.displaythings.emojis.emoj_err}`),
      (newThumb = `${main.displaythings.cdn.logo_err}`),
      (newFooter = `${main.displaythings.info.bot_name} | Ver: ${main.displaythings.version} | Prefix: ${main.displaythings.prefix} | ${main.displaythings.botwebsite}`),
      (newAuthor = `${main.displaythings.info.bot_name} | Error`),
      (newDescription = `No key/value was found with this key/value, or something already exists with this key/value.\n> **This tryed**:\n\`\`\`${
        title || "Err on trying data. Please contact with developer."
      }\`\`\`\n> **Response:**\n\`\`\`${desc || "No response"}\`\`\``),
      (newTitle = `ERRCD: 0001 | Database Error`);
  else if (type == "err2")
    (newColor = `${main.displaythings.colors.color_err}`),
      (emojidisp = `${main.displaythings.emojis.emoj_err}`),
      (newThumb = `${main.displaythings.cdn.logo_err}`),
      (newFooter = `${main.displaythings.info.bot_name} | Ver: ${main.displaythings.info.version} | Prefix: ${main.displaythings.info.prefix} | ${main.displaythings.info.bot_website}`),
      (newAuthor = `${main.displaythings.info.bot_name} | Error`),
      (newDescription = `This command is a command that you cannot run on yourself. If any argument in this command contains information about you and you are the one using the command, this command cannot be executed.\n> **Example Usage:**\n\`\`\`${title}\`\`\``),
      (newTitle = `ERRCD: 0002 | This Command Cannot Runable on Yourself`);
  else if (type == "warn1")
    (newColor = `${main.displaythings.colors.color_warn}`),
      (emojidisp = `${main.displaythings.emojis.emoj_warn}`),
      (newThumb = `${main.displaythings.cdn.logo_warn}`),
      (newFooter = `${main.displaythings.info.bot_name} | Ver: ${main.displaythings.info.version} | Prefix: ${main.displaythings.info.prefix} | ${main.displaythings.info.bot_website}`),
      (newAuthor = `${main.displaythings.info.bot_name} | Warn`),
      (newDescription = `Missing argument. Usually you get this error when you forget an argument or if the argument is incorrect.\n> **Example Usage:**\n\`\`\`${
        title || "Any usage given"
      }\`\`\`\n> **Cause of Error:**\n\`\`\`${
        desc || "No explanation given"
      }\`\`\``),
      (newTitle = `WARNCD: 0001 | Missing Argument`);
  else if (type == "success")
    (newColor = `${main.displaythings.colors.color_succ}`),
      (emojidisp = `${main.displaythings.emojis.emoj_succ}`),
      (newThumb = `${main.displaythings.cdn.logo_succ}`),
      (newFooter = `${main.displaythings.info.bot_name} | Ver: ${main.displaythings.info.version} | Prefix: ${main.displaythings.info.prefix} | ${main.displaythings.info.bot_website}`),
      (newAuthor = `${main.displaythings.info.bot_name} | Success`),
      (newDescription = desc),
      (newTitle = title);
  else if (type == "warn_tr")
    (newColor = `${main.displaythings.colors.color_warn}`),
      (emojidisp = `${main.displaythings.emojis.emoj_warn}`),
      (newThumb = `${main.displaythings.cdn.logo_warn}`),
      (newFooter = `${main.displaythings.info.bot_name} | Ver: ${main.displaythings.info.version} | Prefix: ${main.displaythings.info.prefix} | ${main.displaythings.info.bot_website}`),
      (newAuthor = `${main.displaythings.info.bot_name} | Uyarı`),
      (newDescription = desc),
      (newTitle = title);
  else if (type == "err1_tr")
    (newColor = `${main.displaythings.colors.color_err}`),
      (emojidisp = `${main.displaythings.emojis.emoj_err}`),
      (newThumb = `${main.displaythings.cdn.logo_err}`),
      (newFooter = `${main.displaythings.info.bot_name} | Ver: ${main.displaythings.version} | Prefix: ${main.displaythings.prefix} | ${main.displaythings.botwebsite}`),
      (newAuthor = `${main.displaythings.info.bot_name} | Hata`),
      (newDescription = `Bu anahtar/değer ile hiçbir anahtar/değer bulunamadı veya bu anahtar/değer zaten bir şey var.\n> **Denenen**:\n\`\`\`${
        title || "Veri alınırken hata. Geliştirici ile iletişime geçin."
      }\`\`\`\n> **Cevap:**\n\`\`\`${desc || "Cevap yok"}\`\`\``),
      (newTitle = `ERRCD: 0001 | Database Error`);
  else if (type == "err2_tr")
    (newColor = `${main.displaythings.colors.color_err}`),
      (emojidisp = `${main.displaythings.emojis.emoj_err}`),
      (newThumb = `${main.displaythings.cdn.logo_err}`),
      (newFooter = `${main.displaythings.info.bot_name} | Ver: ${main.displaythings.info.version} | Prefix: ${main.displaythings.info.prefix} | ${main.displaythings.info.bot_website}`),
      (newAuthor = `${main.displaythings.info.bot_name} | Hata`),
      (newDescription = `Bu komut, kendi başınıza çalıştıramayacağınız bir komuttur. Bu komuttaki herhangi bir argüman sizin hakkınızda bilgi içeriyorsa ve komutu kullanan sizseniz, bu komut yürütülemez.\n> **Örnek Kullanım:**\n\`\`\`${title}\`\`\``),
      (newTitle = `ERRCD: 0002 | Bu Komut Kendi Üzerinde Kullanılamaz`);
  else if (type == "err3")
    (newColor = `${main.displaythings.colors.color_err}`),
      (emojidisp = `${main.displaythings.emojis.emoj_err}`),
      (newThumb = `${main.displaythings.cdn.logo_err}`),
      (newFooter = `${main.displaythings.info.bot_name} | Ver: ${main.displaythings.info.version} | Prefix: ${main.displaythings.info.prefix} | ${main.displaythings.info.bot_website}`),
      (newAuthor = `${main.displaythings.info.bot_name} | Error`),
      (newDescription = `This command is a command that you cannot run on the Moderator. If any argument in this command contains information about the Moderator, this command cannot be executed.\n> **Örnek Kullanım:**\n\`\`\`${title}\`\`\``),
      (newTitle = `ERRCD: 0003 | This command cannot be used on Moderator`);
  else if (type == "err3_tr")
    (newColor = `${main.displaythings.colors.color_err}`),
      (emojidisp = `${main.displaythings.emojis.emoj_err}`),
      (newThumb = `${main.displaythings.cdn.logo_err}`),
      (newFooter = `${main.displaythings.info.bot_name} | Ver: ${main.displaythings.info.version} | Prefix: ${main.displaythings.info.prefix} | ${main.displaythings.info.bot_website}`),
      (newAuthor = `${main.displaythings.info.bot_name} | Hata`),
      (newDescription = `Bu komut, Moderator üzerinde çalıştıramayacağınız bir komuttur. Bu komuttaki herhangi bir argüman Moderator hakkında bilgi içeriyorsa, bu komut yürütülemez.\n> **Örnek Kullanım:**\n\`\`\`${title}\`\`\``),
      (newTitle = `ERRCD: 0003 | Bu Komut Moderator Üzerinde Kullanılamaz`);
  else if (type == "warn1_tr")
    (newColor = `${main.displaythings.colors.color_warn}`),
      (emojidisp = `${main.displaythings.emojis.emoj_warn}`),
      (newThumb = `${main.displaythings.cdn.logo_warn}`),
      (newFooter = `${main.displaythings.info.bot_name} | Ver: ${main.displaythings.info.version} | Prefix: ${main.displaythings.info.prefix} | ${main.displaythings.info.bot_website}`),
      (newAuthor = `${main.displaythings.info.bot_name} | Uyarı`),
      (newDescription = `Kayıp argüman. Genellikle bir argümanı unuttuğunuzda veya argüman yanlışsa bu hatayı alırsınız..\n> **Örnek Kullanım:**\n\`\`\`${
        title || "Kullanım belirtilmemiş"
      }\`\`\`\n> **Hata Sebebi:**\n\`\`\`${desc || "Sebep verilmemiş"}\`\`\``),
      (newTitle = `WARNCD: 0001 | Kayıp Argüman`);
  else if (type == "success_tr")
    (newColor = `${main.displaythings.colors.color_succ}`),
      (emojidisp = `${main.displaythings.emojis.emoj_succ}`),
      (newThumb = `${main.displaythings.cdn.logo_succ}`),
      (newFooter = `${main.displaythings.info.bot_name} | Ver: ${main.displaythings.info.version} | Prefix: ${main.displaythings.info.prefix} | ${main.displaythings.info.bot_website}`),
      (newAuthor = `${main.displaythings.info.bot_name} | Başarılı`),
      (newDescription = desc),
      (newTitle = title);

  if (
    newColor == "" ||
    emojidisp == "" ||
    newThumb == "" ||
    newFooter == "" ||
    newAuthor == "" ||
    newDescription == "" ||
    newTitle == ""
  ) {
    kokturkembed
      .setColor(`${main.displaythings.colors.color_main}`)
      .setTitle(`${title}`)
      .setImage(`${image}`)
      .setThumbnail(`${thumb}`)
      .setFooter(
        `${main.displaythings.info.bot_name} | Ver: ${main.displaythings.version} | For Help: ${main.displaythings.prefix}help`
      )
      .setDescription(desc)
      .setAuthor(author);
  } else {
    kokturkembed
      .setColor(`${newColor}`)
      .setTitle(`${newTitle}`)
      .setThumbnail(`${newThumb}`)
      .setFooter(`${newFooter}`, `${main.displaythings.cdn.bot_logo}`)
      .setDescription(emojidisp + " " + newDescription)
      .setAuthor(`${newAuthor}`, `${newThumb}`);
  }
  return kokturkembed;
};
