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
      setToken(tokenFromGoogle); 
      window.history.replaceState({}, document.title, "/");
    }
  }, []);

  return (
    <div className="app">
      <Header token={token} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
