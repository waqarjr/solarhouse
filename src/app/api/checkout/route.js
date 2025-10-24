import { NextResponse } from "next/server";


export async function POST(req) {
    try{
        const  {billing, shipping,payment}= await req.json();
        
        if(shipping) {
            console.log(billing, shipping,payment);
        } else {
            console.log(billing,payment);
        }
        return NextResponse.json({valid: true , message :"Your order has been take successfully"},{status:200})
    }catch(error){
        return NextResponse.json({valid: false , message :"Server Error"},{status:500})
    }
}