import { Request } from "express";
import { Response } from "express";
import { NextFunction } from "express";
import { csrfProtection } from "./csrfProtection";
export const xsrfTokenGenerate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.cookie("XSRF-TOKEN", req.csrfToken(), {
    httpOnly: true,
    secure: true,
    domain: "localhost",
    sameSite: "strict",
  });
  next();
};
