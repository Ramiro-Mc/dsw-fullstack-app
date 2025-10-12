import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./HeaderAndFooter/Header";
import Footer from "./HeaderAndFooter/Footer";

function Layout() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenFromGoogle = params.get("token");
    if (tokenFromGoogle) {
      localStorage.setItem("token", tokenFromGoogle);
      setToken(tokenFromGoogle); // Actualiza el estado
      window.history.replaceState({}, document.title, "/");
    }
  }, []);

  return (
    <>
      <Header token={token} />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
