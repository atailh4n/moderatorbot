const { SlashCommandBuilder } = require("@discordjs/builders");
const GuildModel = require('../models/GuildModel');
const embed = require('../data/embeds');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('start')
    .setDescription('Start working'),

    async execute(interaction) {
        let updatable = interaction.reply("**1/3** Getting Infos from database");


  },
}