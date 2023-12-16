import { connect } from "mongoose"
import dotenv from "dotenv"
dotenv.config()
export async function connectDb() { return await connect(process.env.CONNECTIONSTRING) }


