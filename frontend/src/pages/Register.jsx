import React from "react";

const Register = () => {
  return (
    <div className="min-h-screen flex justify-center items-center ">
      <div className="border border-slate-600 shadow-xl rounded-md p-4">
        <div>
          <h4 className="text-xl font-bold text-white w-96 font-poppins text-center py-3">
            Welcome to CourseHaven
          </h4>
          <p className="text-slate-500 text-center">Just signup To Join Us!</p>
        </div>
        <form action="">
          <div className="mt-2 md:mt-4">
            <div className="flex flex-col space-y-2 my-1">
              <label htmlFor="" className="text-slate-400">
                FirstName
              </label>
              <input
                type="text"
                placeholder="Type Your Name"
                className="bg-transparent border p-1 text-slate-400 border-slate-700 rounded-sm  focus:outline-none"
              />
            </div>
            <div className="flex flex-col space-y-2 my-1">
              <label htmlFor="" className="text-slate-400">
                LastName
              </label>
              <input
                type="text"
                placeholder="Type Your Name"
                className="bg-transparent border p-1 text-slate-400 border-slate-700 rounded-sm  focus:outline-none"
              />
            </div>
            <div className="flex flex-col space-y-2 my-1">
              <label htmlFor="" className="text-slate-400">
                Email
              </label>
              <input
                type="email"
                placeholder="name@gmail.com"
                className="bg-transparent border p-1 text-slate-400 border-slate-700 rounded-sm  focus:outline-none"
              />
            </div>
            <div className="flex flex-col space-y-2 my-1">
              <label htmlFor="" className="text-slate-400">
                FirstName
              </label>
              <input
                type="password"
                placeholder="*****"
                className="bg-transparent border text-slate-400 p-1 border-slate-700 rounded-sm  focus:outline-none"
              />
            </div>
            <div className="my-1">
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
