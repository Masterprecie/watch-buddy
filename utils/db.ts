import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || "";

export async function connectDB() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGO_URI, { bufferCommands: false });
    console.log("Connected to MongoDB");
  } catch (error) {
    if (error instanceof Error) {
      console.error("Failed to connect to MongoDB:", error.message);
    } else {
      console.error("Failed to connect to MongoDB:", error);
    }
    throw error;
  }
}
