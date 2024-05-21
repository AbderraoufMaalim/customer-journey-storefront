import { useContext } from "react"
// import { SocketContext } from "@lib/context/socket-context"
import { UserContext } from "@lib/context/user-context"

const useUser = () => useContext(UserContext)

export default useUser