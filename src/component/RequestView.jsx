import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequestView, removerequestView } from "../utils/RequestViewSlice";

const RequestView = () => {
  const requestView = useSelector((store) => store.requestView);
  const dispatch = useDispatch();
  const hendleRequestApi = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/request/receive", {
        withCredentials: true,
      });
      dispatch(addRequestView(res?.data?.data));
      console.log(res?.data?.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleAccept = async (status, id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + id,
        {},
        {
          withCredentials: true,
        },
      );
      console.log(res);
      dispatch(removerequestView(id))
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    hendleRequestApi();
  }, []);
  if (!requestView) return <p>Loading...</p>;
  if (requestView.length === 0) return <p>No requests found.</p>;
  return (
   <div className="px-4 sm:px-8 py-8 flex flex-col gap-4 max-w-3xl mx-auto">
  <div className="flex items-center justify-center text-2xl font-bold capitalize mb-2">
    Request
  </div>

  {requestView.map((requestViews) => {
    const { firstName, lastName, photoURL, about, skill, age, gender } =
      requestViews.senderId;
    return (
      <div
        key={requestViews._id}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-base-300 shadow-sm rounded-xl"
      >
        {/* Left — photo + info */}
        <div className="flex gap-3 items-start">
          <img
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover flex-shrink-0"
            src={photoURL}
            alt={firstName}
          />
          <div className="flex flex-col gap-1">
            <h2 className="font-semibold text-base capitalize">
              {firstName + " " + lastName}
            </h2>
            {gender && age && (
              <p className="text-sm capitalize text-yellow-200">
                {gender} · {age}
              </p>
            )}
            {about && (
              <p className="text-sm text-green-300 capitalize line-clamp-2">
                {about}
              </p>
            )}
            {skill && (
              <p className="text-sm text-white capitalize">
                Skills: {skill}
              </p>
            )}
          </div>
        </div>

        {/* Right — buttons */}
        <div className="flex gap-3 w-full sm:w-auto">
          <button
            className="btn btn-outline btn-success btn-sm flex-1 sm:flex-none uppercase"
            onClick={() => handleAccept("accepted", requestViews._id)}
          >
            Accept
          </button>
          <button
            className="btn btn-outline btn-accent btn-sm flex-1 sm:flex-none uppercase"
            onClick={() => handleAccept("rejected", requestViews._id)}
          >
            Reject
          </button>
        </div>
      </div>
    );
  })}
</div>
  );
};

export default RequestView;
