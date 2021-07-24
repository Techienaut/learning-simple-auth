import { IUser } from "../Models/User.model";
// import session from "client-sessions";

// declare module "client-sessions" {
//   export interface Session {
//     user: IUser;
//   }
// }
import session from "express-session";

declare module "express-session" {
  export interface SessionData {
    user: IUser;
  }
}
declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
