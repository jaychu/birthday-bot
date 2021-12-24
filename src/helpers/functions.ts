import {
    CheckBirthday,
    AddBirthday
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