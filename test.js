// Tanımlayıcılar
const {
    MessageActionRow,
    MessageButton,
    MessageEmbed,
    Formatters,
    Permissions,
  } = require("discord.js");
  const { t } = require("i18next");
  const { SlashCommandBuilder } = require("@discordjs/builders");
  const main = require("../data/main");
  const GuildModel = require("../models/GuildModel");

  (module.exports = {
      data: new SlashCommandBuilder().setName("test").setDescription("testt"),

      async execute(interaction) {

        const embed = new MessageEmbed()
            .setAuthor({
              iconURL: main.displaythings.cdn.bot_logo_gif,
              name: "Confirmation System for Moderator"
            })
            .setDescription("> :flag_us: In order to use the Moderator, you must confirm your e-mail with the button below. Click once, enter your e-mail, click once more, enter the code. If the code is correct, your account is confirmed.\n> **NOTE: Your e-mail will be stored on " + main.displaythings.info.bot_name + " Bot's server and your data is stored confidentially and encrypted with the [AES encryption method](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard).**\n\n> :flag_tr: Moderator'ü kullanabilmek için e-postanızı aşağıdaki butondan onaylamanız gereklidir. 1 kez tıklayın, mailinizi girin, 1 kere daha tıklayın, kodu girin. Eğer kod doğru ise hesabınız onaylanır.\n> **NOT: E-posta adresiniz " + main.displaythings.info.bot_name + " Bot'un sunucularında saklanacaktır. Verileriniz, gizli şekilde saklanır ve [AES şifreleme yöntemi](https://tr.wikipedia.org/wiki/AES) ile şifrelenir.**")
            .setColor(main.displaythings.colors.color_main)

            const buton = new MessageButton()
            .setCustomId("emailsend")
            .setDisabled(false)
            .setEmoji("📧")
            .setLabel("Confirm Button")
            .setStyle("PRIMARY")

            const row = new MessageActionRow().addComponents([ buton ]);

          interaction.channel.send({ embeds: [embed], components: [row]})

      }
  });
  (module.exports.options = {
    needagreed: false,
    perms: ["0"],
    cooldown: 10,
  });