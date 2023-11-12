import Cors from "micro-cors";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_PRIVATE);

const cors = Cors({
  allowMethods: ["POST", "HEAD"],
});

const secret = process.env.STRIPE_WEBHOOK_SECRET || "";

export async function POST(req: Request) {
  try {
    const body = await req.text();
    
    const signature = headers().get("stripe-signature");
    
    const event = stripe.webhooks.constructEvent(body, signature, secret);
    console.log("event.type "+event.data.object)

    if (event.type === "checkout.session.completed") {
      if (!event.data.object.customer_details.email) {
        throw new Error(`missing user email, ${event.id}`);
      }
     
     if (!event.data.object.metadata.itinerary_id) {
        throw new Error(`missing itinerary_id on metadata, ${event.id}`);
      }
    
      
    }
    
    return NextResponse.json({ result: event, ok: true });
  } catch (error) {
    
    console.error(error);
    return NextResponse.json(
      {
        message: "something went wrong",
        ok: false,
      },
      { status: 500 }
    );
  }
}