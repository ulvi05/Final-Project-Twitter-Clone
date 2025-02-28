export const paths = {
  HOME: "/",
  SIGNUP: "/signup",
  LOGIN: "/login",
  EXPLORE: "/explore",
  CHAT: "/chat",
  PROFILE: (username = ":username") => `/profile/${username}`,
  NOTIFICATION: "/notifications",
  SUBSCRIBE: "/subscribe",
  CHATGPT: "/chatgpt",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: (token = ":token") => `/reset-password/${token}`,
};
