import {
    CheckBirthday,
    AddBirthday,
    RemoveBirthday
} from "../helpers/queries";

export async function addBirthday(interaction,month,day,year){
    let user = interaction.user;
    let checkBirthday = await CheckBirthday(user.id);
    if(checkBirthday){
        interaction.reply(`Hello there ${user.username}! Your birthday is already present!`);
      } else {
        let addBirthdayCheck = AddBirthday(user.id,month,day,year);
        if(addBirthdayCheck){
          interaction.reply(`Hello there ${user.username}! I've recorded your birthday as ${month}/${day}`);
        } else {
          interaction.reply(`Hello there ${user.username}! I've had an error and your birthday wasn't recorded.`);
        }
      }
}

export async function removeBirthday(interaction){
    let user = interaction.user;
    let removeBirthdayCheck = await RemoveBirthday(user.id);
    if(removeBirthdayCheck){
      interaction.reply(`Sorry to see you go ${user.username}! Your birthday has been removed.`);
    }else{
      interaction.reply(`Sorry, ${user.username}! There was a problem with removing your birthday. Please contact the admins!`);
    }
}