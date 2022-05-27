const embed = require('../data/embeds');
const main = require('../data/main');
const { MessageActionRow, MessageButton, MessageEmbed, Formatters } = require("discord.js");
const { client } = require('../../index');
const UserModel = require('../models/UserModel');
const discordModal = require('discord-modals');
const GuildModel = require('../models/GuildModel');

client.on("messageCreate", async message => {

const prefix = main.datasowner.devprefix;
const owners = main.datasowner.ownerids;

   if (!message.content.startsWith(prefix)) return;
   if (message.author.id != "440048470100017183") return;
    
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    
    const command = client.devcommands.get(commandName)
    if (!command) return;
    
    			try {
					await command.execute(command)
				} catch (error) {
					console.error(error);
				}

});