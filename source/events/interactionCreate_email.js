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
const { Modal, showModal, TextInputComponent } = require("discord-modals");
const guildSchema = require("../models/GuildModel");
const UserModel = require("../models/UserModel");
const localdb = require("quick.db");

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isButton()) return;

  if (interaction.customId == "emailsend") {
    const userEmail = await UserModel.findOne({ discordId: interaction.user.id });

    if(userEmail.email != null) return interaction.reply({ content: interaction.user + " you already confirmed your email.", ephemeral: true })

    const timeSchedulce =
      (await client.tempemail.get(`timer.${interaction.user.id}`)) ||
      Date.now();

    console.log(timeSchedulce - Date.now());

    if (timeSchedulce - Date.now() >= 0) {
      const modalemail = new Modal() // We create a Modal
        .setCustomId("code-confirmer")
        .setTitle("Enter your code")
        .addComponents(
          new TextInputComponent() // We create a Text Input Component
            .setCustomId("email-code")
            .setLabel("Your Code")
            .setStyle("SHORT") //IMPORTANT: Text Input Component Style can be 'SHORT' or 'LONG'
            .setMaxLength(10)
            .setPlaceholder("MDRT-XXXXX")
            .setRequired(true)
        );
      showModal(modalemail, {
        client: client,
        interaction: interaction,
      });
    } else {
      const modalemail = new Modal() // We create a Modal
        .setCustomId("email-taker")
        .setTitle("Enter your mail")
        .addComponents(
          new TextInputComponent() // We create a Text Input Component
            .setCustomId("email-popup")
            .setLabel("Your E-Mail")
            .setStyle("SHORT") //IMPORTANT: Text Input Component Style can be 'SHORT' or 'LONG'
            .setMinLength(5)
            .setPlaceholder("test123@example.com")
            .setRequired(true)
        );

      showModal(modalemail, {
        client: client,
        interaction: interaction,
      });
    }
  }
});
