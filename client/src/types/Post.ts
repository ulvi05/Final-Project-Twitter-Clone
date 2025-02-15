export type Post = {
  _id: string;
  text: string;
  img?: string;
  likes: { userId: string }[];
  comments: {
    _id: string;
    text: string;
    user: { username: string; fullName: string; profileImg?: string };
  }[];
  user: { username: string; fullName: string; profileImg?: string };
};
