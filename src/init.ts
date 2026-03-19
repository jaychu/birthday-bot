import jsonfile from 'jsonfile';
import {dbConfig_path, discordConfig_path} from './constants'

console.log("beginning init sequence");
jsonfile.readFile(dbConfig_path)
.then(value=>{
    console.log("Database Config file found!" + dbConfig_path);
})
.catch(err=>{
    console.log(err);
    console.log("Database Config file needed!");
});

jsonfile.readFile(discordConfig_path)
.then(value=>{
    console.log("Discord Config file found!" + discordConfig_path);
})
.catch(err=>{
    console.log(err);
    console.log("Discord Config file needed!");
});