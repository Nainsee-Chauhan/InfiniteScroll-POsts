import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Layout from "../components/Layout";
import { useAuth } from "../context/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isTermsAccepted) {
      toast.error("Please accept the terms and conditions.");
      return;
    }

    try {
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
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
          <h1 className="text-3xl font-semibold mb-5 text-center">Login</h1>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="exampleInputEmail"
                className="block text-gray-600 font-medium mb-2"
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
                className="block text-gray-600 font-medium mb-2"
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
              <label htmlFor="termsCheckbox" className="text-gray-600">
                I accept the terms and conditions
              </label>
            </div>

            <button
              type="submit"
              disabled={!isTermsAccepted}
              className={`${
                isTermsAccepted ? "bg-blue-900 hover:bg-blue-800" : "bg-gray-400 cursor-not-allowed"
              } text-white py-3 px-6 rounded-md focus:outline-none`}
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
