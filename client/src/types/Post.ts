export type PostType = {
  _id: string;
  text: string;
  img?: string;
  likes: string[];
  comments: {
    _id: string;
    text: string;
    user: { username: string; fullName: string; profileImg?: string };
  }[];
  user: { username: string; fullName: string; profileImg?: string };
};
