import React from "react";
import { Toaster } from 'react-hot-toast';
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main style={{ minHeight: "80vh" }}> <Toaster/>{children}</main>
      <Footer/>
    </div>
  );
};

export default Layout;