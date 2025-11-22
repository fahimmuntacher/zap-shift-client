import React from "react";
import { Outlet } from "react-router";
import Navbar from "../pages/Shared/Navbar/Navbar";
import Footer from "../pages/Shared/Footer/Footer";

const RootLayout = () => {
  return (
    // Full background wrapper
    <div className="min-h-screen flex flex-col bg-linear-to-br from-[#F7F9FC] via-[#EFF3FF] to-[#EAF1FF] relative">

      {/* Decorative background shapes */}
      <div className="pointer-events-none absolute -top-20 -left-20 w-[350px] h-[350px] rounded-full bg-[#DCE6FF] opacity-40 blur-3xl"></div>
      <div className="pointer-events-none absolute top-40 right-0 w-[300px] h-[300px] rounded-full bg-[#c1d8ff] opacity-30 blur-2xl"></div>

      {/* Sticky Navbar */}
      <header className="sticky top-0 z-50  backdrop-blur-md">
        <div className="max-w-7xl mx-auto py-4 px-4">
          <Navbar />
        </div>
      </header>

      {/* Page Content */}
      <main className="flex-1 w-full">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/90 backdrop-blur-lg border-t shadow-inner">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Footer />
        </div>
      </footer>

    </div>
  );
};

export default RootLayout;
