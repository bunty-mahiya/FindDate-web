import React from 'react'
import EditProfile from './EditProfile'
import { useSelector } from 'react-redux'

const Profile = () => {

  const user = useSelector((store) => store.user);
   if (!user) return (
    <div className="flex justify-center mt-20">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  )
  return(
    <div><EditProfile user={user} /></div>
  )
}

export default Profile