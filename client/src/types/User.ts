export type User = {
  _id: string;
  username: string;
  fullName: string;
  googleId: string;
  email: string;
  role: UserRole;
  followers: string[];
  following: string[];
  profileImage: string;
  coverImage: string;
  bio: string;
  link: string;
  likedPosts: string[];
  createdAt: string;
  updatedAt: string;
  __v: 0;
};

export enum UserRole {
  Admin = "admin",
  User = "user",
}

export default { UserRole };
