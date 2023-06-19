import mongoose from "mongoose";
import { User } from "../global/types.global";

const userSchema = new mongoose.Schema<User>({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  userFullName: String,
  avatar: String,
  token: String,
  create_at: Date,
  update_at: Date
}, { versionKey: false })

export const UserModel = mongoose.model<User>('user', userSchema)