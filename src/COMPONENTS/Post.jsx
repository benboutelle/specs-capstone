import { useState } from "react";
import AddBird from "./AddBird";
import AddDetails from "./AddDetails";

const Post = () => {
  const [showdetails, setShowDetails] = useState(false);
const [birdId, setBirdId]= useState(null)
const [birdName, setBirdName] = useState('')
  const toggle = () => {
    setShowDetails(!showdetails);
  };

  return (
    <div>{showdetails ? <AddDetails birdName={birdName} birdId={birdId}/> : <AddBird toggle={toggle} setBirdId={setBirdId} setBirdName={setBirdName}/>}</div>
  );
};

export default Post;
