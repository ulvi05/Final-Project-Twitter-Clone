export type Comment = {
  _id: string;
  text: string;
  user: { username: string; fullName: string; profileImg?: string };
};
