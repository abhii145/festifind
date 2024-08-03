"use client"

import { headerAdminLinks, headerUserLinks } from "@/constants"
import { useAppSelector } from "@/store/hooks"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"

const NavItems = () => {
  const pathname = usePathname()
  const user = useAppSelector((state) => state.user.user)

  const links = user?.role === "admin" ? headerAdminLinks : headerUserLinks

  return (
    <ul className="md:flex-between flex w-full flex-col items-start gap-5 md:flex-row">
      { links?.map((link) => {
        const isActive = pathname === link.route

        return (
          <li
            key={link.route}
            className={`${
              isActive && "text-primary-500"
            } flex-center p-medium-16 whitespace-nowrap`}
          >
            <Link href={link.route}>{link.label}</Link>
          </li>
        )
      })}
    </ul>
  )
}

export default NavItems
