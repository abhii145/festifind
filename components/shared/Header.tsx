"use client"
import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"
import NavItems from "./NavItems"
import MobileNav from "./MobileNav"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { logoutUser } from "@/store/slices/userSlice"
import { useRouter } from "next/navigation"

const Header = () => {
  const user = useAppSelector((state) => state.user.user)
  const dispatch = useAppDispatch()
  const router = useRouter()

  const logOutHandler = async () => {
    const result = await dispatch(logoutUser())
    if (logoutUser.fulfilled.match(result)) {
      router.push("/")
    }
  }

  return (
    <header className="w-full border-b">
      <div className="wrapper flex items-center justify-between">
        <Link href="/" className="w-36">
          <Image
            src="/assets/images/logo.svg"
            width={128}
            height={38}
            alt="Evently logo"
          />
        </Link>

        {user && (
          <>
            <nav className="md:flex-between hidden w-full max-w-xs">
              <NavItems />
            </nav>
            <MobileNav />
          </>
        )}

        <div className="flex w-32 justify-end gap-3">
          <Button
            className="rounded-full"
            size="lg"
            onClick={user ? logOutHandler : undefined}
          >
            <Link href="/auth">{user ? "Logout" : "Login"}</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

export default Header
