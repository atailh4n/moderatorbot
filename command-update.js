const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');

// Tanımlama
const commands = []; // Commands adında boş data tutmalık tanım
const commandFiles = fs.readdirSync('./source/commands').filter(file => file.endsWith('.js')); // Commands reading from ./source/commands

// For all commands
for (const file of commandFiles) {
	const command = require(`./source/commands/${file}`);
	commands.push(command.data.toJSON());
}

// RestFULL API
const rest = new REST({ version: '9' }).setToken("OTA1NTY0OTk4NjE1NTkyOTkx.YYL7IA.83EGV1OkMKZmw6z4mAAMYhdoNlQ"); // Connecting API

//RestFULL API put commands to Discord
rest.put(Routes.applicationCommands("905564998615592991"), { body: commands })
	.then(() => console.log('🖥️[REST API] Sucessfully commands registered globally.'))
	.catch(console.error);