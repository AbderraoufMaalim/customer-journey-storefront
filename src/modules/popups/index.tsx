"use client"
import { Metadata } from "next"
import "styles/globals.css"
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useEffect, useState } from "react";
import useSocket from "@lib/hooks/use-socket";
import { useRouter } from 'next/navigation'
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:8000"

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
}

export default function inviteToSubscribe() {
    const [open, setOpen] = useState(false);
    const socket = useSocket();
    const router = useRouter()
  useEffect(()=>{
    if (socket.socket) {
        socket.socket.on("inviteTosubscribe", () => {
            setOpen(true);
          });
    }
  },[socket])
  const closePopup = ()=> {
    setOpen(false);
  }
  return (
    <Popup
    open={open}
    modal
    nested
  >
      <div className="modal">
        <button className="close" onClick={closePopup} >
          &times;
        </button>
        <div className="header"> Modal Title </div>
        <div className="content">
          {' '}
         Subscribe Now ! 
          <br />
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur sit
          commodi beatae optio voluptatum sed eius cumque, delectus saepe repudiandae
          explicabo nemo nam libero ad, doloribus, voluptas rem alias. Vitae?
        </div>
        <div className="actions">
          <button
            className="button"
            onClick={() => {
                router.push('/account')
              closePopup();
            }}
          >
            close modal
          </button>
        </div>
      </div>
  </Popup>
  )
}
