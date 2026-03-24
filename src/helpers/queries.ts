import { db_path } from '../constants'
import { DatabaseSync } from 'node:sqlite';
const path = require('node:path');

const pathToDB = (process.env.NODE_ENV === 'production') ? db_path : path.resolve(__dirname+"../../../data","birthdaybot.db");
console.log(pathToDB);
const db = new DatabaseSync(pathToDB);
  export async function CheckBirthday(userID){
    return new Promise(function(resolve){
        try{
            let query = `SELECT * FROM birthdays WHERE userID=?`
            console.log(`Query Executed from CheckBirthday:${query} with userID ${userID}`)
            let result = db.prepare(query).all(userID);
            
            resolve(result.length > 0);
        } catch (e) {
            console.log(e);
            resolve(false);
        }
    })
  }

  export async function AddBirthday(userID:string, month:string, day:string, year:string){
    if(year == null){
        year = "1900";
    }
    let date = dateFormat(year,month,day);
    return new Promise(function(resolve){
        try{
            let query = `INSERT INTO birthdays (userid, birthtimestamp,updatedate) VALUES ('${userID}', '${date}','${updatedAtNow()}')`
            console.log("Query Executed from AddBirthday:"+query);
            db.prepare(query).run();
            resolve(true);
        } catch(e) {
            console.log(e);
            resolve(false);
        }
    })
  }

  export async function RemoveBirthday(userID:string){
    return new Promise(function(resolve){
            try{
                let query =`DELETE FROM birthdays WHERE userid=${userID}`;
                console.log("Query Executed from RemoveBirthday:"+query)
                db.prepare(query).run();
                resolve(true)
            } catch ( e ){
                console.log(e);
                resolve(false);
            }
    })
  }

export async function UpdateBirthday(userID:string, month:string, day:string, year:string){
    if(year == null){
        year = "1900";
    }
    let date = dateFormat(year,month,day);
    return new Promise(function(resolve){
        try{
            let query = `UPDATE birthdays SET birthtimestamp = '${date}', updatedate = '${updatedAtNow()}' WHERE userid = ${userID}`
            console.log("Query Executed from UpdateBirthday:"+query);
            db.prepare(query).run();
            resolve(true);
        } catch (e){
            console.log(e);
            resolve(false);
        }
    })
  }

  export async function GetBirthday(userID:string){
    return new Promise<string>(function(resolve){
        try{
            let query = `SELECT * FROM birthdays WHERE userID=?`;
            console.log(`Query Executed from GetBirthday:${query} with userID ${userID}`);
            let result = db.prepare(query).get(userID);
            resolve(JSON.stringify(result));
        } catch (e){
            console.log(e);
            resolve("");
        }
    })
  }

  export async function GetAllBirthdays(){
    return new Promise<string>(function(resolve){
        try{
            let query = `SELECT * FROM birthdays`
            console.log(`Query Executed from GetAllBirthdays:${query}`)
            let results = db.prepare(query).all();
            resolve(JSON.stringify(results))
        } catch (e){
            console.log(e);
            resolve("");
        }
    })
  }
  
function updatedAtNow(){
    return new Date().toISOString();
}

function dateFormat(year:string, month:string, day:string){
    return new Date(`${year}-${month}-${day}`).toISOString().split('T')[0];
}