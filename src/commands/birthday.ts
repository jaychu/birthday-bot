import {
    Discord,
    Slash,
    SlashOption,
  } from "discordx";
import {
    CommandInteraction,
  } from "discord.js";

import {
  addBirthday,
  removeBirthday,
  updateBirthday,
  showBirthday
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

    @Slash("remove-birthdate")
    remove(
      interaction: CommandInteraction
    ) {
      removeBirthday(interaction);
    }  

    @Slash("update-birthdate")
    update(
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
      updateBirthday(interaction,month,day,year);
    }  

    @Slash("show-birthdate")
    show(
      interaction: CommandInteraction
    ) {
      showBirthday(interaction);
    }  
}