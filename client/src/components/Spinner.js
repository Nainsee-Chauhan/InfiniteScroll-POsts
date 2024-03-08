import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Spinner = () => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);
    count === 0 && navigate("/", { state: location.pathname });
    return () => clearInterval(interval);
  }, [count, navigate, location]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-white">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        Redirecting in {count} seconds...
      </h1>
      <div className="w-20 h-20 border-t-4 border-blue-500 border-t-blue-500 rounded-full animate-spin"></div>
      <p className="text-gray-600 mt-4">Sit back and relax!</p>
    </div>
  );
};

export default Spinner;
