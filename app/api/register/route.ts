import { NextResponse } from "next/server";
import { User } from "@/models/User";
import { hashedPassword } from "@/utils/bcrypt";
import { connectDB } from "@/utils/db";

export async function POST(req: Request) {
  const { firstName, lastName, email, password } = await req.json();

  if (!firstName || !lastName || !email || !password) {
    return NextResponse.json(
      { message: "Please fill in all fields" },
      { status: 400 }
    );
  }

  try {
    await connectDB();

    const hashPassword = await hashedPassword(password);

    //check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    //create new user
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashPassword,
    });

    await user.save();

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
