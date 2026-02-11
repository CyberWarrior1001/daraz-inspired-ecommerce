import React from "react";
import Navbar from "./components/custom_components/Navbar";
import FooterGrid from "./components/custom_components/FooterGrid";
import BackToTop from "./components/custom_components/BackToTop";
import { Toaster } from "./components/ui/sonner";
import { Outlet } from "react-router-dom";


function Layout() {
  
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Toaster />
      <div className="mt-10 m-10">
        <FooterGrid />
      </div>
      <div className="fixed bottom-6 right-6">
        <BackToTop />
      </div>
    </div>
  );
}

export default Layout;
