import { NextResponse } from "next/server";
import api from "@/app/lib/api";
import { cookies } from "next/headers";
import axios from "axios";


export async function POST(req) {
  try {
    const { username, regis, password } = await req.json();

    const existingUser = await api.get(`/customers?email=${regis}`);

    if (existingUser.data && existingUser.data.length > 0) 
      return NextResponse.json({ valid: false, message: "Email already exists. Please use another email."},{ status: 409 });
    

    const cost = await api.post("/customers",
      {
        email: regis,
        username: username,
        password: password,
      },
    );
    // console.log(cost);
    const wpRes = await axios.post("https://solarhouse.pk/wp-json/jwt-auth/v1/token", {
        username: username,
        password: password,
    });

    const token = wpRes.data.token;
    
    if(!token ) return NextResponse.json( { valid: false, message: "Token generation failed." }, { status: 400 });

    console.log(token,"signup");
    
    const cookieStore = await cookies();
    cookieStore.set("_auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });
        
   
    return NextResponse.json({ valid: true, message: "Account created and email sent successfully!",customer: wpRes.data},{status: 200});

  } catch (error) {
    return NextResponse.json({valid: false, message:  "Failed to register user or send email",},{status : 500});
  }
}
