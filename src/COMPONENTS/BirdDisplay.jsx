import { useState, useEffect, useContext, useCallback } from "react";
import AuthContext from "../store/authContext";
import axios from "axios";
import DetailsDisplay from "./DetailsDisplay";

const BirdDisplay = (props) => {
  const { userId } = useContext(AuthContext);
  const [userBird, setUserBird] = useState([]);

  const getUserBird = useCallback(() => {
    axios
      .get(`/api/birds/${userId}`)
      .then((res) => setUserBird(res.data))
      .catch((err) => console.log(err));
  }, [userId]);

  useEffect(() => {
    getUserBird();
  }, [getUserBird]);

  const mappedBirds = userBird.map((bird) => {
    return <DetailsDisplay key={bird.id} bird={bird} />;
  });

  return mappedBirds.length >= 1 ? (
    <main className=" bg-blue-200">
      <h2 className=" font-semibold text-xl">Your Bird History</h2>
      <div className=" ">{mappedBirds}</div>
    </main>
  ) : (
    <main className=" bg-blue-200">
      <h1 className="font-semibold text-xl">No Birds yet!</h1>
    </main>
  );
};

export default BirdDisplay;
