import React, { useEffect } from "react"
import { Button } from "../ui/button"
import { loadStripe } from "@stripe/stripe-js"
import { checkoutOrder } from "@/lib/actions/order.actions"

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
)

const Checkout = ({ event, userId }: { event: any; userId: string }) => {
  useEffect(() => {
    const query = new URLSearchParams(window.location.search)
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.")
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      )
    }
  }, [])

  const onCheckout = async (e: React.FormEvent) => {
    e.preventDefault() // Prevent the default form submission

    const order = {
      eventTitle: event.title,
      eventId: event._id,
      price: event.price,
      isFree: event.isFree,
      buyerId: userId,
    }

    try {
      const sessionId = await checkoutOrder(order)
      const stripe = await stripePromise
      if (stripe && sessionId) {
        await stripe.redirectToCheckout({ sessionId })
      }
    } catch (error) {
      console.error("Error redirecting to checkout:", error)
    }
  }

  return (
    <Button
      onClick={onCheckout}
      role="link"
      size="lg"
      className="button sm:w-fit"
    >
      {event.isFree ? "Get Ticket" : "Buy Ticket"}
    </Button>
  )
}

export default Checkout
