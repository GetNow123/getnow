import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import {
  ShoppingCart,
  User,
  Menu,
  X,
  ChevronDown,
  LayoutDashboard,
} from "lucide-react";
import ServicesMegaMenu from "./ServicesMegaMenu";
import { siteConfig } from "@/config/site";

const DynamicHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, signOut, isAdmin } = useAuth();
  const { totalItems } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    setIsMenuOpen(false);
  };

  const toggleServicesDropdown = () => {
    setIsServicesDropdownOpen(!isServicesDropdownOpen);
  };

  const closeDropdown = () => {
    setIsServicesDropdownOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white shadow-md border-b border-gray-200"
            : "bg-white"
        }`}
      >
        <nav className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              to={isAdmin ? "/admin/dashboard" : "/"}
              className="flex items-center space-x-3 group"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-rose-600 rounded-xl flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-lg">O</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">
                {siteConfig.name}
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <Link
                to={isAdmin ? "/admin/dashboard" : "/"}
                className={`font-medium transition-all duration-200 hover:text-purple-700 px-2 py-1 ${
                  isActive(isAdmin ? "/admin/dashboard" : "/")
                    ? "text-purple-700 underline underline-offset-4"
                    : "text-gray-900"
                }`}
              >
                {isAdmin ? "Dashboard" : "Home"}
              </Link>

              {!isAdmin && (
                <>
                  <div className="relative">
                    <button
                      onClick={toggleServicesDropdown}
                      className={`flex items-center gap-2 font-medium transition-all duration-200 hover:text-purple-700 px-2 py-1 ${
                        location.pathname.startsWith("/services")
                          ? "text-purple-700 underline underline-offset-4"
                          : "text-gray-900"
                      }`}
                    >
                      Services
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${
                          isServicesDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>

                  <Link
                    to="/membership"
                    className={`font-medium transition-all duration-200 hover:text-purple-700 px-2 py-1 ${
                      isActive("/membership")
                        ? "text-purple-700 underline underline-offset-4"
                        : "text-gray-900"
                    }`}
                  >
                    Membership
                  </Link>

                  <Link
                    to="/partner"
                    className={`font-medium transition-all duration-200 hover:text-purple-700 px-2 py-1 ${
                      isActive("/partner")
                        ? "text-purple-700 underline underline-offset-4"
                        : "text-gray-900"
                    }`}
                  >
                    Partner With Us
                  </Link>
                </>
              )}

              {isAdmin && (
                <>
                  <Link
                    to="/admin/categories"
                    className={`font-medium transition-all duration-200 hover:text-purple-700 px-2 py-1 ${
                      isActive("/admin/categories")
                        ? "text-purple-700 underline underline-offset-4"
                        : "text-gray-900"
                    }`}
                  >
                    Categories
                  </Link>
                  <Link
                    to="/admin/services"
                    className={`font-medium transition-all duration-200 hover:text-purple-700 px-2 py-1 ${
                      isActive("/admin/services")
                        ? "text-purple-700 underline underline-offset-4"
                        : "text-gray-900"
                    }`}
                  >
                    Services
                  </Link>
                  <Link
                    to="/admin/users"
                    className={`font-medium transition-all duration-200 hover:text-purple-700 px-2 py-1 ${
                      isActive("/admin/users")
                        ? "text-purple-700 underline underline-offset-4"
                        : "text-gray-900"
                    }`}
                  >
                    Users
                  </Link>
                  <Link
                    to="/admin/orders"
                    className={`font-medium transition-all duration-200 hover:text-purple-700 px-2 py-1 ${
                      isActive("/admin/orders")
                        ? "text-purple-700 underline underline-offset-4"
                        : "text-gray-900"
                    }`}
                  >
                    Orders
                  </Link>
                  <Link
                    to="/admin/contacts"
                    className={`font-medium transition-all duration-200 hover:text-purple-700 px-2 py-1 ${
                      isActive("/admin/contacts")
                        ? "text-purple-700 underline underline-offset-4"
                        : "text-gray-900"
                    }`}
                  >
                    Contacts
                  </Link>
                </>
              )}

              <Link
                to="/about"
                className={`font-medium transition-all duration-200 hover:text-purple-700 px-2 py-1 ${
                  isActive("/about")
                    ? "text-purple-700 underline underline-offset-4"
                    : "text-gray-900"
                }`}
              >
                About
              </Link>

              <Link
                to="/contact"
                className={`font-medium transition-all duration-200 hover:text-purple-700 px-2 py-1 ${
                  isActive("/contact")
                    ? "text-purple-700 underline underline-offset-4"
                    : "text-gray-900"
                }`}
              >
                Contact
              </Link>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Cart */}
              {!isAdmin && (
                <Link to="/cart" className="relative group">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative text-gray-700 hover:text-purple-700"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    {totalItems > 0 && (
                      <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                        {totalItems}
                      </span>
                    )}
                  </Button>
                </Link>
              )}

              {/* User Menu */}
              {user ? (
                <div className="flex items-center space-x-3">
                  <Link to={isAdmin ? "/admin/dashboard" : "/profile"}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-700 hover:text-purple-700"
                    >
                      {isAdmin ? (
                        <LayoutDashboard className="w-5 h-5" />
                      ) : (
                        <User className="w-5 h-5" />
                      )}
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSignOut}
                    className="text-gray-700 hover:text-purple-700 font-medium"
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
                      className="text-gray-700 hover:text-purple-700 font-medium"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link to="/auth/register">
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-purple-600 to-rose-600 hover:from-purple-700 hover:to-rose-700 text-white px-6 py-2 font-semibold shadow-md"
                    >
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-gray-700 hover:text-purple-700"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden py-6 border-t border-gray-200 bg-white">
              <div className="flex flex-col space-y-4">
                <Link
                  to={isAdmin ? "/admin/dashboard" : "/"}
                  className={`font-medium transition-all duration-200 hover:text-purple-700 px-2 py-2 rounded ${
                    isActive(isAdmin ? "/admin/dashboard" : "/")
                      ? "text-purple-700 underline underline-offset-4"
                      : "text-gray-900"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {isAdmin ? "Dashboard" : "Home"}
                </Link>

                {!isAdmin && (
                  <>
                    <Link
                      to="/services"
                      className={`font-medium transition-all duration-200 hover:text-purple-700 px-2 py-2 rounded ${
                        location.pathname.startsWith("/services")
                          ? "text-purple-700 underline underline-offset-4"
                          : "text-gray-900"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Services
                    </Link>
                    <Link
                      to="/membership"
                      className={`font-medium transition-all duration-200 hover:text-purple-700 px-2 py-2 rounded ${
                        isActive("/membership")
                          ? "text-purple-700 underline underline-offset-4"
                          : "text-gray-900"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Membership
                    </Link>
                    <Link
                      to="/partner"
                      className={`font-medium transition-all duration-200 hover:text-purple-700 px-2 py-2 rounded ${
                        isActive("/partner")
                          ? "text-purple-700 underline underline-offset-4"
                          : "text-gray-900"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Partner With Us
                    </Link>
                  </>
                )}

                {isAdmin && (
                  <>
                    <Link
                      to="/admin/categories"
                      className={`font-medium transition-all duration-200 hover:text-purple-700 px-2 py-2 rounded ${
                        isActive("/admin/categories")
                          ? "text-purple-700 underline underline-offset-4"
                          : "text-gray-900"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Categories
                    </Link>
                    <Link
                      to="/admin/services"
                      className={`font-medium transition-all duration-200 hover:text-purple-700 px-2 py-2 rounded ${
                        isActive("/admin/services")
                          ? "text-purple-700 underline underline-offset-4"
                          : "text-gray-900"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Services
                    </Link>
                    <Link
                      to="/admin/users"
                      className={`font-medium transition-all duration-200 hover:text-purple-700 px-2 py-2 rounded ${
                        isActive("/admin/users")
                          ? "text-purple-700 underline underline-offset-4"
                          : "text-gray-900"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Users
                    </Link>
                    <Link
                      to="/admin/orders"
                      className={`font-medium transition-all duration-200 hover:text-purple-700 px-2 py-2 rounded ${
                        isActive("/admin/orders")
                          ? "text-purple-700 underline underline-offset-4"
                          : "text-gray-900"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Orders
                    </Link>
                    <Link
                      to="/admin/contacts"
                      className={`font-medium transition-all duration-200 hover:text-purple-700 px-2 py-2 rounded ${
                        isActive("/admin/contacts")
                          ? "text-purple-700 underline underline-offset-4"
                          : "text-gray-900"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Contacts
                    </Link>
                  </>
                )}

                <Link
                  to="/about"
                  className={`font-medium transition-all duration-200 hover:text-purple-700 px-2 py-2 rounded ${
                    isActive("/about")
                      ? "text-purple-700 underline underline-offset-4"
                      : "text-gray-900"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  to="/contact"
                  className={`font-medium transition-all duration-200 hover:text-purple-700 px-2 py-2 rounded ${
                    isActive("/contact")
                      ? "text-purple-700 underline underline-offset-4"
                      : "text-gray-900"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
                <div className="flex items-center space-x-3 pt-2">
                  {user ? (
                    <>
                      <Link
                        to={isAdmin ? "/admin/dashboard" : "/profile"}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-gray-700 hover:text-purple-700"
                        >
                          {isAdmin ? (
                            <LayoutDashboard className="w-5 h-5" />
                          ) : (
                            <User className="w-5 h-5" />
                          )}
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleSignOut}
                        className="text-gray-700 hover:text-purple-700 font-medium"
                      >
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/auth/login"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-700 hover:text-purple-700 font-medium"
                        >
                          Login
                        </Button>
                      </Link>
                      <Link
                        to="/auth/register"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-purple-600 to-rose-600 hover:from-purple-700 hover:to-rose-700 text-white px-6 py-2 font-semibold shadow-md"
                        >
                          Sign Up
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Services Mega Menu */}
      {isServicesDropdownOpen && !isAdmin && (
        <ServicesMegaMenu
          isOpen={isServicesDropdownOpen}
          onClose={closeDropdown}
        />
      )}
    </>
  );
};

export default DynamicHeader;
