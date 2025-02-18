export type User = {
  _id: string;
  email: string;
  fullName: string;
  username: string;
  bio: string;
  link?: string;
  profileImage: string;
  coverImage: string;
  following: string[];
  followers: string[];
  likedPosts: string[];
  role?: UserRole;
};

export enum UserRole {
  Admin = "admin",
  User = "user",
}

export default { UserRole };
