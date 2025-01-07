import User from "@/models/User";
import { authenticate } from "@/utils/authMiddleware";
import { connectDB } from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  await connectDB();

  let userId;
  try {
    userId = await authenticate(req);
    const user = await User.findById(userId);
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error(error);
    const errorMessage =
      error instanceof Error ? error.message : "Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
