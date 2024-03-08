import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Layout from "../components/Layout";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("phone", phone);
      formData.append("address", address);
      formData.append("profilePicture", profilePicture);

      const res = await axios.post(`/api/v1/auth/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const handleFileChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  return (
    <Layout>
      <div className="bg-blue-950 relative flex min-h-screen">
        <div className="hidden lg:flex justify-start lg:w-1/2 ">
          <img
            className="object-cover w-full h-screen"
            src="images/img4.jpg"
            alt="img"
          />
        </div>
        <div className="ml-20 w-full max-w-lg p-6 rounded-md shadow-lg bg-blue-950">
          <h1 className="text-4xl text-white font-bold mb-5 text-center">
            Create Account
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="mb-4 flex">
              <label
                htmlFor="exampleInputProfilePicture"
                className="block text-white font-medium mb-2"
              >
                Profile (Optional) 
              </label>
              <div className="flex">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="border p-3 lg:w-2/3 ml-2 rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
            <div className="mb-2">
              <label
                htmlFor="exampleInputName"
                className="block text-white font-medium mb-2"
              >
                Name
              </label>
              <div className="flex">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border p-3 w-full rounded-md focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <div className="mb-2">
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
                  className="border p-3 w-full rounded-md focus:outline-none focus:border-blue-500"
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
                  className="border p-3 w-full rounded-md focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="exampleInputPhone"
                className="block text-white font-medium mb-2"
              >
                Phone
              </label>
              <div className="flex">
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="border p-3 w-full rounded-md focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="exampleInputPhone"
                className="block text-white font-medium mb-2"
              >
                Address
              </label>
              <div className="flex">
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="border p-3 w-full rounded-md focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="bg-blue-900 text-white py-3 px-6 rounded-md hover:bg-blue-800 focus:outline-none"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
