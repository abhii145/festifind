import type { Metadata } from "next"
import "./globals.css"
import { Poppins } from "next/font/google"
import Providers from "@/store/StoreProvider"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "Festifind",
  description: "Find Next Eevent",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={poppins.variable}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
