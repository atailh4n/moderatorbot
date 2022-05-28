// Tanımlayıcılar
const Discord = require("discord.js");
const { Client, Intents, Collection } = Discord;
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const fs = require("fs");
const mongoose = require("mongoose");
const GuildModel = require("./source/models/GuildModel");
const main = require("./source/data/main");

// .env Config Reader
require("dotenv").config({
  path: "./source/data/.env",
});

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

fs.readdirSync("./source/events/").forEach((file) => {
  var jsFiles = fs
    .readdirSync("./source/events/")
    .filter((f) => f.split(".").pop() === "js");
  if (jsFiles.length <= 0) return console.log("Can't find any event!");

  jsFiles.forEach((file) => {
    var eventGet = require(`./source/events/${file}`);
    try {
      client.events.set(eventGet.name, eventGet);
      console.log(`▶️[EVENT HANDLER] - ${file} was loaded`);
    } catch (err) {
      return console.log(err);
    }
  });
});

// Login
client.login(process.env.TOKEN);

//Dashboard (Beta)

(async () => {
  const DBD = require("discord-dashboard");
  const DarkDashboard = require("dbd-dark-dashboard");
  await DBD.useLicense("8ebf6810-76a3-4503-966a-c01a2a604b41");
  DBD.Dashboard = DBD.UpdatedClass();

  const Dashboard = new DBD.Dashboard({
    port: 27102,
    client: {
      id: process.env.CLIENT_ID,
      secret: process.env.CLIENT_SECRET,
    },
    redirectUri: "http://panel.moderatorbot.gq/discord/callback",
    domain: "http://panel.moderatorbot.gq",
    bot: client,
    acceptPrivacyPolicy: true,
    guildAfterAuthorization: {
      use: true,
      guildId: main.datasowner.mainserver,
    },
    rateLimits: {
      manage: {
        windowMs: 10 * 60 * 1000,
        max: 75,
        message: "Sorry, you are limited.",
        store: null,
      },
      guildPage: {
        windowMs: 10 * 60 * 1000,
        max: 40,
        message: "Sorry, you are limited.",
        store: null,
      },
      settingsUpdatePostAPI: {
        windowMs: 15 * 60 * 1000,
        max: 75,
        message: "Sorry, you are limited.",
        store: null,
      },
      discordOAuth2: {
        windowMs: 15 * 60 * 1000,
        max: 2,
        message: "Sorry, you are limited.",
        store: null,
      },
    },
    minimizedConsoleLogs: true,
    theme: DarkDashboard({
      information: {
        createdBy: "Ata İlhan Köktürk",
        websiteTitle: "Moderator - Always Stay Safe!",
        websiteName: "Moderator",
        websiteUrl: "panel.moderatorbot.gq",
        dashboardUrl: "panel.moderatorbot.gq",
        supporteMail: "kokturkwebsfo@kokturk.ml",
        supportServer: "https://dsc.gg/modsupp",
        imageFavicon:
          "https://cdn.discordapp.com/attachments/877875685652307978/882306438632964207/moderator.png",
        iconURL:
          "https://cdn.discordapp.com/attachments/877875685652307978/882306438632964207/moderator.png",
        pageBackGround: "linear-gradient(#2CA8FF, #155b8d)",
        loggedIn: "Successfully signed in panel.",
        mainColor: main.displaythings.colors.color_main,
        subColor: "#ebdbdb",
      },
      index: {
        card: {
          category: "Moderator's Panel",
          title: `Welcome the Moderator's web panel. You can easily manage Moderator's settings here`,
          image: "https://i.imgur.com/axnP93g.png",
          footer: "Footer",
        },
        information: {
          category: "Updates",
          title: "Version Updated",
          description: `New version 0.0.2CB_patch2 is avable! Check patch notes on our server.`,
          footer: "Kokturk Web Software",
        },
        feeds: {
          category: "Updates",
          title: "Database Schema Changes",
          description: `Schemas and Models has changed. Check patch notes on our server`,
          footer: "Kokturk Web Software",
        },
      },
      commands: [
        {
          category: "All Commands",
          subTitle:
            "Here all commands are listed. {} means 'required', [] means 'optional'",
          aliasesDisabled: true,
          list: [
            {
              commandName: "bug",
              commandUsage: ";bug <bug>",
              commandDescription: "Report a bug to the developers of Wooar.",
              commandAlias: "No aliases",
            },
            {
              commandName: "2nd command",
              commandUsage: "oto.nd <arg> <arg2> [op]",
              commandDescription: "Lorem ipsum dolor sth, arg sth arg2 stuff",
              commandAlias: "Alias",
            },
            {
              commandName: "Test command",
              commandUsage: "prefix.test <arg> [op]",
              commandDescription: "Lorem ipsum dolor sth",
              commandAlias: "Alias",
            },
          ],
        },
      ],
    }),
    settings: [
      {
        categoryId: "setup",
        categoryName: "Set-Up",
        categoryDescription: "Default settings is here. Can you change it.",
        categoryOptionsList: [
          {
            optionId: "lang",
            optionName: "Language",
            optionDescription: "Change bot language",
            optionType: DBD.formTypes.select({ English: "en", Türkçe: "tr" }),
            getActualSet: async ({ guild }) => {
              const serverConf = await GuildModel.findOne({
                discordId: guild.id,
              });
              return serverConf.needed.systems.langPr || null;
            },
            setNew: async ({ guild, newData }) => {
              await GuildModel.findOneAndUpdate(
                { discordId: guild.id },
                { "needed.systems.langPr": newData }
              );
              return;
            },
          },
          {
            optionId: "logsyst",
            optionName: "Log System",
            optionDescription:
              "On/Off log system. If Log Channel not selected, will automatically be disabled.",
            optionType: DBD.formTypes.switch((disabled = false)),
            getActualSet: async ({ guild }) => {
              const serverConf = await GuildModel.findOne({
                discordId: guild.id,
              });
              return serverConf.needed.systems.logSys || false;
            },
            setNew: async ({ guild, newData }) => {
              await GuildModel.findOneAndUpdate(
                { discordId: guild.id },
                { "needed.systems.logSys": newData }
              );
              return;
            },
          },
        ],
      },
      {
        categoryId: "premium",

        categoryName: "Premium",

        categoryDescription:
          "If you have premium, you can use premium features.",

        categoryOptionsList: [
          {
            optionId: "2fa",

            optionName: "Captcha",

            optionDescription: "On/Off Captcha",

            optionType: DBD.formTypes.switch({ disabled: true }),

            getActualSet: async ({ guild }) => {
              const serverConf = await GuildModel.findOne({
                discordId: guild.id,
              });

              return serverConf.needed.systems.langPr || null;
            },

            setNew: async ({ guild, newData }) => {
              await GuildModel.findOneAndUpdate(
                { discordId: guild.id },
                { "needed.systems.langPr": newData }
              );

              return;
            },
          },
        ],
      },
    ],
  });
  Dashboard.init();
})();

//https://discord.com/oauth2/authorize?client_id=905564998615592991&permissions=2415922176&scope=bot%20applications.commands
