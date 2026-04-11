import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addUser } from "../utils/useSlice";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setemailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLogin, setIsLogin] = useState(true);
 const dispatch = useDispatch();
 const navigate = useNavigate()
 const [Error,setError]=useState();
  async function handle() {
    try {
      const response = await axios.post(
        BASE_URL+"/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );
     dispatch(addUser(response.data))
      navigate("/")
    } catch (err) {
      setError(err?.response?.data || "somethin is wrong")
      console.log(err);
    }
  }

  async function handleSignUp(){
    try{
     const res = await axios.post(BASE_URL + "/singup", {
        firstName,
        lastName,
        email,
        password,
      },{withCredentials:true});
      dispatch(addUser(res.data?.data))
      console.log(res);
      navigate("/profile")
    }catch(err){
      setError(err?.res?.data || "somethin is wrong")
      console.log(err?.res?.data);
      
    }
  }
  return (
    <div className="flex justify-center  mt-12">
      <div className="card  bg-base-300 w-96 shadow-sm">
        <div className="card-body flex gap-7 flex-col ">
      {isLogin ?<h1 className="capitalize text-green-300 text-lg">login</h1> : <h1 className="capitalize text-green-300 text-lg">sign up</h1>}
          {!isLogin && <><label className="floating-label">
            <input
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              type="text"
              placeholder="First Name"
              className="input input-md"
            />
            <span className="capitalize">First Name</span>
          </label>
          <label className="floating-label">
            <input
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              type="text"
              placeholder="Last Name"
              className="input input-md"
            />
            <span className="capitalize">Last Name</span>
          </label> </>}
          <label className="floating-label">
            <input
              value={email}
              onChange={(e) => {
                setemailId(e.target.value);
              }}
              type="email"
              placeholder="Email Id"
              className="input input-md"
            />
            <span className="capitalize">Email id</span>
          </label>
          <label className="floating-label">
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              placeholder="password"
              className="input input-md"
            />
            <span className="capitalize">Password</span>
          </label>
          <p className="text-red-500">{Error}</p>
          <div className="card-actions justify-end">
            <p className="text-yellow-200 capitalize cursor-pointer" onClick={()=> setIsLogin(!isLogin)}>
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </p>
            <button onClick={isLogin ? handle : handleSignUp} className="btn btn-primary capitalize">
             { isLogin ? "Login" : "Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
