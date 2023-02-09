import { useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../store/authContext";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(true);

  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = {
      username,
      password,
    };

    axios
      .post(register ? "/api/register" : "/api/login", body)
      .then((res) => {
        authCtx.login(res.data.token, res.data.exp, res.data.userId);
      })
      .catch((err) => alert(err.response.data));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    axios
      .post("/api/login", { username, password })
      .then((res) => {
        authCtx.login(
          res.data.token,
          res.data.exp,
          res.data.userId,
          res.data.username
        );
      })
      .catch((err) => console.log(err));
    navigate("/post");
    console.log("handleLoginSubmit");
  };
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    axios
      .post("/api/register", { username, password })
      .then((res) => {
        authCtx.login(
          res.data.token,
          res.data.exp,
          res.data.userId,
          res.data.username
        );
      })
      .catch((err) => console.log(err));
    navigate("/post");
    console.log("handleRegisterSubmit");
  };
  return (
    <div className=" bg-cover bg-[url(C:\Users\benny\OneDrive\Pictures\nature.jpg)] w-full h-screen">
      <h1 className=" bg-blue-200 font-bold underline">Welcome to Birdman </h1>
      <h2 className=" bg-blue-200 ">Please Register or Login below</h2>
      <div>
        <br/>
        {register ? (
          <form
            className=" flex justify-evenly"
            onSubmit={(e) => handleRegisterSubmit(e)}
          >
            <input
              className=" ring-1 ring-slate-900/10 hover:bg-slate-100 rounded-lg text-center shadow-lg"
              placeholder="Enter a username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className=" ring-1 ring-slate-900/10 hover:bg-slate-100 rounded-lg text-center shadow-lg"
              placeholder="Enter a password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className=" bg-black/50 ring-2 ring-black rounded-lg font-bold text-white text-sm hover:underline">
              Register your account
            </button>
          </form>
        ) : (
          <form
            className=" flex justify-evenly"
            onSubmit={(e) => handleLoginSubmit(e)}
          >
            <input
              className=" ring-1 ring-slate-900/10 hover:bg-slate-200 rounded-lg text-center shadow-lg"
              placeholder="Enter your username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className=" ring-1 ring-slate-900/10 hover:bg-slate-200 rounded-lg text-center shadow-lg"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className=" bg-black/50 ring-2 ring-black rounded-lg font-bold text-white text-sm hover:underline">Login</button>
          </form>
        )}
          <br/>
        <button
          className=" bg-black/50 ring-2 ring-black rounded-lg font-bold text-white text-sm hover:underline"
          on
          onClick={() => setRegister(!register)} >
          Do you want to {register ? "login?" : "register?"}
        </button>
      </div>
    </div>
  );
};

export default Auth;
