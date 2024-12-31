import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const session = await getSession({ req });

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({
    message: "Protected content",
    user: session.user,
  });
}
