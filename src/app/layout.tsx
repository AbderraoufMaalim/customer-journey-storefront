import { Metadata } from "next"
import "styles/globals.css"
import { SocketProvider } from "@lib/context/socket-context"
import Script from "next/script"
import Bot from "@modules/bot"
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
        <SocketProvider>
          <Bot/>
        <main className="relative">{props.children}</main>
        </SocketProvider>
      </body>   
    </html>
  )
}
