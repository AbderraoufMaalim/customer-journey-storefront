import { useContext } from "react"
import { SocketContext } from "@lib/context/socket-context"

const useSocket = () => useContext(SocketContext)

export default useSocket