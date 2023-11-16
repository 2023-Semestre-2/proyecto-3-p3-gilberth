import sql from 'mssql'
import {config} from 'dotenv'
config()

const dbSetting = {
    user: process.env.USER,
    password: process.env.PASSWORD,
    server: process.env.SERVER,
    database: process.env.DATABASE,
    options: {
        encrypt: true,
        trustServerCertificate: true,
    },
}
export async function getConnection(){
    try {
        const pool = await sql.connect(dbSetting)
        return pool
    } catch (error) {
        console.error(error)
    }
}
export { sql }