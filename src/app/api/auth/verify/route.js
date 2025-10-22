import { NextResponse } from "next/server";


export async function POST(req) {
   
    try{

        const token = req.cookies.get('_auth_token')?.value;

        if (!token) {
            const homePage = new URL('/', origin);
            return NextResponse.redirect(homePage);
        }

        const verifyRes = await fetch("https://solarhouse.pk/wp-json/jwt-auth/v1/token/validate", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            },
        });
        
        if (verifyRes.ok)  return NextResponse.json({valid : true,})

        return NextResponse.json({valid : false,})   

    }catch(error){
         return NextResponse.json({valid : false,})
    }
}