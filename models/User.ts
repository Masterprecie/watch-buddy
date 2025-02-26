import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    provider: { type: String, required: true }, // "google" or "custom"
    googleId: { type: String },
    profilePic: { type: String },
  },
  { timestamps: true }
);
export default mongoose.models.User || mongoose.model("User", UserSchema);
