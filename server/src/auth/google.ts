import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../mongoose/schema/user";
import { IUser } from "../types/user";
import { hashPassword } from "../utils/bcrypt";

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

        console.log(profile);

        if (existingUser) {
          return done(null, existingUser as IUser);
        }

        const randomPassword = Math.random().toString(36).slice(-8);
        const hashedPassword = hashPassword(randomPassword);

        const newUser = new User({
          username: profile.displayName,
          email: profile.emails?.[0].value,
          password: hashedPassword,
          name: profile.displayName,
          profileImage: profile.photos?.[0].value,
          googleId: profile?.id,
        });

        await newUser.save();
        return done(null, newUser as IUser);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);
