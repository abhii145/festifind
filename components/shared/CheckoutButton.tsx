"use client"

import Link from "next/link"
import React from "react"
import { Button } from "../ui/button"
import { useSelector } from "react-redux"
import { RootState } from "@/store/store"
import Checkout from "./Checkout"

interface CheckoutButtonProps {
  event: {
    endDateTime: string
  }
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({ event }) => {
  const userId = useSelector((state: RootState) => state.user.user?._id)
  const hasEventFinished = new Date(event.endDateTime) < new Date()

  if (hasEventFinished) {
    return (
      <p className="p-2 text-red-400">
        Sorry, tickets are no longer available.
      </p>
    )
  }

  return (
    <div className="flex items-center gap-3">
      {!userId ? (
        <Button asChild className="rounded-full" size="lg">
          <Link href="/sign-in">Get Tickets</Link>
        </Button>
      ) : (
        <Checkout event={event} userId={userId} />
      )}
    </div>
  )
}

export default CheckoutButton
