import { Schema } from "express-validator";

export const registerSchema: Schema = {
  name: {
    in: ["body"],
    isString: {
      errorMessage: "Name must be a string",
    },
    notEmpty: {
      errorMessage: "Name is required",
    },
  },
  surname: {
    in: ["body"],
    isString: {
      errorMessage: "Surname must be a string",
    },
    notEmpty: {
      errorMessage: "Surname is required",
    },
  },
  password: {
    in: ["body"],
    isString: {
      errorMessage: "Password must be a string",
    },
    notEmpty: {
      errorMessage: "Password is required",
    },
  },
  email: {
    in: ["body"],
    isString: {
      errorMessage: "Email must be a string",
    },
    notEmpty: {
      errorMessage: "Email is required",
    },
  },
};
export const forgotPasswordSchema: Schema = {
  email: {
    in: ["body"],
    isString: {
      errorMessage: "Email must be a string",
    },
    notEmpty: {
      errorMessage: "Email is required",
    },
  },
};

export const resetPasswordSchema: Schema = {
  password: {
    in: ["body"],
    isString: {
      errorMessage: "Password must be a string",
    },
    notEmpty: {
      errorMessage: "Password is required",
    },
  },
  token: {
    in: ["body"],
    isString: {
      errorMessage: "Token must be a string",
    },
    notEmpty: {
      errorMessage: "Token is required",
    },
  },
};
