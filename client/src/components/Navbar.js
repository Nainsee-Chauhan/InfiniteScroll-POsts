import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/auth";
import toast from "react-hot-toast";

const Navbar = () => {
  const [auth, setAuth] = useAuth();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully ");
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container flex items-center justify-between">
        {/* <div className="text-white text-2xl font-semibold">MelodyVerse</div> */}
        <div className="text-white">
          <NavLink to="/home" className="hover:text-gray-300">
            Posts
          </NavLink>
        </div>
        <ul className="flex space-x-4 ml-auto">
          <li className="text-white">
            <NavLink to="/home" className="hover:text-gray-300">
              Home
            </NavLink>
          </li>
          {/* <li className="text-white">
            <NavLink to="/posts" className="hover:text-gray-300">Posts</NavLink>
          </li>
          <li className="text-white">
            <NavLink to="/profile" className="hover:text-gray-300">Profile</NavLink>
          </li> */}

          {/* Add more navigation items as needed */}

          {!auth.user ? (
            <>
              <li className="text-white">
                <NavLink to="/register" className="hover:text-gray-300">
                  Register
                </NavLink>
              </li>
              <li className="text-white">
                <NavLink to="/" className="hover:text-gray-300">
                  Login
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li className="text-white">
                <NavLink onClick={handleLogout} to="/" className="hover:text-gray-300">
                  Logout
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
