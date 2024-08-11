"use client"
import Collection from "@/components/shared/Collection"
import { Button } from "@/components/ui/button"
import { getEventById } from "@/lib/actions/event.actions"
import { getAllOrders, getOrdersByUser } from "@/lib/actions/order.actions"
import useAuth from "@/lib/useAuth"
import { RootState } from "@/store/store"
import { SearchParamProps } from "@/types"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"

const ProfilePage = ({ searchParams }: SearchParamProps) => {
  const user = useSelector((state: RootState) => state.user.user)
  const [events, setEvents] = useState<any[]>([])
  const [adminEvents, setAdminEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  console.log(user?._id)

const fetchAdminOrders = async () => {
  try {
    const adminka = await getAllOrders()
    console.log("adminka.data:", adminka.data)

    // Extract event IDs from orders
    const eventIds = adminka.data.map((order: any) => order.event)
    console.log("eventIds:", eventIds)

    // Fetch event details for each event ID
    const eventDetails = await Promise.all(
      eventIds.map(async (id: string) => {
        console.log(`Fetching event for ID: ${id}`)
        const event = await getEventById(id)
        console.log(`Event data for ID ${id}:`, event)
        return event
      })
    )

    console.log("eventDetails:", eventDetails)
    setAdminEvents(eventDetails)
  } catch (error) {
    console.error("Error fetching admin orders:", error)
  }
}

  const fetchEvents = async () => {
    try {
      const res = await getOrdersByUser(user?._id!)
      console.log(res)

      const eventDetails = await Promise.all(
        res.data.map((id: string) => getEventById(id))
      )
      setEvents(eventDetails)
    } catch (error) {
      console.error("Error fetching events:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user) {
      fetchEvents()
      fetchAdminOrders()
    }
  }, [user?._id])

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">
            My Booked Tickets
          </h3>
          <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="/#events">Explore More Events</Link>
          </Button>
        </div>
      </section>
      <section className="wrapper my-8">
        <Collection
          data={user?.role === "admin" ? adminEvents : events}
          emptyTitle="No event tickets purchased yet"
          emptyStateSubtext="No worries - plenty of exciting events to explore!"
          collectionType="My_Tickets"
          limit={3}
          page={1}
          urlParamName="ordersPage"
          totalPages={1}
        />
      </section>
      ;
    </>
  )
}

export default ProfilePage
