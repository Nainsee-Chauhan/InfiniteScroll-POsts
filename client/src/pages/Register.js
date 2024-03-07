import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/v1/auth/register`, {
        name,
        email,
        password,
        phone,
        address,
      });
      if (res  && res.data.success) {
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

  return (
    <Layout>
      <div className="flex justify-center items-center min-h-screen m-2">
        <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
          <h1 className="text-3xl font-semibold mb-5 text-center">Register</h1>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="exampleInputName"
                className="block text-gray-600 font-medium mb-2"
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
                  className="border p-3 w-full rounded-md focus:outline-none focus:border-blue-500"
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
                  className="border p-3 w-full rounded-md focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="exampleInputPhone"
                className="block text-gray-600 font-medium mb-2"
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
                className="block text-gray-600 font-medium mb-2"
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
