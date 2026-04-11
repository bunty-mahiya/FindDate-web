import axios from 'axios'
import React from 'react'
import { BASE_URL } from '../utils/constants'
import{ useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import FeedCard from './FeedCard'

const Feed = () => {
  const feedData = useSelector((state)=>state.feed)
  const dispatch = useDispatch();
 
  const feedUser = async ()=>{
    if(feedData) return;
    try{const feedData = await axios.get(BASE_URL + "/feed" , {withCredentials:true})
    dispatch(addFeed(feedData.data))}
    catch(err){
      console.log(err);
    }
  }
  
  useEffect(()=>{
    feedUser()
  },[])
  
  
  if(!feedData) return
  if(feedData.length == 0) return <p className='flex justify-center mt-20 text-2xl font-bold'>No feed found.</p>

  return feedData && (
    <div className="flex justify-center">{<FeedCard feedData={feedData[0]} />}</div>
  )
}

export default Feed