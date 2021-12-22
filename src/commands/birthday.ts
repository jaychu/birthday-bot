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
    @Slash("add-birthdate")
    add(
      @SlashOption("month", { 
        required: true,
        type: "STRING",
        description:"Month of your birthday (MM)"
      }) month: number,
      @SlashOption("day", { 
        required: true,
        type: "STRING",
        description:"Day of your birthday (DD)"
      }) day: number,
      @SlashOption("year", { 
        required: true,
        type: "STRING",
        description:"Year of your birthday (YYYY)"
      }) year: number,
      interaction: CommandInteraction
    ) {
      let user = interaction.user;

      interaction.reply(`Hello there ${user.username}! I've recorded your birthday as ${month}/${day}/${year}`);

    }  
}