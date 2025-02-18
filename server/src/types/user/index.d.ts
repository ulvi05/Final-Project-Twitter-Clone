import { ObjectId, Types } from "mongoose";

export interface IUser {
  _id: Types.ObjectId;
  username: string;
  fullName: string;
  email: string;
  password?: string | null | undefined;
  role: "admin" | "user";
  followers: Types.ObjectId[];
  following: Types.ObjectId[];
  resetPasswordToken?: string;
  resetPasswordTokenExpires?: Date;
}
