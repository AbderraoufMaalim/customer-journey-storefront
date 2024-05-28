"use client"
import React, { createContext, FC, ReactNode, useEffect, useState } from "react"

interface userContextType {
  email: string | null
  workflowId: string | null
  setEmail: any
  setWorkflowId: any
}

const UserContext = createContext<userContextType>({
  email: null,
  workflowId: null,
  setEmail: null,
  setWorkflowId: null,
})

interface UserProviderProps {
  children: ReactNode
}

const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const [email, setEmail] = useState<string>("no email")
  const [workflowId, setWorkflowId] = useState<string | null>(null)

  useEffect(() => {
    const emailFromStorage = localStorage.getItem("email")
    const workflowIdFromStorage = localStorage.getItem("workflowId")

    if (emailFromStorage && !email) {
      setEmail(emailFromStorage)
    }

    if (workflowIdFromStorage && !workflowId) {
      setWorkflowId(workflowIdFromStorage)
    }

    if (email !== "no email" && email !== emailFromStorage) {
      localStorage.setItem("email", email)
      console.log("setting the email")
    }

    if (email === "no email" && emailFromStorage !== email) {
      localStorage.setItem("email", "no email")
    }

    if (workflowId && workflowId !== workflowIdFromStorage) {
      localStorage.setItem("workflowId", workflowId)
    }
  }, [email, workflowId])

  return (
    <UserContext.Provider
      value={{ email, workflowId, setEmail, setWorkflowId }}
    >
      {children}
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider }
