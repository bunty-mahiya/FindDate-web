import React, { useState } from "react";
import FeedCard from "./FeedCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/useSlice";
const EditProfile = ({ user }) => {
  const { firstName, lastName, photoURL, about, gender, age, skill } = user;
const [FirstName, setfirstName] = useState(firstName || "");
  const [LastName, setlastName] = useState(lastName || "");
  const [About, setAbout] = useState(about || "");
  const [Skills, setSkills] = useState(skill || "");
  const [Gender, setgender] = useState(gender || "");
  const [PhotoURL, setphotoURL] = useState(photoURL || "");
  const [Age, setage] = useState(age || "");
  const [alert, setAlert] = useState(false);

  const [Error, setError] = useState("");
  const dispatch = useDispatch();
  const handleSave = async () => {
    try {
      const response = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName: FirstName,
          lastName: LastName,
          photoURL: PhotoURL,
          about: About,
          gender: Gender,
          age: Age,
          skill: Skills,
        },
        { withCredentials: true },
      );
      dispatch(addUser(response?.data?.data));
      console.log(response);
      
      setAlert(true);
      setTimeout(()=>{setAlert(false)},3000)
    } catch (err) {
      setError(err.message || "somethin is wrong");
    }
  };
  return (
    <>
   { alert && <div className="toast toast-center toast-top  z-50">
  <div className="alert alert-success w-96  capitalize items-center flex ">
    <span> profile updated successfully.</span>
  </div>
</div>}
    <div className="flex justify-center gap-4 items-center relative">
      <div className="flex justify-center  mt-12">
        <div className="card  bg-base-300 w-96 shadow-sm">
          <div className="card-body flex gap-7 flex-col ">
            <label className="floating-label">
              <input
                value={FirstName}
                onChange={(e) => {
                  setfirstName(e.target.value);
                }}
                type="text"
                placeholder="First Name"
                className="input input-md outline-none border border-green-300"
              />
              <span className="capitalize">FirstName</span>
            </label>
            <label className="floating-label">
              <input
                value={LastName}
                onChange={(e) => {
                  setlastName(e.target.value);
                }}
                type="text"
                placeholder="Last Name"
                className="input input-md outline-none border border-green-300"
              />
              <span className="capitalize">LastName</span>
            </label>

            <select
              value={Gender}
              onChange={(e) => {
                setgender(e.target.value);
              }}
              className="select select-neutral  outline-none border border-green-300 capitalize"
            >
              <option disabled={true}>select gander</option>
              <option>male</option>
              <option>female</option>
              <option>other</option>
            </select>
            <label className="floating-label">
              <input
                value={Age}
                onChange={(e) => {
                  setage(e.target.value);
                }}
                type="text"
                placeholder="Age"
                className="input input-md outline-none border border-green-300"
              />
              <span className="capitalize">Age</span>
            </label>
            <label className="floating-label">
              <input
                value={PhotoURL}
                onChange={(e) => {
                  setphotoURL(e.target.value);
                }}
                type="text"
                placeholder="Photo URL"
                className="input input-md outline-none border border-green-300"
              />
              <span className="capitalize">Photo URL</span>
            </label>
            <label className="floating-label">
              <input
                value={Skills}
                onChange={(e) => {
                  setSkills(e.target.value);
                }}
                type="text"
                placeholder="Skills"
                className="input input-md outline-none border border-green-300"
              />
              <span className="capitalize">skills</span>
            </label>
            <fieldset className="fieldset ">
              <legend className="fieldset-legend">Your bio</legend>
              <textarea
                value={About}
                onChange={(e) => {
                  setAbout(e.target.value);
                }}
                className="textarea h-24 outline-none border border-green-300"
                placeholder="Bio"
              ></textarea>
            </fieldset>
            <p className="text-red-500">{Error}</p>
            <div className="card-actions justify-end">
              <button onClick={handleSave} className="btn btn-primary capitalize">
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      <FeedCard
        feedData={{
          firstName: FirstName,
          lastName: LastName,
          photoURL: PhotoURL,
          about: About,
          gender: Gender,
          age: Age,
          skills: Skills,
        }}
      />

    </div>
 
    </>
  );
};

export default EditProfile;
