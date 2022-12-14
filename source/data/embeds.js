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
        "Karalistedesin. Bu bir daha **SONSUZA KADAR** botu kullanamayacaks??n demek."),
      (newTitle = "Karalistedesin");
  else if (type == "warn")
    (newColor = `${main.displaythings.colors.color_warn}`),
      (emojidisp = `${main.displaythings.emojis.emoj_warn}`),
      (newThumb = `${main.displaythings.cdn.logo_warn}`),
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
      (newDescription = `No key/value was found with this key/value, or something already exists with this key/value.\n> **This tried**:\n\`\`\`${
        title || "Err on trying data. Please contact with developer."
      }\`\`\`\n> **Response:**\n\`\`\`${desc || "No response"}\`\`\``),
      (newTitle = `ERRCD: 0001 | Database Error`);
  else if (type == "err2")
    (newColor = `${main.displaythings.colors.color_err}`),
      (emojidisp = `${main.displaythings.emojis.emoj_err}`),
      (newThumb = `${main.displaythings.cdn.logo_err}`),
      (newFooter = `${main.displaythings.info.bot_name} | Ver: ${main.displaythings.info.version} | Prefix: ${main.displaythings.info.prefix} | ${main.displaythings.info.bot_website}`),
      (newAuthor = `${main.displaythings.info.bot_name} | Error`),
      (newDescription = `This command is a command that you cannot run on yourself. If any argument in this command contains information about you and you are the one using the command, this command cannot be executed.\n> *({} Required, []: Optional)*\n> **Example Usage:**\n\`\`\`${title}\`\`\``),
      (newTitle = `ERRCD: 0002 | This Command Cannot Runable on Yourself`);
  else if (type == "warn1")
    (newColor = `${main.displaythings.colors.color_warn}`),
      (emojidisp = `${main.displaythings.emojis.emoj_warn}`),
      (newThumb = `${main.displaythings.cdn.logo_warn}`),
      (newFooter = `${main.displaythings.info.bot_name} | Ver: ${main.displaythings.info.version} | Prefix: ${main.displaythings.info.prefix} | ${main.displaythings.info.bot_website}`),
      (newAuthor = `${main.displaythings.info.bot_name} | Warn`),
      (newDescription = `Missing argument. Usually you get this error when you forget an argument or if the argument is incorrect.\n> *({} Required, []: Optional)*\n> **Example Usage:**\n\`\`\`${
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
      (newAuthor = `${main.displaythings.info.bot_name} | Uyar??`),
      (newDescription = desc),
      (newTitle = title);
      else if (type == "err1_tr")
    (newColor = `${main.displaythings.colors.color_err}`),
      (emojidisp = `${main.displaythings.emojis.emoj_err}`),
      (newThumb = `${main.displaythings.cdn.logo_err}`),
      (newFooter = `${main.displaythings.info.bot_name} | Ver: ${main.displaythings.version} | Prefix: ${main.displaythings.prefix} | ${main.displaythings.botwebsite}`),
      (newAuthor = `${main.displaythings.info.bot_name} | Hata`),
      (newDescription = `Bu anahtar/de??er ile hi??bir anahtar/de??er bulunamad?? veya bu anahtar/de??er zaten bir ??ey var.\n> *({} Zorunlu, []: ??ste??e Ba??l??)*\n> **Denenen**:\n\`\`\`${
        title || "Veri al??n??rken hata. Geli??tirici ile ileti??ime ge??in."
      }\`\`\`\n> **Cevap:**\n\`\`\`${desc || "Cevap yok"}\`\`\``),
      (newTitle = `ERRCD: 0001 | Database Error`);
  else if (type == "err2_tr")
    (newColor = `${main.displaythings.colors.color_err}`),
      (emojidisp = `${main.displaythings.emojis.emoj_err}`),
      (newThumb = `${main.displaythings.cdn.logo_err}`),
      (newFooter = `${main.displaythings.info.bot_name} | Ver: ${main.displaythings.info.version} | Prefix: ${main.displaythings.info.prefix} | ${main.displaythings.info.bot_website}`),
      (newAuthor = `${main.displaythings.info.bot_name} | Hata`),
      (newDescription = `Bu komut, kendi ba????n??za ??al????t??ramayaca????n??z bir komuttur. Bu komuttaki herhangi bir arg??man sizin hakk??n??zda bilgi i??eriyorsa ve komutu kullanan sizseniz, bu komut y??r??t??lemez.\n> *({} Zorunlu, []: ??ste??e Ba??l??)*\n> **??rnek Kullan??m:**\n\`\`\`${title}\`\`\``),
      (newTitle = `ERRCD: 0002 | Bu Komut Kendi ??zerinde Kullan??lamaz`);
  else if (type == "err3")
    (newColor = `${main.displaythings.colors.color_err}`),
      (emojidisp = `${main.displaythings.emojis.emoj_err}`),
      (newThumb = `${main.displaythings.cdn.logo_err}`),
      (newFooter = `${main.displaythings.info.bot_name} | Ver: ${main.displaythings.info.version} | Prefix: ${main.displaythings.info.prefix} | ${main.displaythings.info.bot_website}`),
      (newAuthor = `${main.displaythings.info.bot_name} | Error`),
      (newDescription = `This command is a command that you cannot run on the Moderator. If any argument in this command contains information about the Moderator, this command cannot be executed.\n> *({} Required, []: Optional)*\n> **Example Usage:**\n\`\`\`${title}\`\`\``),
      (newTitle = `ERRCD: 0003 | This command cannot be used on Moderator`);
  else if (type == "err3_tr")
    (newColor = `${main.displaythings.colors.color_err}`),
      (emojidisp = `${main.displaythings.emojis.emoj_err}`),
      (newThumb = `${main.displaythings.cdn.logo_err}`),
      (newFooter = `${main.displaythings.info.bot_name} | Ver: ${main.displaythings.info.version} | Prefix: ${main.displaythings.info.prefix} | ${main.displaythings.info.bot_website}`),
      (newAuthor = `${main.displaythings.info.bot_name} | Hata`),
      (newDescription = `Bu komut, Moderator ??zerinde ??al????t??ramayaca????n??z bir komuttur. Bu komuttaki herhangi bir arg??man Moderator hakk??nda bilgi i??eriyorsa, bu komut y??r??t??lemez.\n> *({}: Zorunlu, []: ??ste??e Ba??l??)*\n> **??rnek Kullan??m:**\n\`\`\`${title}\`\`\``),
      (newTitle = `ERRCD: 0003 | Bu Komut Moderator ??zerinde Kullan??lamaz`);
      else if (type == "err4")
      (newColor = `${main.displaythings.colors.color_err}`),
        (emojidisp = `${main.displaythings.emojis.emoj_err}`),
        (newThumb = `${main.displaythings.cdn.logo_err}`),
        (newFooter = `${main.displaythings.info.bot_name} | Ver: ${main.displaythings.version} | Prefix: ${main.displaythings.prefix} | ${main.displaythings.botwebsite}`),
        (newAuthor = `${main.displaythings.info.bot_name} | Error`),
        (newDescription = `Your permission to run this command is not enough.\n> **You must have this permission(s)**:\n\`\`\`${
          title || "Err on getting data. Please contact with developer."
        }\`\`\`\n> **Your current MAX permission:**\n\`\`\`${desc || "Unable to fetch. Contact with developer"}\`\`\``),
        (newTitle = `ERRCD: 0004 | Permission Error`);
        else if (type == "err4_tr")
        (newColor = `${main.displaythings.colors.color_err}`),
          (emojidisp = `${main.displaythings.emojis.emoj_err}`),
          (newThumb = `${main.displaythings.cdn.logo_err}`),
          (newFooter = `${main.displaythings.info.bot_name} | Ver: ${main.displaythings.version} | Prefix: ${main.displaythings.prefix} | ${main.displaythings.botwebsite}`),
          (newAuthor = `${main.displaythings.info.bot_name} | Error`),
          (newDescription = `Bu komutu ??al????t??rmak i??in izniniz yeterli de??ildir.\n> **??u izin(ler)e sahip olmal??s??n??z**:\n\`\`\`${
            title || "Err on getting data. Please contact with developer."
          }\`\`\`\n> **??uanki MAX izniniz:**\n\`\`\`${desc || "G??r??nt??lenemiyor. Geli??tirici ile ileti??ime ge??in."}\`\`\``),
          (newTitle = `ERRCD: 0004 | ??zin Hatas??`);
  else if (type == "warn1_tr")
    (newColor = `${main.displaythings.colors.color_warn}`),
      (emojidisp = `${main.displaythings.emojis.emoj_warn}`),
      (newThumb = `${main.displaythings.cdn.logo_warn}`),
      (newFooter = `${main.displaythings.info.bot_name} | Ver: ${main.displaythings.info.version} | Prefix: ${main.displaythings.info.prefix} | ${main.displaythings.info.bot_website}`),
      (newAuthor = `${main.displaythings.info.bot_name} | Uyar??`),
      (newDescription = `Kay??p arg??man. Genellikle bir arg??man?? unuttu??unuzda veya arg??man yanl????sa bu hatay?? al??rs??n??z..\n> *({} Zorunlu, []: ??ste??e Ba??l??)*\n> **??rnek Kullan??m:**\n\`\`\`${
        title || "Kullan??m belirtilmemi??"
      }\`\`\`\n> **Hata Sebebi:**\n\`\`\`${desc || "Sebep verilmemi??"}\`\`\``),
      (newTitle = `WARNCD: 0001 | Kay??p Arg??man`);
  else if (type == "success_tr")
    (newColor = `${main.displaythings.colors.color_succ}`),
      (emojidisp = `${main.displaythings.emojis.emoj_succ}`),
      (newThumb = `${main.displaythings.cdn.logo_succ}`),
      (newFooter = `${main.displaythings.info.bot_name} | Ver: ${main.displaythings.info.version} | Prefix: ${main.displaythings.info.prefix} | ${main.displaythings.info.bot_website}`),
      (newAuthor = `${main.displaythings.info.bot_name} | Ba??ar??l??`),
      (newDescription = desc),
      (newTitle = title);

  if (
    type = null
  ) {
    kokturkembed
      .setColor(`${main.displaythings.colors.color_main}`)
      .setTitle(`${title}`)
      .setImage(`${image}`)
      .setThumbnail(`${thumb}`)
      .setFooter(
        `${main.displaythings.info.bot_name} | Ver: ${main.displaythings.version} | Prefix: ${main.displaythings.prefix}`
      )
      .setDescription(desc)
      .setAuthor(author);
  } else {
    kokturkembed
      .setColor(newColor)
      .setTitle(`${newTitle}`)
      .setThumbnail(`${newThumb}`)
      .setFooter({
        text: `${newFooter}`, 
        iconURL: `${main.displaythings.cdn.bot_logo}`
      })
      .setDescription(emojidisp + " " + newDescription)
      .setAuthor({
        name: newAuthor,
        url: main.displaythings.cdn.bot_webpanel,
        iconURL: newThumb,
      });
  }
  return kokturkembed;
};
