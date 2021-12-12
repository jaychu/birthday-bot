import { Intents, Interaction, Message } from "discord.js";
import { Client } from "discordx";
import { dirname, importx } from "@discordx/importer";
import { config } from './constants'

const client = new Client({
     simpleCommand: {
       prefix: "!",
     },
     intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_MEMBERS,
     ],
     // If you only want to use global commands only, comment this line
     botGuilds: [(client) => client.guilds.cache.map((guild) => guild.id)]
});


client.once("ready", async () => {
  await client.clearApplicationCommands();
  await client.initApplicationCommands({
    global: { log: true },
    guild: { log: true },
  });
  await client.initApplicationPermissions(true);
  console.log("Bot started");
});

client.on("interactionCreate", (interaction) => {
  client.executeInteraction(interaction);
});
importx(__dirname + "/commands/**/*.{js,ts}");
client.login(config.BOT_TOKEN); 