"use client"
import { Metadata } from "next"
import "styles/globals.css"
import Popup from "reactjs-popup"
import "reactjs-popup/dist/index.css"
import { useEffect, useState } from "react"
import useSocket from "@lib/hooks/use-socket"
import { useRouter } from "next/navigation"
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:8000"

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
}

export default function inviteToSubscribe() {
  const [open, setOpen] = useState(false)
  const socket = useSocket()
  const router = useRouter()
  useEffect(() => {
    if (socket.socket) {
      socket.socket.on("inviteTosubscribe", () => {
        if (localStorage.getItem("email") === "no email") {
          setOpen(true)
        }
      })
    }
  }, [socket])
  const closePopup = () => {
    setOpen(false)
  }
  return (
    <Popup open={open} modal nested>
      <div className="modal">
        <button className="close" onClick={closePopup}>
          &times;
        </button>
        <div className="text-xl header "> Subscribe Now ! </div>
        <div className="content text-[16px] text-center">
          Pour une expérience personnalisée et recevoir des recommandations de
          vélos adaptées à vos besoins,
          <br /> veuillez vous connecter ou créer un compte.
        </div>
        <div className="actions">
          <button
            className="button py-2 px-4 bg-gray-900 text-white rounded-md"
            onClick={() => {
              router.push("/account")
              closePopup()
            }}
          >
            Connection
          </button>
        </div>
      </div>
    </Popup>
  )
}
