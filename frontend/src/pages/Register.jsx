import React, { useState } from "react";
import axios from "axios";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/signup",
        {
          firstName,
          lastName,
          email,
          password,
        }
      );
      console.log(response.data.message);
      toast.success(response.data.message);
      // alert(response.data.message)
      navigate("/login");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message[0]);
        setErrorMessage(error.response.data.errors || "Signup failed");
      }
    }
  };
  return (
    <div className="min-h-screen flex justify-center items-center ">
      <div className="border border-slate-600 shadow-xl rounded-md p-4">
        <div>
          <h4 className="text-xl font-bold text-white w-96 font-poppins text-center py-3">
            Welcome to <span className="text-yellow-300">CourseHaven</span>
          </h4>
          <p className="text-slate-500 text-center">Just signup To Join Us!</p>
        </div>
        <form action="" onSubmit={handleSubmit}>
          <div className="mt-2 md:mt-4">
            <div className="flex flex-col space-y-2 my-1">
              <label htmlFor="firstName" className="text-slate-400">
                FirstName
              </label>
              <input
                type="text"
                id="firstname"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                placeholder="Type Your Name"
                className="bg-transparent border p-1 text-slate-400 border-slate-700 rounded-sm  focus:outline-none"
              />
            </div>
            <div className="flex flex-col space-y-2 my-1">
              <label htmlFor="lastname" className="text-slate-400">
                LastName
              </label>
              <input
                type="text"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                id="lastname"
                placeholder="Type Your Name"
                className="bg-transparent border p-1 text-slate-400 border-slate-700 rounded-sm  focus:outline-none"
              />
            </div>
            <div className="flex flex-col space-y-2 my-1">
              <label htmlFor="email" className="text-slate-400">
                Email
              </label>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                id="email"
                placeholder="name@gmail.com"
                className="bg-transparent border p-1 text-slate-400 border-slate-700 rounded-sm  focus:outline-none"
              />
            </div>
            <div className="flex flex-col relative space-y-2 my-1">
              <label htmlFor="password" className="text-slate-400">
                Password
              </label>
              <input
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                value={password}
                placeholder="*****"
                className="bg-transparent border text-slate-400 p-1  border-slate-700 rounded-sm  focus:outline-none"
              />
              <span className="absolute bottom-2 right-5">
                <FaEye className="text-white" />
              </span>
            </div>
            <div className="my-3">
              <button className="bg-orange-600 text-white rounded-md py-2 w-full">
                Signup
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
