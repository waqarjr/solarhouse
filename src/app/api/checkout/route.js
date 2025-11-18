import api from "@/app/lib/api";
import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { billing, shipping } = await req.json();
    if (!billing || !billing.email) {
      return NextResponse.json({ valid: false, message: "Billing information or email is missing.", order: false }, { status: 400 });
    }

    const [payment_method, payment_method_title] = billing?.payment?.split(",") || [];
    const method = payment_method;
    let customerId = null;
    let isNewCustomer = false;
    let generatedPassword = null;
    let generatedUsername = null;
    let loginPayload = null;

    const existingUser = await api.get(`/customers?email=${billing.email}`);

    if (existingUser.data && existingUser.data.length > 0) {
      customerId = existingUser.data[0].id;
    } else {
      const password = Math.floor(Math.random() * 1000000).toString();
      const username = billing.email.split("@")[0];
      let newUser;
      
      try {
        newUser = await api.post("/customers", {
          email: billing.email,
          username,
          password,
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
        });
        customerId = newUser.data.id;
        isNewCustomer = true;
        generatedPassword = password;
        generatedUsername = username;
      } catch (error) {
        return NextResponse.json({ valid: false, message: "Failed to create your account", order: false }, { status: 201 });
      }
    }

    const createOrder = async (customerId) => {
      const orderData = {
        payment_method,
        payment_method_title,
        set_paid: method === "cod" ? true : false,
        status: method === "cod" ? "processing" : "on-hold",
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
          quantity: p.qty || p.quantity || 1,
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

    // Update customer billing and shipping addresses if user already exists
    if (!isNewCustomer) {
      try {
        await api.put(`/customers/${customerId}`, {
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
        });
      } catch (updateError) {
        console.error("Failed to update customer addresses:", updateError.response?.data || updateError.message);
        // Don't fail the order if address update fails
      }
    }

    if (generatedPassword && generatedUsername) {
      try {
        const wpRes = await axios.post("https://solarhouse.pk/wp-json/jwt-auth/v1/token", {
          username: generatedUsername,
          password: generatedPassword,
        });
        const token = wpRes.data?.token;

        if (token) {
          const cookieStore = await cookies();
          cookieStore.set("_auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 30,
            path: "/",
          });
          loginPayload = { valid: true, message: wpRes.data };
        }
      } catch (autoLoginError) {
        console.error("Auto login failed:", autoLoginError.response?.data || autoLoginError.message);
        loginPayload = { valid: false, message: "Auto login failed" };
      }
    }

    return NextResponse.json(
      { valid: true, message: "Order created successfully!", order: orderResponse.data, login: loginPayload },
      { status: 201 }
    );
  } catch (error) {
    console.error("Order creation error:", error.response?.data || error.message);

    const errorMsg = error.response?.data?.message || "An unexpected error occurred while creating the order.";

    return NextResponse.json({ valid: false, message: errorMsg, order: error.response?.data || null }, { status: error.response?.status || 500 });
  }
}