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

import {
  addBirthday
} from "../helpers/functions";

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
        type: "STRING",
        description:"Year of your birthday (YYYY)"
      }) year: number,
      interaction: CommandInteraction
    ) {
      addBirthday(interaction,month,day,year);
    }  
}