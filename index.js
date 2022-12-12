// Tanımlayıcılar
const Discord = require("discord.js");
const { Client, Intents, Collection } = Discord;
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const fs = require("fs");
const mongoose = require("mongoose");
const GuildModel = require("./source/models/GuildModel");
const UserModel = require("./source/models/UserModel");
const main = require("./source/data/main");
const embed = require("./source/data/embeds");
const i18next = require("i18next");
const backend = require("i18next-fs-backend");
const { dashconf } = require("./source/data/panelSoftUI");

// .env Config Reader
require("dotenv").config({
  path: "./source/data/.env",
});

//Multi lang system
i18next.use(backend).init({
  initImmediate: false,
  ns: fs
    .readdirSync("./source/data/langs/en-US")
    .map((a) => a.replace(".json", "")),
  defaultNS: "commands",
  fallbackLng: "en-US",
  preload: fs.readdirSync("./source/data/langs"),
  backend: {
    loadPath: "./source/data/langs/{{lng}}/{{ns}}.json",
  },
}).finally(console.log("㊗️[MULTILANG SYS] Multiple language system is loaded successfully."));

  // MongoDB Connection
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

// When Connected
mongoose.connection.on("connected", (data, err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("💽[MONGOOSE CLOUD] Connected DB");
  }
});

// When Disconnected
mongoose.connection.on("disconnect", (data, err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("💽[MONGOOSE CLOUD] DB disconnected");
    console.log(data);
  }
});

// CLient Init
const client = new Client({

  allowedMentions: { parse: ["users", "roles"], repliedUser: true },
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_BANS,
    Intents.FLAGS.GUILD_INTEGRATIONS,
    Intents.FLAGS.GUILD_INVITES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_VOICE_STATES,
  ],
});

//Collections
module.exports.client = client;
client.events = new Collection();
client.cooldowns = new Collection();
client.commands = new Collection();
client.devcommands = new Collection();
client.tempemail = new Collection();

//Loaders\\
//Application Commands Update

// Tanımlama
const commands = []; // Commands adında boş data tutmalık tanım
const commandFiles = fs
  .readdirSync("./source/commands")
  .filter((file) => file.endsWith(".js")); // Commands reading from ./source/commands

// For all commands
for (const file of commandFiles) {
  const command = require(`./source/commands/${file}`);
  commands.push(command.data.toJSON());
}

// RestFULL API
const rest = new REST({ version: "9" }).setToken(`${process.env.TOKEN}`); // Connecting API
//RestFULL API put commands to Discord
rest
  .put(Routes.applicationCommands(`${process.env.CLIENT_ID}`), {
    body: commands,
  })
  .then(() =>
    console.log("🖥️[REST API] Sucessfully commands registered globally.")
  )
  .catch(console.error);

//Command Loader

const cmdFiles = fs
  .readdirSync("./source/commands")
  .filter((file) => file.endsWith(".js"));
for (const file of cmdFiles) {
  const command = require(`./source/commands/${file}`);

  client.commands.set(command.data.name, command);
  console.log(`🗂️[CMD HANDLER] - ${file} was loaded`);
}

// Dev Commands Loader

const cmdFilesdev = fs
  .readdirSync("./source/devcommands")
  .filter((file) => file.endsWith(".js"));
for (const filedev of cmdFilesdev) {
  const commanddev = require(`./source/devcommands/${filedev}`);

  client.devcommands.set(commanddev.name, commanddev);
  console.log(`🗂️[DEV COMMANDS] - ${filedev} was loaded`);
}

// Event Loader

const eventloaded = fs
  .readdirSync("./source/events")
  .filter((file) => file.endsWith(".js"));
for (const eventFile of eventloaded) {
  const event = require(`./source/events/${eventFile}`);

  client.events.set(event.name, event);
  console.log(`▶️[EVENT LOADER] - ${eventFile} was loaded`);
}

// Login
client.login(process.env.TOKEN);

//Dash import

dashconf;

//https://discord.com/api/oauth2/authorize?client_id=765156858490126366&permissions=1540282117366&scope=bot%20applications.commands