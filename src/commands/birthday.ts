import {
    Discord,
    Slash,
    SlashOption,
  } from "discordx";
import {
    CommandInteraction,
    ApplicationCommandOptionType
  } from "discord.js";

import {
  addBirthday,
  removeBirthday,
  updateBirthday,
  showBirthday
} from "../helpers/functions";

@Discord()
abstract class AppDiscord {
    @Slash({ description: "Add your birthday to the bot", name: "add-birthdate"})
    add(
      @SlashOption({ 
        name: "month",
        required: true,
        type: ApplicationCommandOptionType.String,
        description:"Month of your birthday (MM)"
      }) month: number,
      @SlashOption({ 
        name: "day",
        required: true,
        type: ApplicationCommandOptionType.String,
        description:"Day of your birthday (DD)"
      }) day: number,
      @SlashOption({
        name:"year", 
        type: ApplicationCommandOptionType.String,
        description:"Year of your birthday (YYYY)"
      }) year: number,
      interaction: CommandInteraction
    ) {
      console.log("Add Birthday Triggered!");
      addBirthday(interaction,month,day,year);
    }  

    @Slash({ description: "Remove your birthday from the bot", name: "remove-birthdate"})
    remove(
      interaction: CommandInteraction
    ) {
      console.log("Remove Birthday Triggered!")
      removeBirthday(interaction);
    }  

    @Slash({ description: "Update your birthday in the bot", name: "update-birthdate"})
    update(
      @SlashOption({ 
        name:"month",
        required: true,
        type: ApplicationCommandOptionType.String,
        description:"Month of your birthday (MM)"
      }) month: number,
      @SlashOption({ 
        name:"day",
        required: true,
        type: ApplicationCommandOptionType.String,
        description:"Day of your birthday (DD)"
      }) day: number,
      @SlashOption({ 
        name:"year",
        type: ApplicationCommandOptionType.String,
        description:"Year of your birthday (YYYY)"
      }) year: number,
      interaction: CommandInteraction
    ) {
      console.log("Update Birthday Triggered!")
      updateBirthday(interaction,month,day,year);
    }  

    @Slash({ description: "Show your birthday in the bot", name: "show-birthdate"})
    show(
      interaction: CommandInteraction
    ) {
      console.log("Show Birthday Triggered!")
      showBirthday(interaction);
    }  
}