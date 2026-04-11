import { createSlice } from "@reduxjs/toolkit";


const RequestViewSlice = createSlice({
    name:"requestView",
    initialState: null,
    reducers:{
        addRequestView:(state,action)=>{
            return action.payload},
        removerequestView:(state,action)=>{
            return state.filter((requestView)=>requestView._id !== action.payload)
        }
}})

const {addRequestView , removerequestView}=RequestViewSlice.actions
export {addRequestView , removerequestView}
export default RequestViewSlice.reducer