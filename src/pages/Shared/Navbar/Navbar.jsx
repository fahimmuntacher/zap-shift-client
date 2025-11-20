import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import { FiArrowUpRight } from "react-icons/fi";
import Logo from "../../../components/Logo/Logo";
import useAuth from "../../../Hooks/useAuth";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, signOutUser } = useAuth();
  const handleSignOut = () => {
    signOutUser().then((res) => {
      console.log(res);
      alert("sign out successfull");
    });
  };

  const linkClasses = ({ isActive }) =>
    `px-3 py-2 font-medium transition ${
      isActive ? "bg-[#CAEB66] rounded-3xl text-black font-semibold" : "bg-white rounded-3xl text-gray-600 hover:text-black"
    }`;

  const links = (
    <>
      
      <NavLink to="/send-parcel" className={linkClasses}>
        Send Parcel
      </NavLink>
      <NavLink to="/coverage" className={linkClasses}>
        Coverage
      </NavLink>
      <NavLink to="/about" className={linkClasses}>
        About Us
      </NavLink>
      <NavLink to="/pricing" className={linkClasses}>
        Pricing
      </NavLink>
      {
        user && <NavLink to="/dahsboard" className={linkClasses}>
        Dashboard
      </NavLink>
      }
    </>
  );
  return (
    <div className="w-full bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto navbar px-4 relative">
        {/* Left */}
        <div className="navbar-start flex items-center gap-2">
          {/* Mobile Hamburger */}
          <button
            className="btn btn-ghost p-2 lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-8 6h8"
              />
            </svg>
          </button>

          {/* Logo */}
          <Link to="/">
            <Logo />
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="navbar-center hidden lg:flex">
          <div className="flex items-center gap-8">{links}</div>
        </div>

        {/* Desktop Right */}
        <div className="navbar-end hidden lg:flex gap-3">
          {user ? (
            <button
              onClick={handleSignOut}
              className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition cursor-pointer"
            >
              Sign Out
            </button>
          ) : (
            <>
              <NavLink
                to="/login"
                className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
              >
                Sign In
              </NavLink>
            </>
          )}

          <NavLink
            to="/be-rider"
            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-[#D5F36A] text-black font-semibold hover:bg-[#c4e65c] transition"
          >
            Be a rider
            <div className="bg-black text-white p-1.5 rounded-full">
              <FiArrowUpRight size={16} />
            </div>
          </NavLink>
        </div>

        {/* MOBILE MENU*/}
        {menuOpen && (
          <div className="absolute left-0 top-full w-full bg-white shadow-lg p-4 rounded-b-xl lg:hidden z-50">
            <div className="flex flex-col gap-3">
              {links}
              {user ? (
                <button
                  onClick={handleSignOut}
                  className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition cursor-pointer"
                >
                  Sign Out
                </button>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                  >
                    Sign In
                  </NavLink>
                </>
              )}

              <NavLink
                to="/be-rider"
                className="flex items-center justify-center gap-2 px-5 py-2 rounded-lg bg-[#D5F36A] text-black font-semibold hover:bg-[#c4e65c] transition">
                Be a rider
                <div className="bg-black text-white p-1.5 rounded-full">
                  <FiArrowUpRight size={16} />
                </div>
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
