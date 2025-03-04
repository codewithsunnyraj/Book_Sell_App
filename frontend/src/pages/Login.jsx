import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/login",
        { email, password }
      );
      console.log(response.data.message);
      toast.success(response.data.message);
      // alert(response.data.message);
      navigate("/");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
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
          <p className="text-slate-500 text-center">
            Login in to access paid content!
          </p>
        </div>
        <form action="" onSubmit={submitHandler}>
          <div className="mt-2 md:mt-4">
            <div className="flex flex-col space-y-2 my-1">
              <label htmlFor="" className="text-slate-400">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                placeholder="name@gmail.com"
                className="bg-transparent border p-1 text-slate-400 border-slate-700 rounded-sm  focus:outline-none"
              />
            </div>
            <div className="flex flex-col space-y-2 my-1">
              <label htmlFor="" className="text-slate-400">
                Password
              </label>
              <input
                type="password"
                value={password}
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                placeholder="*****"
                className="bg-transparent border text-slate-400 p-1 border-slate-700 rounded-sm  focus:outline-none"
              />
            </div>
            <div className="my-3">
              <button
                type="submit"
                name="submit"
                className="bg-orange-600 text-white rounded-md py-2 w-full"
              >
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
