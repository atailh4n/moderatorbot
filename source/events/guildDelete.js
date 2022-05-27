const guildSchema = require('../models/GuildModel');
const { client } = require('../../index');
const main = require('../data/main');
const Discord = require('discord.js');

client.on("guildDelete", async(guild) => {
    await guildSchema.deleteMany({ discordId: guild.id }).then(console.log("🔽[LEAVED SERVER] Leaved from " + guild.name))
})