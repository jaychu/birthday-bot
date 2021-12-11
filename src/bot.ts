import { Intents, Interaction, Message } from "discord.js";
import { Client } from "discordx";
import { config } from './constants'

const client = new Client({
     simpleCommand: {
       prefix: "!",
     },
     intents: [
       Intents.FLAGS.GUILDS,
       Intents.FLAGS.GUILD_MEMBERS,
       Intents.FLAGS.GUILD_MESSAGES,
       Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
       Intents.FLAGS.GUILD_VOICE_STATES,
     ],
     // If you only want to use global commands only, comment this line
     botGuilds: [(client) => client.guilds.cache.map((guild) => guild.id)],
     silent: true,
});


client.once("ready", async () => {
     // make sure all guilds are in cache
     await client.guilds.fetch();
   
     // init all application commands
     await client.initApplicationCommands({
       guild: { log: true },
       global: { log: true },
     });
   
     // init permissions; enabled log to see changes
     await client.initApplicationPermissions(true);
   
     // uncomment this line to clear all guild commands,
     // useful when moving to global commands from guild commands
     //  await client.clearApplicationCommands(
     //    ...client.guilds.cache.map((g) => g.id)
     //  );
   
     console.log("Bot started");
});


client.login(config.BOT_TOKEN); 