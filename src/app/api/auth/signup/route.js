import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import api from "@/app/lib/api";
import { cookies } from "next/headers";
import axios from "axios";


export async function POST(req) {
  try {
    const { username, regis, password } = await req.json();

    const existingUser = await api.get(`/customers?email=${regis}`);

    if (existingUser.data && existingUser.data.length > 0) 
      return NextResponse.json({  valid: false, message: "User already exists. Please use another email."});
    

    await api.post("/customers",
      {
        email: regis,
        username: username,
        password: password,
      },
    );
    
    const wpRes = await axios.post("https://solarhouse.pk/wp-json/jwt-auth/v1/token", {
        username: username,
        password: password,
    });

    const token = wpRes.data.token;

    const cookieStore = await cookies();
    cookieStore.set("_auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });
        
    // const transporter = nodemailer.createTransport({
    //   host: "smtp.gmail.com",
    //   port: 587,
    //   secure: false,
    //   auth: {
    //     user: "waqarjr03@gmail.com",
    //     pass: "mrfxynsptfzbplxm", // Use App Password, not real Gmail password
    //   },
    // });

    //  await transporter.sendMail({
    //   from: '"Solar Store" <waqarjr03@gmail.com>',
    //   to: regis,
    //   subject: "Welcome to Solar House!",
    //   html: `
    //     <div style="font-family: Arial, sans-serif;">
    //       <div style="max-width: 800px; background-color: #fff; margin: 0 auto; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
    //         <div style="padding: 20px; text-align: center;">
    //           <img src="https://solarhouse.pk/wp-content/uploads/2025/06/solor-house-logo.png" alt="Solar House Logo" style="width: 300px;" />
    //         </div>
    //         <div style="padding: 10px 30px;">
    //           <h1 style="color: #333;">Welcome to Solar House!</h1>
    //           <p style="font-size: 15px; color: #555;">Hi <strong>${username}</strong>,</p>
    //           <p style="font-size: 15px; color: #555;">Thank you for creating an account with <strong>Solar House</strong>! We're excited to have you join our community.</p>
              
    //           <div style="margin: 25px 0; border-top: 1px solid #eee; border-bottom: 1px solid #eee; padding: 15px 0;">
    //             <div style="font-size: 14px; color: #333;">
    //               <div><strong>Username:</strong> ${username}</div>
    //               <div style="margin-top: 10px;">
    //                 <a href="http://localhost:3000/my-account" style="color: #3b82f6;">Set your new password</a>
    //               </div>
    //             </div>
    //           </div>

    //           <div style="border-bottom: 1px solid #eee;">
    //             <p style="font-size: 15px; color: #555;">You can access your account area to view orders, change your password, and more via the link below:</p>
    //             <a href="http://localhost:3000/my-account" style="color: #3b82f6;">My account</a>
    //             <p>We look forward to seeing you soon.</p>
    //           </div>

    //           <div style="padding: 10px; text-align: center; color: #3b82f6;">
    //             <p style="margin: 8px 0; font-size: 14px;">
    //               <strong>Store URL:</strong>
    //               <a href="https://solarhouse.pk" style="color: #3b82f6; text-decoration: none;">solarhouse.pk</a>
    //             </p>
    //             <p style="margin: 8px 0; font-size: 14px;">
    //               <strong>Store Address:</strong> Office M27, IT Tower, Hali Road, Gulberg III, Lahore, 54000, Punjab, Pakistan
    //             </p>
    //             <p style="margin: 8px 0; font-size: 14px;">
    //               <strong>Store Name:</strong> Solar House
    //             </p>
    //             <p style="margin: 8px 0; font-size: 14px;">
    //               <strong>Contact Email:</strong>
    //               <a href="mailto:contact@solarhouse.pk" style="color: #3b82f6; text-decoration: none;">contact@solarhouse.pk</a>
    //             </p>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   `,
    // });
    return NextResponse.json({ valid: true, message: "Account created and email sent successfully!",customer: wpRes.data});

  } catch (error) {
    return NextResponse.json({valid: false, message:  error.message, response :"Failed to register user or send email"});
  }
}
