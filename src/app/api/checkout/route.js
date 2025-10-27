import api from "@/app/lib/api";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { billing, shipping ,status} = await req.json();
    if (!billing || !billing.email) {
      return NextResponse.json({ valid: false, message: "Billing information or email is missing." , order:false },
        { status: 400 });
    }

    const [payment_method, payment_method_title] = billing?.payment?.split(",") || [];
    const method = payment_method;
    let customerId = null; 

    const existingUser = await api.get(`/customers?email=${billing.email}`);

    if (existingUser.data && existingUser.data.length > 0) {

      customerId = existingUser.data[0].id;

    } else {

      const password = Math.floor(Math.random() * 1000000).toString();
      const username = billing.email.split("@")[0];
      let newUser;
    try{
         newUser = await api.post("/customers", {
          email: billing.email,
          username,
          password,
        });

    }catch(error){
        return NextResponse.json(
      {  valid: false, message: "Fail to login your account", order: false,},
      { status: 201 }
    );
    }

      customerId = newUser.data.id;
    }

    const createOrder = async (customerId) => {
      const orderData = {
        payment_method,
        payment_method_title,
        status: method === "cod" ? "processing" : "on-hold",
        set_paid: method === "cod" ?  true : false,
        currency: "PKR",
        billing: {
          first_name: billing?.firstName,
          last_name: billing?.lastName,
          address_1: billing?.streetAddress,
          address_2: "",
          city: billing?.townCity,
          state: billing?.state,
          postcode: billing?.postcode,
          country: billing?.country || "PK",
          email: billing?.email,
          phone: billing?.phone,
        },
        shipping: {
          first_name: shipping?.firstName || billing?.firstName,
          last_name: shipping?.lastName || billing?.lastName,
          address_1: shipping?.streetAddress || billing?.streetAddress,
          address_2: "",
          city: shipping?.townCity || billing?.townCity,
          state: shipping?.state || billing?.state,
          postcode: shipping?.postcode || billing?.postcode,
          country: shipping?.country || "PK",
        },
        line_items: billing?.products?.map((p) => ({
                    product_id: p.id,         
                    quantity: p.quantity || 1,
                  })),
        customer_id: customerId,
        customer_note: billing?.orderNote || "",
        shipping_lines: [
          {
            method_id: "flat_rate",
            method_title: "Flat Rate",
            total: "250",
          },
        ],
      };
      return await api.post("/orders", orderData);
    };

    // Create order
    const orderResponse = await createOrder(customerId);

    return NextResponse.json( 
      {  valid: true, message: "Order created successfully!", order: orderResponse.data,},
      { status: 201 }
    );
  } catch (error) {
    console.error("Order creation error:", error.response?.data || error.message);

    const errorMsg = error.response?.data?.message || "An unexpected error occurred while creating the order.";

    return NextResponse.json(
      {  valid: false,  message: errorMsg,  order: error.response?.data || null,},  { status: error.response?.status || 500 }
    );
  }
}
