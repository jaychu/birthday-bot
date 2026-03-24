import jsonfile from 'jsonfile';
import {discordConfig_path} from './constants'

console.log("beginning init sequence");
jsonfile.readFile(discordConfig_path)
.then(value=>{
    console.log("Discord Config file found!" + discordConfig_path);
})
.catch(err=>{
    console.log(err);
    console.log("Discord Config file needed!");
});

