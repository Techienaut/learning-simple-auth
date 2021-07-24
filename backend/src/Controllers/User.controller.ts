import { Request, Response, NextFunction } from "express";
import { User } from "../Models/User.model";
import bcrypt from "bcryptjs";
import createError from "http-errors";

export const createNewUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.body.email) {
      return res.status(422).json({
        status: "error",
        error: "Email is invalid.",
      });
    }
    if (!req.body.password) {
      return res.status(422).json({
        status: "error",
        error: "Password is invalid.",
      });
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const user = await User.create({
      email: req.body.email,
      password: hash,
    });
    const result = await user.save();
    console.log("User created:", result);
    req.session.user = user;
    return res.status(200).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      return res.status(422).json({
        status: "error",
        error: "Email is already taken.",
      });
    }
    return res.status(400).json({
      status: "error",
      error: "Internal Error",
    });
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    console.log("Before Pass", user);
    if (!user) {
      return res.status(422).json({
        status: "error",
        error: "Incorrect email / password",
      });
    }
    if (bcrypt.compareSync(req.body.password, String(user.password))) {
      console.log("After Pass", user);
      return res.status(200).json({
        status: "success",
      });
    } else {
      console.log("Your Pass", req.body);
      console.log("Our Pass", user);
      return res.status(422).json({
        status: "error",
        error: "Incorrect email / password",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: "error",
      error: "Internal Error",
    });
  }
};
