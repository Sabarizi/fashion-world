"use client";
import React from "react";
import Link from "next/link";

// SVG Icons for Social Media
const FacebookIcon = () => (
  <svg
    className="w-6 h-6 text-white hover:text-blue-500 transition-colors duration-200"
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.325v21.351C0 23.403.597 24 1.325 
      24h11.495v-9.294H9.691v-3.622h3.129V8.413c0-3.1 1.893-4.788 
      4.659-4.788 1.325 0 2.464.099 2.795.143v3.24l-1.918.001c-1.504 
      0-1.796.715-1.796 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.403 
      24 24 23.403 24 22.675V1.325C24 .597 23.403 0 22.675 0z" />
  </svg>
);

const InstagramIcon = () => (
  <svg
    className="w-6 h-6 text-white hover:text-pink-500 transition-colors duration-200"
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 
      2.633.333 3.608 1.308.975.975 1.246 
      2.242 1.308 3.608.058 1.266.069 1.646.069 
      4.85s-.012 3.584-.07 4.85c-.062 1.366-.333 
      2.633-1.308 3.608-.975.975-2.242 
      1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.333-3.608-1.308-.975-.975-1.246-2.242-1.308-3.608C2.175 
      15.747 2.163 15.367 2.163 12s.012-3.584.07-4.85c.062-1.366.333-2.633 
      1.308-3.608.975-.975 2.242-1.246 3.608-1.308C8.416 
      2.175 8.796 2.163 12 2.163zm0-2.163C8.741 
      0 8.332.013 7.052.072 5.771.131 4.597.37 
      3.678 1.289 2.759 2.208 2.52 3.382 
      2.461 4.663 2.402 5.943 2.389 6.352 
      2.389 12s.013 6.057.072 7.337c.059 1.281.298 
      2.455 1.217 3.374.919.919 2.093 1.158 
      3.374 1.217 1.28.059 1.689.072 
      7.337.072s6.057-.013 7.337-.072c1.281-.059 
      2.455-.298 3.374-1.217.919-.919 
      1.158-2.093 1.217-3.374.059-1.28.072-1.689.072-7.337s-.013-6.057-.072-7.337c-.059-1.281-.298-2.455-1.217-3.374-.919-.919-2.093-1.158-3.374-1.217C18.057.013 
      17.648 0 12 0zm0 5.838a6.162 6.162 0 
      100 12.324 6.162 6.162 0 000-12.324zm0 
      10.162a3.999 3.999 0 110-7.998 3.999 
      3.999 0 010 7.998zm6.406-11.845a1.44 
      1.44 0 11-2.88 0 1.44 1.44 0 012.88 
      0z" />
  </svg>
);

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4">
        {/* Navigation Links */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-semibold mb-2">
              Crafted Fusion <br /> Designs that define you
            </h2>
            <p className="text-gray-400">
              Your one-stop shop for trendy t-shirts!
            </p>
          </div>
          <div className="flex space-x-6">
            <Link
              href="/faq"
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              FAQ
            </Link>
            <Link
              href="/hero"
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              About
            </Link>
            <Link
              href="/Contact"
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              Contact
            </Link>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-blue-700 mb-6" />

        {/* Social Media and Contact Info */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Social Media Links */}
          <div className="flex space-x-6 mb-4 md:mb-0">
            <a
              href="https://www.facebook.com/share/14i2Mx8L88/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FacebookIcon />
            </a>
            <a
              href="https://www.instagram.com/craftedfusionofficial?igsh=NzY5N3oyeW1hdDVr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <InstagramIcon />
            </a>
          </div>

          {/* Contact Information */}
          <div className="text-center md:text-right">
            <p className="text-gray-400">
              📧 Email:{" "}
              {/* Use a Gmail compose link instead of mailto */}
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=crafted.fusion.official@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors duration-200"
              >
                crafted.fusion.official@gmail.com
              </a>
            </p>
            <p className="text-gray-400">
              📞 Phone:{" "}
              <a
                href="tel:+1234567890"
                className="hover:text-white transition-colors duration-200"
              >
                +1 (204) 333-4556
              </a>
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 text-center text-gray-500">
          &copy; {new Date().getFullYear()} Crafted Fusion. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
