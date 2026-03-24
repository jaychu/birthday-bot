import { db_path } from '../constants'
import { DatabaseSync } from 'node:sqlite';
const path = require('node:path');

const pathToDB = (process.env.NODE_ENV === 'production') ? db_path : path.resolve(__dirname+"../../../data","birthdaybot.db");
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

  export async function AddBirthday(userID,month,day,year){
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

  export async function RemoveBirthday(userID){
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

export async function UpdateBirthday(userID,month,day,year){
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

  export async function GetBirthday(userID){
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
    let doesUserExist = false;
    return new Promise<string>(function(resolve, reject){
        //const query = db.prepare(`SELECT * FROM birthdays`).all;
        //console.log(query);
/*         pool.query('SELECT * FROM birthdays', [], (error, results) => {
            if (error) {
               console.log(error);
               doesUserExist = false;
            }
            try {
                resolve(JSON.stringify(results.rows))
            } catch ( e ){
                reject(e)
            }
        }) */
    })
  }
  
  function updatedAtNow(){
    return new Date().toISOString();
  }

  function dateFormat(year,month,day){
    return new Date(`${year}-${month}-${day}`).toISOString().split('T')[0];
  }