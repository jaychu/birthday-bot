import { Guild, Intents, Role, TextChannel } from "discord.js";
import { CronJob } from "cron";
import { Client } from "discordx";
import { importx } from "@discordx/importer";
import { config } from './constants'
import { celebrateBirthday, removeBirthdayFromRole } from "./helpers/functions";

const client = new Client({
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
  const channel = client.channels.cache.get(config.CHANNEL_ID) as TextChannel;
  const guild = client.guilds.cache.get(config.GUILD_ID) as Guild;
  const role = guild.roles.cache.get(config.ROLE_ID) as Role;

  var job = new CronJob('0 8 * * *', function () {
    (async () => {
      removeBirthdayFromRole(role);
      celebrateBirthday(channel, guild.members, role);
    })();
  }, null, true, config.TIMEZONE);

});

client.on("interactionCreate", (interaction) => {
  client.executeInteraction(interaction);
});
importx(__dirname + "/commands/**/*.{js,ts}");
client.login(config.BOT_TOKEN); 