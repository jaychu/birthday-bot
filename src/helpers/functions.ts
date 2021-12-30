import { 
  messages 
} from '../constants'

import { 
  parseISO, 
  format 
} from 'date-fns';

import { 
  TextChannel, 
  GuildMemberManager, 
  GuildMember, 
  Role 
} from 'discord.js';

import {
    CheckBirthday,
    AddBirthday,
    RemoveBirthday,
    UpdateBirthday,
    GetBirthday,
    GetAllBirthdays
} from "../helpers/queries";

export async function addBirthday(interaction,month,day,year){
    let user = interaction.user;
    let checkBirthday = await CheckBirthday(user.id);
    let message = "";
    if(checkBirthday){
      message = messages.add_birthday.duplicate_message.replace("{user}",`${user.username}`);        
    } else {
      let addBirthdayCheck = await AddBirthday(user.id,month,day,year);
      if(addBirthdayCheck){
        message = messages.add_birthday.confirmation_message.replace("{user}",`${user.username}`); 
      } else {
        message = messages.add_birthday.error_message.replace("{user}",`${user.username}`); 
      }
    }
    if(message!= ""){
      interaction.reply(message);
    }

}

export async function removeBirthday(interaction){
    let user = interaction.user;
    let removeBirthdayCheck = await RemoveBirthday(user.id);
    let message = "";

    if(removeBirthdayCheck){
      message = messages.remove_birthday.confirmation_message.replace("{user}",`${user.username}`);      
    }else{
      message = messages.remove_birthday.error_message.replace("{user}",`${user.username}`);
    }
    if(message!= ""){
      interaction.reply(message);
    }
}

export async function updateBirthday(interaction,month,day,year){
  let user = interaction.user;
  let checkBirthday = await CheckBirthday(user.id);
  let message = "";
  if(!checkBirthday){
    message = messages.update_birthday.no_birthday_message.replace("{user}",`${user.username}`);     
    } else {
      let addBirthdayCheck = await UpdateBirthday(user.id,month,day,year);
      if(addBirthdayCheck){
        message = messages.update_birthday.confirmation_message.replace("{user}",`${user.username}`);     
      } else {
        message = messages.update_birthday.error_message.replace("{user}",`${user.username}`);  
      }
    }
    if(message!= ""){
      interaction.reply(message);
    }
}

export async function showBirthday(interaction){
  let user = interaction.user;
  let checkBirthday = await CheckBirthday(user.id);
  let message = "";
  if(checkBirthday){
    let birthday = await GetBirthday(user.id);
    let birthdayObj = JSON.parse(birthday);
    let formattedDate = format(parseISO(birthdayObj.birthtimestamp),"MMMM dd");
    message = messages.show_birthday.confirmation_message
              .replace("{user}",`${user.username}`)    
              .replace("{date}",`${formattedDate}`);  
  } else {
    message = messages.show_birthday.error_message.replace("{user}",`${user.username}`);  
  }
  if(message!= ""){
    interaction.reply(message);
  }
}


export async function celebrateBirthday(channel: TextChannel, users: GuildMemberManager, role: Role){
  let birthdayList = await GetAllBirthdays();
  let birthdayListObj = JSON.parse(birthdayList);
  let today = format( new Date(), 'MM/dd');
  birthdayListObj.forEach(birthday => {
    let formattedDate = format(parseISO(birthday.birthtimestamp),"MM/dd");
    if(formattedDate==today){
      sendMessageAndAssignRole(channel,users,role,birthday.userid);
    }
  });
}

export async function sendMessageAndAssignRole(channel: TextChannel, users: GuildMemberManager, role: Role, userID: string){
    let member = await users.fetch(userID) as GuildMember;
    const min = 0;
    let max = messages.birthday_messages.length;
    let arbitrayNumber = Math.floor(Math.random() * (max - min) + min);
    channel.send(messages.birthday_messages[arbitrayNumber].replace("{user}",`<@${userID}>`))
    member.roles.add(role);
}

export async function removeBirthdayFromRole(role: Role){
    role.members.forEach((member) => { // Looping through the members of Role.
      member.roles.remove(role);
  });
}