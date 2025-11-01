import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    const username = email.split("@")[0];

    const wpRes = await axios.post("https://solarhouse.pk/wp-json/jwt-auth/v1/token", {
        username: username,
        password: password,
    });

    const token = wpRes.data.token;
    
    if (!token) 
      return NextResponse.json( { message: "Invalid credentials", valid : false}, { status: 401 });
    
    const cookieStore = await cookies();
    cookieStore.set("_auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });

    return NextResponse.json({ message: wpRes.data, valid : true,}, { status: 200 });

  } catch (error) {
      if (error.response && error.response.status === 403) {
      return NextResponse.json( { message: "Invalid username or password", valid: false },{ status: 403 });
      }
  }
  
}
