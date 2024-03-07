import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Spinner = () => {
  const [count, setCount] = useState(5);
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
    <>
      <div className="flex flex-col justify-center items-center min-h-screen">
        <h1 className="text-center">
          Redirecting to you in {count} seconds...
        </h1>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
};

export default Spinner;
