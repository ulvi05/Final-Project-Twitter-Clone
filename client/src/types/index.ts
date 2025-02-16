export type User = {
  _id: string;
  fullName: string;
  username: string;
  profileImg: string;
  coverImg: string;
  bio: string;
  link?: string;
  following: string[];
  followers: string[];
  role?: UserRole;
};

export enum UserRole {
  Admin = "admin",
  User = "user",
}

export default { UserRole };
