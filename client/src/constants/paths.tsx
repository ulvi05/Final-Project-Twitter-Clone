export const paths = {
  HOME: "/",
  SIGNUP: "/signup",
  LOGIN: "/login",
  EXPLORE: "/explore",
  PROFILE: (username = ":username") => `/profile/${username}`,
  NOTIFICATION: "/notifications",
};
