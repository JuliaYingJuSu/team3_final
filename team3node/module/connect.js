
import mysql from "mysql2/promise";

const db = await mysql.createPool({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.DB_dbname,

    waitForConnections:true,
    connectionLimit:5,
    queueLimit:0
});

console.log({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.DB_dbname,
})


export default db;