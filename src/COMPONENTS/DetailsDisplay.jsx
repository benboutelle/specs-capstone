import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import AddBird from "./AddBird";

const DetailsDisplay = (props) => {
  const [birdDetails, setBirdDetails] = useState({});
  const [showDetails, setShowDetails] = useState(false);
  const [date, setDate]= useState('')
  const getBirdDetails = useCallback(() => {
    axios
      .get(`/api/details/${props.bird.id}`)
      .then((res) => {
        setBirdDetails(res.data[0])
        const timeStamp = Date.parse(res.data[0].date)
        const stringDate = new Date(timeStamp)
        setDate(stringDate.toDateString())
      })
      .catch((err) => console.log(err));
    console.log(props.bird.birdId);
  }, [props.bird.id]);

  useEffect(() => {
    getBirdDetails();
  }, [getBirdDetails]);

  const handleClick = () => {
    setShowDetails(!showDetails);
  };

  console.log(birdDetails);
  return birdDetails.bird ? (
    <main className=" ring-2 ring-gray-100 ">
      {!showDetails ? (
        <div className=" ">
          <p className=" font-semibold ">{birdDetails.bird.birdName}</p>
        </div>
      ) : (
        <div className="grid grid-cols-4">
          <div className=" ring-1 ring-gray-100">
            <label>Date seen</label>
            <h4>{date}</h4>
          </div>
          <div className=" ring-1 ring-gray-100">
            <label>time</label>
            <h4>{new Date('1970-01-01T' + birdDetails.time + 'Z').toLocaleTimeString('en-US',{timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'})}</h4>
          </div>
          <div className=" ring-1 ring-gray-100">
            <label>Location</label>
            <h4>{birdDetails.location}</h4>
          </div>
          <div className=" ring-1 ring-gray-100">
            <label>Notes</label>
            <h4>{birdDetails.notes}</h4>
          </div>
        </div>
      )}
      <br />
      <button
        className=" ring-1 ring-gray-100 bg-blue-200 rounded-md hover:bg-blue-300 "
        onClick={handleClick}
      >
        {showDetails ? "Hide Details" : "View Details"}
      </button>
    </main>
  ) : (
    <main>
      <h1>No Details yet!</h1>
    </main>
  );
};

export default DetailsDisplay;
