"use client"
import React from "react"

const EventForm = ({
  userId,
  type,
}: {
  userId: string
  type: "Create" | "Update"
}) => {
    return <div>EventForm {type}</div>
}

export default EventForm
