import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || "";

export async function connectDB() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGO_URI, { bufferCommands: false });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
    throw error;
  }
}
