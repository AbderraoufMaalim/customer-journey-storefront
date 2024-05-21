import { Metadata } from "next"
import "styles/globals.css"
import { SocketProvider } from "@lib/context/socket-context"
import Script from "next/script"
import Bot from "@modules/bot"
import { UserProvider } from "@lib/context/user-context"
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:8000"

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <head>
      </head>
      <body>
        <UserProvider>

        <SocketProvider>
          <Bot/>
          <main className="relative">{props.children}</main>
        </SocketProvider>
        </UserProvider>
      </body>   
    </html>
  )
}
