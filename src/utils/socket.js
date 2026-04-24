import io from "socket.io-client"
import { BASE_URL } from "./constants"

export const connectionSocket = ()=>{
 if(location.hostname == "localhost"){
   return io(BASE_URL)    // connect backend server to frontend server
 }else{
    return io("/" ,{path:"/api/socket.io"})
 }
     
}

