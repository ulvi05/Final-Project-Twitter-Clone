import { Request, Response } from "express";
import { hashPassword } from "../utils/bcrypt";
import User from "../mongoose/schema/user";
import { IUser } from "../types/user";

const signup = async (req: Request, res: Response) => {
  try {
    const user = req.matchedData;
    user.password = hashPassword(user.password);
    const userExist = await User.findOne({
      email: user.email,
    });
    if (userExist) {
      res.status(400).json({
        message:
          "An account with this email address already exists. Please use another email.",
      });
      return;
    }

    const newUser = new User(user);
    await newUser.save();

    const userObj: IUser = newUser.toObject();
    delete userObj.password;
    res.json({
      message: "Register successful",
      user: userObj,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const login = async (req: Request, res: Response) => {
  res.json({
    message: `Welcome back, ${req.user?.name}`,
    user: req.user,
  });
};

const googleAuth = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Google authentication failed" });
      return;
    }

    const googleUser = req.user as IUser;

    res.json({
      message: `Welcome, ${googleUser.name}`,
      googleUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const logout = async (req: Request, res: Response) => {
  res.json({
    data: "You hit the logout endpoint",
  });
};

export default {
  signup,
  login,
  googleAuth,
  logout,
};
