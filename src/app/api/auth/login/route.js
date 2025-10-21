import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";

export async function POST(req) {
  try {
    const { username, password } = await req.json();


    const wpRes = await axios.post("https://solarhouse.pk/wp-json/jwt-auth/v1/token", {
      username,
      password,
    });

    const token = wpRes.data.token;

    if (!token) {
      return NextResponse.json(
        { error: wpRes.data.message || "Token not received from WordPress" },
        { status: 401 }
      );
    }
    const cookieStore = await cookies();
    cookieStore.set("_auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });

    return NextResponse.json(
      { message: "Login successful",valid : true, token },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      {
        error: "Internal Server Error",
        details: error.response?.data || error.message,
      },
      { status: 500 }
    );
  }
  
}
