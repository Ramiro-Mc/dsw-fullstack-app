import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./HeaderAndFooter/Header";
import Footer from "./HeaderAndFooter/Footer";

function Layout() {
  return (
    <>
      <Header />
      <Outlet /> {/* Aquí se renderizan las páginas */}
      <Footer />
    </>
  );
}

export default Layout;
