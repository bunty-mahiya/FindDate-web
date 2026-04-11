import React, { useEffect } from "react";
import Navber from "./Navber";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/useSlice";
const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user);
  const fetchUser = async()=>{
    try {
      const response = await axios.get(BASE_URL + "/profile/view",{withCredentials:true})
      dispatch(addUser(response.data.data))
      
    } catch (error) {
      if(error.response.status === 401){
        navigate("/login")
      }
      console.log(error.response);
    }
  } 
  useEffect(()=>{
   if(!userData) { fetchUser()} 
  },[])
  return (
    <>
      <Navber />
      <Outlet />
    </>
  );
};

export default Body;
