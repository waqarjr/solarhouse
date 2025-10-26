import { NextResponse } from "next/server";

export async function POST() {
  try{
    const res = NextResponse.json({ valid: true, message: "Logged out successfully" });
  
    res.cookies.set({
      name: "_auth_token",
      value: "",
      path: "/",
      httpOnly: true,
      maxAge: 0,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
  
    return res;

  } catch(error) {
    NextResponse.json({ valid: false, message: "Fail in logout" });
  }
}
