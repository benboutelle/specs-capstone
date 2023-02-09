import { useState } from "react";
import axios from "axios";
import AuthContext from "../store/authContext";
import { useNavigate } from "react-router-dom";
import AddBird from "./AddBird";

const AddDetails = (props) => {
  const navigate = useNavigate();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/details", {
        date,
        time,
        location,
        notes,
        birdId: props.birdId,
      })
      .then((res) => {
        console.log(res.data);
        console.log(date, time, location, notes);
        navigate("/home");
      });
  };

  return (
    <div className="bg-cover bg-[url(C:\Users\benny\OneDrive\Pictures\nature.jpg)] w-full h-screen ">
      <h3 className="bg-blue-200">Fill out some information about the
        <div className=" text-lg font-semibold italic underline">{props.birdName}</div>
      </h3>
        <br/> 
      <form className="flex flex-col  " onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label className="font-bold text-white bg-black/50 rounded-xl ">Date</label>
          <br/>
          <input
            className=" rounded-md shadow-lg"
            type="date"
            onChange={(e) => setDate(e.target.value)}/>
        </div>
        <br/>
        <div>
          <label className="  font-bold text-white bg-black/50 rounded-md">Time</label>
          <br/>
          <input
            className=" rounded-md shadow-lg"
            type="time"
            onChange={(e) => setTime(e.target.value)}/>
        </div>
        <br/>
        <div >
          <label className="font-bold text-white bg-black/50 rounded-lg">General Area</label>
          <br/>
          <input
            className="rounded-md shadow-lg"
            placeholder="Location"
            onChange={(e) => setLocation(e.target.value)}/>
        </div>
        <br/>
        <div >
          <label className=" font-bold text-white bg-black/50 rounded-lg">Add extra notes if needed</label>
          <br/>
          <textarea
            className="resize rounded-md shadow-lg"
            placeholder="Notes"
            onChange={(e) => setNotes(e.target.value)}/>
        </div>
        <button className=" hover:underline font-bold text-white">Submit</button>
      </form>
    </div>
  );
};

export default AddDetails;
