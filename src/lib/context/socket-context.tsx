"use client"
import useUser from "@lib/hooks/use-user"
import React, { createContext, FC, ReactNode, useEffect, useState } from "react"
import io, { Socket } from "socket.io-client"

interface SocketContextType {
  socket: Socket | null
}

const SocketContext = createContext<SocketContextType>({ socket: null })

interface SocketProviderProps {
  children: ReactNode
}

const SocketProvider: FC<SocketProviderProps> = ({ children }) => {
  const BASE_URL = "http://localhost:9000"

  const [socket, setSocket] = useState<Socket | null>(null)
  const user = useUser()

  useEffect(() => {
    if (!socket) {
      const newSocket = io(BASE_URL, {
        secure: true,
      })
      setSocket(newSocket)
    }
    if (socket) {
      socket.on("connect", () => {
        console.log("hello")
        socket.emit("check-workflow-id", user.workflowId)
      })

      socket.on("set-workflow-id", (payload) => {
        user.setWorkflowId(payload.workflowId)
      })

      socket.on("openBot", () => {
        console.log("now")
      })
    }

    return () => {
      if (socket) {
        socket.disconnect()
      }
    }
  }, [socket, BASE_URL])

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  )
}

export { SocketContext, SocketProvider }
