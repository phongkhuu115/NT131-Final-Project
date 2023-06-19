import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()
let uri: string = process.env.MONGO_URI as string

export const connectDB: Function = async () => {
  try {
    await mongoose.connect(uri)
    console.log("Connect successfully");
  } catch (err) {
    console.log(err + '');
  }
}
