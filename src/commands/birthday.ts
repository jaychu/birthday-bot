import {
    Discord,
    Slash,
    SlashOption,
  } from "discordx";
import {
    Channel,
    CommandInteraction,
    GuildMember,
    Role,
    User,
  } from "discord.js";

@Discord()
abstract class AppDiscord {
    @Slash("hello")
    hello(
      @SlashOption("user", { type: "USER" }) user: GuildMember | User,
      interaction: CommandInteraction
    ): void {
      interaction.reply(`${user}`);
    }  
}