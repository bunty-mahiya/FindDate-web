import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./useSlice";
import feedReducer from "./feedSlice";
import connectionReducer from "./Connection";
import RequestViewSlice from "./RequestViewSlice";
const Store = configureStore({
    reducer:{
        user:UserReducer,
        feed:feedReducer,
        connection:connectionReducer,
        requestView:RequestViewSlice
    }
})

export default Store;