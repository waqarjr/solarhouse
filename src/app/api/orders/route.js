import { NextResponse } from "next/server";
import api from "@/app/lib/api";

export async function POST(req) {
  try {
    const {id} = await req.json();

    const customerData  = await api.get(`/orders?customer=${id}`);
    if ( customerData.data.length === 0) 
      return NextResponse.json({valid: false , message : "userorder not found"})
    else
      return NextResponse.json({valid: true , message : customerData.data})

  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ valid: false, message: "Invalid user" },{ status: 500 }
    );
  }
}
