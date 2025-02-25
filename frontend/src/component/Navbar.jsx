import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="flex justify-between">
      <div>
        <Link to="/">
          {" "}
          <h2 className="text-white text-2xl">Logo Here.</h2>
        </Link>
      </div>
      <div className="flex gap-3">
        <Link to="/login" className="text-white py-1 px-7 border border-white">
          Login
        </Link>
        <Link
          to="/register"
          className="text-white py-1 px-7 border border-white"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
