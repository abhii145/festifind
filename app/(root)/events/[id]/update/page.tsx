"use client"
import EventForm from "@/components/shared/EventForm"
import { getEventById } from "@/lib/actions/event.actions"
import useAuth from "@/lib/useAuth"
import { RootState } from "@/store/store"
import { useSelector } from "react-redux"
import { useState, useEffect } from "react"

type UpdateEventProps = {
  params: {
    id: string
  }
}

const UpdateEvent = ({ params: { id } }: UpdateEventProps) => {
  const isAuthorized = useAuth("admin")
  const user = useSelector((state: RootState) => state.user.user)
  const userId = user?._id!

  const [event, setEvent] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await getEventById(id)
        console.log(data)
        setEvent(data)
      } catch (error) {
        setError(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchEvent()
  }, [id])

  console.log("Event state:", JSON.stringify(event, null, 2))
  if (!isAuthorized) {
    return null
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error fetching event: {error.message}</div>
  }

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">
          Update Event
        </h3>
      </section>

      <div className="wrapper my-8">
        <EventForm
          type="Update"
          event={event}
          eventId={event?.id}
          userId={userId}
        />
      </div>
    </>
  )
}

export default UpdateEvent
