const { client } = require("../../index");
const main = require("../data/main");
const Discord = require("discord.js")
const moment = require("moment");
const UserModel = require("../models/UserModel");
const GuildModel = require("../models/GuildModel");
require("moment-duration-format");

client.on("ready", async (client) => {
  client.user.setPresence({
    activities: [{ name: "/help | www.moderatorbot.gq | Sponsor: dostsunucum.com", type: "WATCHING" }],
    status: "dnd",
  });
  console.log("🆔[LOGIN/READY]Logged as: " + client.user.username);
});
