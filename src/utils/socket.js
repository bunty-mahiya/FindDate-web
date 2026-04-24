import io from "socket.io-client"
import { BASE_URL } from "./constants"

export const connectionSocket = ()=>{
    return io(BASE_URL)  // connect backend server to frontend server
}

