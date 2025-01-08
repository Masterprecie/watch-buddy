import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
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
export default mongoose.models.User || mongoose.model("User", UserSchema);
