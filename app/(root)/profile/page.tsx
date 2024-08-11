"use client"
import Collection from "@/components/shared/Collection"
import { Button } from "@/components/ui/button"
import useAuth from "@/lib/useAuth"
import { RootState } from "@/store/store"
import { SearchParamProps } from "@/types"
import Link from "next/link"
import React from "react"
import { useSelector } from "react-redux"

const ProfilePage = ({ searchParams }: SearchParamProps) => {
  const user = useSelector((state: RootState) => state.user.user)

  return (
    <>
      {/* My Tickets */}
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">My Tickets</h3>
          <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="/#events">Explore More Events</Link>
          </Button>
        </div>
      </section>
      <section className="wrapper my-8">
        <Collection
          data={null}
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
