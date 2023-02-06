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
    <div className="bg-blue-200 ">
      <h3 className="">Fill out some information about the
        <div className=" font-semibold italic underline">{props.birdName}</div>
      </h3>
        <br/> 
      <form className="flex flex-col  " onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label className=" ">Date</label>
          <br/>
          <input
            className=" rounded-md shadow-lg"
            type="date"
            onChange={(e) => setDate(e.target.value)}/>
        </div>
        <br/>
        <div>
          <label className="">Time</label>
          <br/>
          <input
            className=" rounded-md shadow-lg"
            type="time"
            onChange={(e) => setTime(e.target.value)}/>
        </div>
        <br/>
        <div >
          <label className=" ">General Area</label>
          <br/>
          <input
            className="rounded-md shadow-lg"
            placeholder="Location"
            onChange={(e) => setLocation(e.target.value)}/>
        </div>
        <br/>
        <div >
          <label className="flex flex-col">Add extra notes if needed</label>
          <textarea
            className="resize rounded-md shadow-lg"
            placeholder="Notes"
            onChange={(e) => setNotes(e.target.value)}/>
        </div>
        <button className=" hover:underline">Submit</button>
      </form>
    </div>
  );
};

export default AddDetails;
