import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

const FeedCard = ({ feedData }) => {
  const { firstName, lastName, photoURL, about, gender, age, skills } =
    feedData || {};
   const dispatch = useDispatch()
  const handleInterested = async (status,id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + id,
        {},
        { withCredentials: true },
      );
     dispatch(removeFeed(id))
      console.log(id, status,res);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="card bg-base-300 w-96 p-4 shadow-sm">
      <figure className="px-10 pt-10">
        <img src={photoURL} alt={firstName} className="rounded-xl" />
      </figure>
      <div className="card-body ">
        <h2 className="card-title capitalize">
          {firstName} {lastName}
        </h2>
        {feedData.gender && feedData.age && (
          <p className="capitalize text-yellow-200">
            {gender}, {age}
          </p>
        )}
        <p className="capitalize text-green-300 overflow-hidden">{about}</p>
        <p className="capitalize text-green-300 overflow-hidden">{skills}</p>
        <div className="card-actions">
          <button className="btn btn-primary" onClick={() =>{ handleInterested("ignore", feedData._id)}}>
            ignore
          </button>
          <button className="btn btn-primary" onClick={() => {handleInterested("interested", feedData._id)}}>
          interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
