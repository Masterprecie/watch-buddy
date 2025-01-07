import { IUser, User } from "@/models/User";
import { NextResponse } from "next/server";

interface Request {
  user: {
    id: string;
  };
}

interface ErrorResponse {
  error: string;
}

export async function GET(
  req: Request
): Promise<NextResponse<IUser | ErrorResponse>> {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error(error);
    const errorMessage =
      error instanceof Error ? error.message : "Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
