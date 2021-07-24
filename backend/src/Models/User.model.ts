import mongoose, { Schema, Model, Document, Types } from "mongoose";

export interface IUser extends Document {
  id: Schema.Types.ObjectId;
  email: string;
  password: string | null;
}

const UserSchema: Schema<IUser> = new Schema<IUser>({
  id: {
    type: Schema.Types.ObjectId,
    required: true,
    auto: true,
  },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

export const User: Model<IUser> = mongoose.model("User", UserSchema);
