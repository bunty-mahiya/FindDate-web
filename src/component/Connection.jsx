import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../utils/constants';
import { addConnection } from '../utils/Connection';
import { Link } from 'react-router-dom';

const Connection = () => {
    const dispatch = useDispatch();
    const connection = useSelector((store)=>store.connection);
    const handleConnection = async ()=>{
       try {
         const response = await axios.get(BASE_URL + "/user/connection",{withCredentials:true})
         dispatch(addConnection(response?.data?.data))
         console.log(response?.data?.data);
       } catch ( err) {
            console.log(err.message);
       }
    }
   console.log(connection);
   
   useEffect(()=>{
       handleConnection()
    },[])
    
    if(!connection) return <p>Loading...</p>
    if(connection.length === 0) return <p>No connections found.</p>
  return (
<div className="p-6 sm:p-10 max-w-3xl mx-auto ">
  <h1 className="text-center text-2xl font-medium capitalize mb-6 text-base-content">
    Connection
  </h1>

  <div className="flex flex-col gap-4">
    {connection.map((connections) => {
      const { firstName, lastName, photoURL, about, skill, age, gender } = connections;
      return (
        <div
          key={connections._id}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 sm:p-5 bg-base-300 rounded-2xl hover:border-base-content/20 transition-colors"
        >
          <img
            src={photoURL}
            alt={firstName}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border border-base-300 shrink-0"
          />

          <div className="flex-1 min-w-0">
            <h2 className="text-base font-medium capitalize text-base-content">
              {firstName + " " + lastName}
            </h2>

            {(gender || age) && (
              <div className="flex items-center gap-2 mt-1 text-sm text-base-content/60">
                {gender && <span className="capitalize">{gender}</span>}
                {gender && age && <span className="w-1 h-1 rounded-full capitalize bg-base-content/30 inline-block" />}
                {age && <span>{age} yrs</span>}
              </div>
            )}

            {about && (
              <p className="text-sm text-base-content/60 mt-1.5 capitalize leading-relaxed line-clamp-2">
                {about}
              </p>
            )}

            {skill && (
              <span className="inline-block mt-2 capitalize text-xs px-3 py-1 rounded-full bg-base-200 text-base-content/60 border border-base-300">
                {skill}
              </span>
            )}
          </div>
         <Link to={"/chat/" + connections._id} > <button className='btn btn-success w-22 '>Chat</button></Link>
        </div>
      );
    })}
  </div>
</div>
)
}

export default Connection