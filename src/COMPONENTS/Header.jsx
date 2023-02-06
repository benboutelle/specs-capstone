import { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../store/authContext";

const Header = () => {
  const { logout, token } = useContext(AuthContext);

  return (
    <nav className=" bg-blue-300 flex align-center justify-evenly">
      {token && (
        <>
          <div className="hover:underline hover:font-semibold cursor-pointer">
            <NavLink to="/home">Profile</NavLink>
          </div>
          <div className=" hover:underline hover:font-semibold cursor-pointer">
            <NavLink to="/post">Post</NavLink>
          </div>
          <button
            className="hover:underline hover:font-semibold cursor-pointer "
            onClick={() => logout()}>
              Logout
          </button>
        </>
      )}
    </nav>
  );
};

export default Header;
