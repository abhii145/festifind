// lib/actions/order.actions.ts

import { CreateOrderParams, GetOrdersByEventParams } from "@/types"
import { redirect } from "next/navigation"
import Stripe from "stripe"
import Order from "../database/models/order.model"
import { connectToDatabase } from "../database"
import { ObjectId } from "mongodb"

export const checkoutOrder = async (order: any) => {
     if (!process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY) {
       throw new Error("Stripe secret key is missing.")
     }

    const stripe = new Stripe(
      "sk_test_51PmGbZSHus4jNJZFFX4mYWaEkSkdPNKyzinPSi1PBf2X38ln0pivfPVdb4x8lxoEmbu1vNh7WigrBn67gh8vapH400M5GarHC2",
      {
        apiVersion: "2024-06-20",
      }
    )
  const price = order.isFree ? 0 : Number(order.price) * 100

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: price,
            product_data: {
              name: order.eventTitle,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        eventId: order.eventId,
        buyerId: order.buyerId,
      },
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
    })

   return session.id
  } catch (error) {
    console.error("Error creating checkout session:", error)
    throw error
  }
}


export const createOrder = async (order: CreateOrderParams) => {
  try {
    await connectToDatabase()

    const newOrder = await Order.create({
      ...order,
      event: order.eventId,
      buyer: order.buyerId,
    })

    return JSON.parse(JSON.stringify(newOrder))
  } catch (error) {
    console.log(error)
    throw error
  }
}
