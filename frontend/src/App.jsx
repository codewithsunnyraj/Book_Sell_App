import React from "react";
import {  Route, Routes } from "react-router-dom";
import Navbar from "./component/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/register";
import Footer from "./component/Footer";
import { Toaster } from 'react-hot-toast';
const App = () => {
  return (
    <div className="bg-black min-h-screen px-6 md:px-10 lg:px-20 py-3 md:py-4 ">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />
      </Routes>
      <Toaster />
      <Footer/>
    </div>
  );
};

export default App;
