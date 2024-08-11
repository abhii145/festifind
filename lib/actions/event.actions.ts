"use server"

import { CreateEventParams } from "@/types"
import { connectToDatabase } from "../database"
import Event from "../database/models/event.model"

export const createEvent = async (data: CreateEventParams) => {
  try {
    await connectToDatabase()

    const addEvent = await Event.create(data)
    console.log(addEvent)
    return JSON.parse(JSON.stringify(addEvent))
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getEventById = async (id: string) => {
  try {
    await connectToDatabase()

    if (!id) {
      throw new Error("Event ID is required")
    }

    const event = await Event.findById(id)
    return JSON.parse(JSON.stringify(event))
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getRealatedEventsByCategory = async (category: string) => {
  try {
    await connectToDatabase()
    const relatedEvents = await Event.find({ category }).limit(2)
    console.log(relatedEvents)
    return JSON.parse(JSON.stringify(relatedEvents))
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getAllEvents = async () => {
  try {
    await connectToDatabase()
    const events = await Event.find()
    return JSON.parse(JSON.stringify(events))
  } catch (error) {
    console.error(error)
  }
}

export const deleteEvent = async (id: string) => {
  try {
    await connectToDatabase()
    const event = await Event.findByIdAndDelete(id)
    return JSON.parse(JSON.stringify(event))
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const updateEvent = async (
  eventId: string,
  data: Partial<CreateEventParams>
) => {
  try {
    await connectToDatabase()

    if (!eventId) {
      throw new Error("Event ID is required")
    }

    const updatedEvent = await Event.findByIdAndUpdate(eventId, data, {
      new: true,
    })
    return updatedEvent ? updatedEvent.toObject() : null
  } catch (error) {
    console.error(error)
    throw error
  }
}
