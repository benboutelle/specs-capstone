import {useState, useContext} from 'react'
import axios from 'axios'
import AuthContext from '../store/authContext'



const AddBird = (props) => {
  const authCtx = useContext(AuthContext)
  const [birdName, setBirdName]= useState([])


  const handleSubmit = e => {
    e.preventDefault()
    axios.post('/api/birds',{birdName, userId:authCtx.userId})
    .then((res)=> {
      console.log(res.data)
      console.log(birdName )
      props.setBirdId(res.data.id)
      props.setBirdName(res.data.birdName)
      props.toggle()

    })
    
  }
  return (
    <form  onSubmit={e => handleSubmit(e)}>
      <div className=" bg-cover bg-[url(C:\Users\benny\OneDrive\Pictures\nature.jpg)] w-full h-screen">


      <h1 className=" bg-blue-200 font-bold">Add a Bird to your record!</h1>
      <h3 className=" bg-blue-200 underline text-xl ">{birdName}</h3>
      <br/>
      <div className=" flex justify-center space-x-4">
        
      <input className="  hover:bg-slate-100 rounded-md text-center shadow-lg " placeholder='Bird Name' value={birdName} onChange={e => setBirdName(e.target.value)}/>
      <button className=" font-bold text-sm text-white hover:underline">Submit</button>
      </div>
        
      </div>

      

    </form>
  )
}

export default AddBird