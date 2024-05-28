"use client"

import useUser from "@lib/hooks/use-user"
import Head from "next/head"
import Script from "next/script"
import { useEffect } from "react"

function Bot() {
  const user = useUser()
  function wait(seconds: number) {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve()
      }, seconds * 1000) // Convert seconds to milliseconds
    })
  }

  useEffect(() => {
    const func = async () => {
      if (user.workflowId) {
        const script = document.createElement("script")
        script.src = "https://cdn.botpress.cloud/webchat/v0/inject.js"
        script.async = true
        script.id = "bot"
        const oldScript = document.getElementById("bot")
        if (oldScript) {
          const s = document.getElementById("bp-web-widget-container")
          document.body.removeChild(oldScript)
          document.body.removeChild(s)
          await wait(1)
          document.body.appendChild(script)
        } else {
          document.body.appendChild(script)
        }

        const payload = {
          email: user.email,
          workflowId: user.workflowId,
        }

        script.onload = () => {
          if (typeof window.botpressWebChat !== "undefined") {
            window.botpressWebChat.init({
              composerPlaceholder: "Welcome!",
              botConversationDescription: "Enjoy your time!",
              botId: "65d41bb3-6fca-4f05-8fcd-7d7c7c760b40",
              hostUrl: "https://cdn.botpress.cloud/webchat/v0",
              messagingUrl: "https://messaging.botpress.cloud",
              clientId: "65d41bb3-6fca-4f05-8fcd-7d7c7c760b40",
              webhookId: "7afeb090-4447-4282-bce0-fc71a2f1de80",
              lazySocket: true,
              themeName: "prism",
              botName: "Alex",
              stylesheet:
                "https://webchat-styler-css.botpress.app/prod/a1dc74da-76d2-4537-a33a-ca64464a8f93/v1561/style.css",
              frontendVersion: "v0",
              theme: "prism",
              themeColor: "#2563eb",
              userData: payload,
              useSessionStorage: true,
            })
          }
        }
      }
    }
    func()
  }, [user.workflowId, user.email])

  return <div id="webchat" />
}

export default Bot
