import { ObjectId, Types } from "mongoose";

export interface IUser {
  _id: Types.ObjectId;
  name: string;
  surname: string;
  email: string;
  password?: string;
  isBlocked: boolean;
  role: "admin" | "user";
  resetPasswordToken: string;
  resetPasswordTokenExpires: Date;
}
