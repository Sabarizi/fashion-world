"use client";
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';
import { HiMenu, HiX } from 'react-icons/hi';
import { FaCartShopping } from "react-icons/fa6";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-black text-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center space-x-2">
            <Image src={"/logo.jpg"} alt='logo' height={60} width={60} className='rounded-full object-cover '/>
            <Link href="/" className="text-2xl font-semibold  text-white  hover:text-blue-300">
            
            Crafted Fusion
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center">
            <Link href="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-400">
              Home
            </Link>
            <Link href="/products" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-400">
              Products
            </Link>
            <Link href="/hero" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-400">
              About
            </Link>
            <Link href="/Contact" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-400">
              Contact
            </Link>
            <Link href="/Cart" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-400">
              View Cart
            </Link>
            <Link href="/Cart" className="rounded-md text-sm font-medium hover:bg-gray-400">
               <FaCartShopping />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? (
                <HiX className="h-6 w-6 text-gray-800" />
              ) : (
                <HiMenu className="h-6 w-6 text-gray-800" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-400 shadow">
          <Link href="/" className="block px-4 py-2 text-sm text-gray-800 hover:bg-blue-400">
            Home
          </Link>
          <Link href="/products" className="block px-4 py-2 text-sm text-gray-800 hover:bg-blue-400">
            Products
          </Link>
          <Link href="/hero" className="block px-4 py-2 text-sm text-gray-800 hover:bg-blue-400">
            About
          </Link>
          <Link href="/Contact" className="block px-4 py-2 text-sm text-gray-800 hover:bg-blue-400">
            Contact
          </Link>
          <Link href="/Cart" className="block px-4 py-2 text-sm text-gray-800 hover:bg-blue-400">
            View Cart
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
