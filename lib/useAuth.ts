import { useEffect } from "react"
import { RootState } from "@/store/store"
import { useSelector } from "react-redux"
import { useRouter } from "next/navigation"

const allowedRoles = ["admin"]


const useAuth = (requiredRole: string) => {
  const router = useRouter()
  const user = useSelector((state: RootState) => state.user.user)

  useEffect(() => {
      if (!user) {
          router.push("/auth")
      } else if (user && !allowedRoles.includes(user.role)) {
          router.push("/")
      }
  }, [user, router])

  return user && allowedRoles.includes(user.role)
}

export default useAuth
