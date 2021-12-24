import { config } from '../constants'
import { Pool } from "pg"

let pool = new Pool({
    user: config.DB_USERNAME,
    host: config.DB_HOST,
    database: config.DB_DATABASE,
    password: config.DB_PASSWORD,
    port: config.DB_PORT,
})

  export async function CheckBirthday(userID){
    let doesUserExist = false;
    return new Promise(function(resolve, reject){
        pool.query('SELECT * FROM birthdays WHERE userID=($1)', [userID], (error, results) => {
            if (error) {
               console.log(error);
               doesUserExist = false;
            }
            try {
                resolve(results.rows.length > 0)
            } catch ( e ){
                reject(e)
            }
        })
    })
  }

  export async function AddBirthday(userID,month,day,year){
    if(year == null){
        year = "1900";
    }
    let date = month+"-"+day+"-"+year;
    let responseBool = true;
    return new Promise(function(resolve, reject){
        pool.query('INSERT INTO birthdays (userid, birthtimestamp,updatedate) VALUES ($1, $2,$3)', [userID, date, new Date()], (error, results) => {
            if (error) {
                console.log(error);
                responseBool = false;
            }
            responseBool = true;
            try {
                resolve(responseBool)
            } catch ( e ){
                reject(e)
            }
        })
    })
  }