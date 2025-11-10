import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen max-w-[1280px] mx-auto">
      <Navbar></Navbar>
      <div className="flex-1">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Layout;
