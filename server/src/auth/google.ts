import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../mongoose/schema/user";
import { IUser } from "../types/user";

passport.serializeUser((user: any, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id).select(
    "-resetPasswordToken -resetPasswordTokenExpires"
  );
  if (!user) {
    return done(new Error("User not found"));
  }
  const userObj: IUser = user.toObject();
  delete userObj.password;
  done(null, userObj);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({
          email: profile.emails?.[0].value,
        });

        if (existingUser) {
          return done(null, existingUser as IUser);
        }

        const newUser = new User({
          username: profile.displayName,
          email: profile.emails?.[0].value,
          name: profile.displayName,
          profileImage: profile.photos?.[0].value,
        });

        await newUser.save();
        return done(null, newUser as IUser);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);
