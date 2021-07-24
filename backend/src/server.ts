import express, { Request, Response, NextFunction } from "express";
import { IUser } from "./Models/User.model";
import cors from "cors";
import session from "client-sessions";
import https from "https";
import fs from "fs";
import { userRoute } from "./Routes/User.route";
import { csrfProtection } from "./csrfProtection";
import cookieParser from "cookie-parser";
import { User } from "./Models/User.model";

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
// app.use(cors({ credentials: true }));
// app.use(cors({ credentials: true, origin: "https://blah.com:3000" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    cookieName: "session",
    secret: String(process.env.SECRET_KEY),
    duration: 30 * 24 * 60 * 60 * 1000, //30 Days expiration
    activeDuration: 7 * 24 * 60 * 60 * 1000, //7 Days of inactivity (Optional)
    cookie: {
      httpOnly: true, // don't let JS code access cookies
    },
  })
);

require("./initDB")();

app.use(async (req: Request, res: Response, next: NextFunction) => {
  if (req.session && req.session.user) {
    try {
      const user = await User.findOne({ email: req.session.user.email });
      // if a user was found, make the user available
      if (user) {
        req.user = user;
        req.user.password = null; // don't make the password hash available
        req.session.user = user; // update the session info
        res.locals.user = user; // make the user available to templates
      }
      return next();
    } catch (error) {
      console.log("error:", error);
      return next();
    }
  }
  return next();
});

const API_PREFIX = process.env.API_PREFIX;
app.get(`${API_PREFIX}/auth/csrf-token`, csrfProtection, (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});
app.use(`${API_PREFIX}/user`, userRoute);
console.log(`${API_PREFIX}/user`);

app.get("/", (req: any, res: { send: (arg0: string) => any }) =>
  res.send("Express + TypeScript Server")
);
// app.listen(PORT, () => {
//   console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
// });
https
  .createServer(
    {
      key: fs.readFileSync(__dirname + "/../CERTS/localhost-key.pem"),
      cert: fs.readFileSync(__dirname + "/../CERTS/localhost.pem"),
    },
    app
  )
  .listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
  });
