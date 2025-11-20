import { NextResponse } from "next/server";
import api from "@/app/lib/api";

// GET orders
export async function POST(req) {
  try {
    const {id} = await req.json();

    const customerData = await api.get(`/orders?customer=${id}`);
    if (customerData.data.length === 0) 
      return NextResponse.json({valid: false, message: "userorder not found"})
    else
      return NextResponse.json({valid: true, message: customerData.data})

  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ valid: false, message: "Invalid user" }, { status: 500 });
  }
}

// DELETE order
export async function DELETE(req) {
  try {
    const {orderId} = await req.json();

    if (!orderId) {
      return NextResponse.json({ success: false, message: "Order ID is required" }, { status: 400 });
    }

    // Delete from WooCommerce/your API
    const response = await api.delete(`/orders/${orderId}`, {
      params: { force: true }
    });

    if (response.status === 200) {
      return NextResponse.json({ success: true, message: "Order deleted successfully" });
    } else {
      return NextResponse.json({ success: false, message: "Failed to delete order" }, { status: 400 });
    }

  } catch (error) {
    console.error("Delete API error:", error);
    return NextResponse.json({ success: false,  message: error.response?.data?.message || "Error deleting order" }, { status: 500 });
  }
}