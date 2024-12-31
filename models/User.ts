import mongoose, { Document, Model, Schema } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  provider: string;
  googleId: string;
}

const UserSchema: Schema<IUser> = new Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String }, // Not required for Google users
    provider: { type: String, required: true }, // "google" or "custom"
    googleId: { type: String }, // Only for Google users
  },
  { timestamps: true }
);

export const User: Model<IUser> =
  mongoose.models.User || mongoose.model("User", UserSchema);
