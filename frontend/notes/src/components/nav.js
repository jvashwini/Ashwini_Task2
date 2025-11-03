import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <nav className="flex justify-between items-center bg-gray-800 text-white px-8 py-8 shadow-md">
      <h1 className="text-2xl font-bold"> My Personal App</h1>
      <div className="flex gap-4">
        {!isLoggedIn ? (
          <>
            <Link to="/login" className="hover:text-yellow-400 text-xl ">Login</Link>
            <Link to="/register" className="hover:text-yellow-400 text-xl ">Register</Link>
          </>
        ) : (
          <>
            <Link to="/notes" className="hover:text-yellow-400 text-xl ">My Notes</Link>
            <button onClick={handleLogout} className="hover:text-red-400 text-xl">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
