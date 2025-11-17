import React from "react";
import Logo from "../../../components/Logo/Logo";
import { FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-white border-t shadow-inner mt-10">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Logo + About */}
        <div>
          <Logo />
          <p className="mt-4 text-gray-600 leading-relaxed">
            Delivering reliable, fast and secure services across all 64 districts of Bangladesh.
          </p>
          <p className="mt-2 text-gray-500 text-sm">
            © {new Date().getFullYear()} — All Rights Reserved.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li className="hover:text-[#03373D] cursor-pointer transition">Coverage</li>
            <li className="hover:text-[#03373D] cursor-pointer transition">Tracking</li>
            <li className="hover:text-[#03373D] cursor-pointer transition">Support</li>
            <li className="hover:text-[#03373D] cursor-pointer transition">Privacy Policy</li>
          </ul>
        </div>

        {/* Social Icons */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Follow Us</h3>
          <div className="flex items-center gap-4">

            {/* Twitter */}
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 transition hover:bg-[#CAEB66]/20"
            >
              <FaTwitter className="text-gray-600 text-xl hover:text-[#03373D] transition" />
            </a>

            {/* YouTube */}
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 transition hover:bg-[#CAEB66]/20"
            >
              <FaYoutube className="text-gray-600 text-xl hover:text-red-600 transition" />
            </a>

            {/* Facebook */}
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 transition hover:bg-[#CAEB66]/20"
            >
              <FaFacebookF className="text-gray-600 text-xl hover:text-[#03373D] transition" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t bg-gray-50 py-4 text-center text-sm text-gray-500">
        Designed with ❤️ — Powered by Your Business
      </div>
    </footer>
  );
};

export default Footer;
