import { ObjectId, Types } from "mongoose";

export interface IUser {
  username: string;
  name: string;
  email: string;
  password?: string;
  role: "admin" | "user";
  followers: Types.ObjectId[];
  following: Types.ObjectId[];
  resetPasswordToken: string;
  resetPasswordTokenExpires: Date;
}
