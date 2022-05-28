const { client } = require("../../index");

client.on("ready", async (client) => {
  client.user.setPresence({
    activities: [{ name: "/help | moderatorbot.gq", type: "WATCHING" }],
    status: "dnd",
  });
  console.log("🆔[LOGIN]Logged as: " + client.user.username);
});
