import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req) {
  try {
    const token = req.cookies.get("_auth_token")?.value;

    if (!token) {
      const homePage = new URL("/", req.url);
      return NextResponse.redirect(homePage);
    }

    const verifyRes = await axios.post(
      "https://solarhouse.pk/wp-json/jwt-auth/v1/token/validate",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (verifyRes.data?.code === "jwt_auth_valid_token") {
      const userRes = await axios.get(
        "https://solarhouse.pk/wp-json/wp/v2/users/me",
        {
          headers: { 
            Authorization: `Bearer ${token}`,
          },
        }
      ); 

      return NextResponse.json({
        valid: true,
        message: userRes.data,
      });
    }

    return NextResponse.json({
      valid: false,
      message: "Invalid token",
    });
  } catch (error) {
    console.error("Token validation error:", error.message);
    return NextResponse.json({
      valid: false,
      message: "Error validating token",
    });
  }
}
