import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="p-5">
      <div className="grid lg:grid-cols-3">
        <div>
          <h3 className="text-white text-xl my-2">Logo Here</h3>
          <div>
            <p className="text-white">Follow Us</p>
            <div className="flex my-2 gap-3">
              <FaFacebook className="text-white" />
              <FaInstagram className="text-white" />
              <FaTwitter className="text-white" />
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-white text-xl my-2">Connect Us</h3>
          <div className="space-y-2 flex flex-col">
            <Link to="/" className="text-white">Home</Link>
            <Link to="/login" className="text-white">Login</Link>
            <Link to="/register" className="text-white">Register</Link>
          </div>
        </div>
        <div>
        <h3 className="text-white text-xl my-2">Copyrights &copy; 2025</h3>
          <div className="space-y-2 flex flex-col">
           <p className="text-white">Term & Condition</p>
           <p className="text-white">Term & Condition</p>
           <p className="text-white">Term & Condition</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
