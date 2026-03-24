import { Guild, GatewayIntentBits , Role, TextChannel, Events } from "discord.js";
import { CronJob } from "cron";
import { Client } from "discordx";
import { importx } from "@discordx/importer";
import { discordConfig_path } from './constants'
import { celebrateBirthday, removeBirthdayFromRole } from "./helpers/functions";
import { getDiscordToken } from "./helpers/secrets"

const discordConfig = (process.env.NODE_ENV === 'production') ? require(discordConfig_path) : require("../"+discordConfig_path);
const client = new Client({
     intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildPresences
     ],
     // If you only want to use global commands only, comment this line
     botGuilds: [(client) => client.guilds.cache.map((guild) => guild.id)]
});


client.once(Events.ClientReady, async () => {
  await client.clearApplicationCommands();
  await client.initApplicationCommands();
  
  console.log("Bot started");

  var job = new CronJob('0 8 * * *', function () {
    (async () => {
      const channel = await client.channels.fetch(discordConfig.CHANNEL_ID) as TextChannel;
      const guild = await client.guilds.fetch(discordConfig.GUILD_ID) as Guild;
      const role = await guild.roles.fetch(discordConfig.ROLE_ID) as Role;
    
      removeBirthdayFromRole(role);
      celebrateBirthday(channel, guild.members, role);
    })();
  }, null, true, discordConfig.TIMEZONE);

});

client.on("interactionCreate", (interaction) => {
  client.executeInteraction(interaction);
});
importx(__dirname + "/commands/**/*.{js,ts}");
client.login(getDiscordToken()); 