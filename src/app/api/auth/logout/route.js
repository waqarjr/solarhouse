import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ valid: true, message: "Logged out successfully" });

  res.cookies.set({
    name: "token",
    value: "",
    path: "/",
    httpOnly: true,
    maxAge: 0,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return res;
}
