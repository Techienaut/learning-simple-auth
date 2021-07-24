import * as UserController from "../Controllers/User.controller";
import express from "express";
import { csrfProtection } from "../csrfProtection";
const router = express.Router();

router.post("/", UserController.createNewUser);
router.post("/login", UserController.loginUser);

export { router as userRoute };
