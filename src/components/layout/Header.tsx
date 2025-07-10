import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  User,
  ShoppingCart,
  Phone,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { siteConfig } from "@/config/site";
import ServicesDropdown from "./ServicesDropdown";

const Header = () => {
  const { user, signOut } = useAuth();
  const { totalItems } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  const handleCallNow = () => {
    window.open(`tel:${siteConfig.contactPhone}`, "_self");
  };

  const closeDropdown = () => {
    setIsServicesDropdownOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-slate-900/95 via-purple-900/95 to-rose-900/95 backdrop-blur-xl border-b border-purple-400/30 shadow-2xl shadow-purple-500/25">
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-rose-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/50 group-hover:shadow-purple-500/75 transition-all duration-300 transform group-hover:scale-110">
              <span className="text-white font-bold text-lg">OA</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-white via-purple-100 to-rose-100 bg-clip-text text-transparent">
              {siteConfig.name}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-200 hover:text-white transition-all duration-300 font-medium hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-rose-500/20 px-4 py-2 rounded-lg backdrop-blur-sm"
            >
              Home
            </Link>

            <div
              className="relative"
              onMouseEnter={() => setIsServicesDropdownOpen(true)}
              onMouseLeave={() => setIsServicesDropdownOpen(false)}
            >
              <button className="flex items-center gap-2 text-gray-200 hover:text-white transition-all duration-300 font-medium hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-rose-500/20 px-4 py-2 rounded-lg backdrop-blur-sm">
                Services
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-300 ${
                    isServicesDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <ServicesDropdown
                isOpen={isServicesDropdownOpen}
                onClose={closeDropdown}
              />
            </div>

            <Link
              to="/about"
              className="text-gray-200 hover:text-white transition-all duration-300 font-medium hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-rose-500/20 px-4 py-2 rounded-lg backdrop-blur-sm"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-gray-200 hover:text-white transition-all duration-300 font-medium hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-rose-500/20 px-4 py-2 rounded-lg backdrop-blur-sm"
            >
              Contact
            </Link>
            <Link
              to="/membership"
              className="text-gray-200 hover:text-white transition-all duration-300 font-medium hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-rose-500/20 px-4 py-2 rounded-lg backdrop-blur-sm"
            >
              Membership
            </Link>
            <Link
              to="/partner"
              className="text-gray-200 hover:text-white transition-all duration-300 font-medium hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-rose-500/20 px-4 py-2 rounded-lg backdrop-blur-sm"
            >
              Partner With Us
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link to="/cart" className="relative group">
              <Button
                variant="ghost"
                size="icon"
                className="relative bg-black/20 backdrop-blur-md border border-purple-400/30 hover:bg-purple-500/20 hover:border-purple-400/60 transition-all duration-300 text-white hover:text-white"
              >
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-500 to-rose-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg shadow-purple-500/50">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="flex items-center space-x-3">
                <Link to="/profile">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-black/20 backdrop-blur-md border border-purple-400/30 hover:bg-purple-500/20 hover:border-purple-400/60 transition-all duration-300 text-white hover:text-white"
                  >
                    <User className="w-5 h-5" />
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-gray-200 hover:text-white hover:bg-purple-500/20 transition-all duration-300 font-medium"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/auth/login">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-200 hover:text-white hover:bg-purple-500/20 transition-all duration-300 font-medium"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/auth/register">
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-purple-600 to-rose-600 hover:from-purple-700 hover:to-rose-700 text-white px-6 py-2 font-semibold shadow-lg shadow-purple-500/25 hover:shadow-purple-500/50 transition-all duration-300 transform hover:-translate-y-1 border border-purple-400/30"
                  >
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}

            {/* Call Button with Phone Number */}
            <Button
              variant="outline"
              size="sm"
              className="hidden sm:flex items-center gap-2 border-purple-400/50 bg-black/20 backdrop-blur-md text-white hover:bg-purple-500/20 hover:border-purple-400 hover:shadow-purple-500/25 font-medium transition-all duration-300"
              onClick={handleCallNow}
            >
              <Phone className="w-4 h-4" />
              <span className="font-semibold">{siteConfig.contactPhone}</span>
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden bg-black/20 backdrop-blur-md border border-purple-400/30 hover:bg-purple-500/20 hover:border-purple-400/60 transition-all duration-300 text-white hover:text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-6 border-t border-purple-400/30 bg-gradient-to-b from-slate-900/95 to-purple-900/95 backdrop-blur-xl">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-gray-200 hover:text-white transition-all duration-300 font-medium hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-rose-500/20 px-4 py-3 rounded-lg backdrop-blur-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/services"
                className="text-gray-200 hover:text-white transition-all duration-300 font-medium hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-rose-500/20 px-4 py-3 rounded-lg backdrop-blur-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                to="/about"
                className="text-gray-200 hover:text-white transition-all duration-300 font-medium hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-rose-500/20 px-4 py-3 rounded-lg backdrop-blur-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-gray-200 hover:text-white transition-all duration-300 font-medium hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-rose-500/20 px-4 py-3 rounded-lg backdrop-blur-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                to="/membership"
                className="text-gray-200 hover:text-white transition-all duration-300 font-medium hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-rose-500/20 px-4 py-3 rounded-lg backdrop-blur-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Membership
              </Link>
              <Link
                to="/partner"
                className="text-gray-200 hover:text-white transition-all duration-300 font-medium hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-rose-500/20 px-4 py-3 rounded-lg backdrop-blur-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Partner With Us
              </Link>

              {/* Mobile Call Button */}
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-center items-center gap-2 border-purple-400/50 bg-black/20 backdrop-blur-md text-white hover:bg-purple-500/20 hover:border-purple-400 hover:shadow-purple-500/25 transition-all duration-300 mt-4"
                onClick={() => {
                  handleCallNow();
                  setIsMobileMenuOpen(false);
                }}
              >
                <Phone className="w-4 h-4" />
                {siteConfig.contactPhone}
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
