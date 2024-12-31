import { User } from "@/models/User";
import { comparePassword } from "@/utils/bcrypt";
import { setCookie } from "@/utils/cookie";
import { connectDB } from "@/utils/db";
import { generateToken } from "@/utils/jwt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // Validate input
  if (!email || !password) {
    return NextResponse.json(
      { message: "Please fill in all fields" },
      { status: 400 }
    );
  }

  try {
    await connectDB();

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "Invalid Credentials" },
        { status: 400 }
      );
    }

    // Compare password
    const isPasswordMatch = await comparePassword(password, user.password);
    if (!isPasswordMatch) {
      return NextResponse.json(
        { message: "Invalid Credentials" },
        { status: 400 }
      );
    }

    // Generate JWT token
    const token = await generateToken(user._id.toString(), user.email);

    // Create response and set cookie
    const response = NextResponse.json(
      {
        message: "Login successful",
        accessToken: token,
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
      },
      { status: 200 }
    );

    // Set the JWT token in cookies
    setCookie(response, token);

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
