import React, { useState } from "react";
import { toast, useToaster } from 'react-hot-toast';

import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Layout from "../components/Layout";
import { useAuth } from "../context/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  // const toaster = useToaster();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isTermsAccepted) {
      toast.error("Please accept the terms and conditions.");
      return;
    }
    
    try {
      notify()
      const res = await axios.post(`/api/v1/auth/login`, {
        email,
        password,
      });
      
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/home");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Invalid Credentials");
    }
  };
  const notify = () => {
    toast.success('Email sent...Welcome to MelodyVerse', {
      position: 'top-right', 
    });
  };
  

  return (
    <Layout>
      <div className="relative  flex items-center min-h-screen">
        <div className="hidden lg:flex justify-start lg:w-1/2 ">
          <img
            className="object-cover w-full h-screen"
            src="images/img4.jpg"
            alt="img"
          />
          <div className="absolute text-center top-60 left-40">
            <h1 className="text-5xl mb-3 text-white text-center font-extrabold">
              New Here?
            </h1>
            <Link to="/register">
              <button className="bg-white font-bold border lg:w-1/2 rounded-lg p-1 mt-2">
                Register
              </button>
            </Link>
          </div>
        </div>

        {/* Form Section */}
        <div className="mb-4 lg:ml-20 flex flex-col text-center  max-w-md p-5 bg-blue-950 rounded-md lg:w-1/2">
          <h1 className=" text-5xl font-bold mb-6 text-white text-center">
            Login
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="exampleInputEmail"
                className="block text-white font-medium mb-2"
              >
                Email
              </label>
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border p-3 w-full rounded-md focus:outline-none focus:border-black"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="exampleInputPassword1"
                className="block text-white font-medium mb-2"
              >
                Password
              </label>
              <div className="flex">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border p-3 w-full rounded-md focus:outline-none focus:border-black"
                  required
                />
              </div>
            </div>

            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                id="termsCheckbox"
                checked={isTermsAccepted}
                onChange={() => setIsTermsAccepted(!isTermsAccepted)}
                className="mr-2"
              />
              <label htmlFor="termsCheckbox" className="text-gray-400">
                I accept the terms and conditions.
              </label>
            </div>

            <button
              type="submit"
              disabled={!isTermsAccepted}
              className={`${
                isTermsAccepted
                  ? "bg-blue-900 hover:bg-blue-800"
                  : "bg-gray-600 cursor-not-allowed"
              } text-white py-3 px-6 rounded-md focus:outline-none w-full lg:w-auto`}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
