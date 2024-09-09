import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SunIcon from "../assets/SunIcon.jsx";
import MoonIcon from "../assets/MoonIcon.jsx";
import MenuIcon from "../assets/MenuIcon.jsx";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  useEffect(() => {
    const darkModePreference = localStorage.getItem("dark-mode") === "true";
    setIsDarkMode(darkModePreference);
    if (darkModePreference) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("dark-mode", isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <nav className="bg-emerald-600 p-4 shadow-md dark:bg-gray-900">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/manage"
          className="text-white text-xl font-bold transition hover:scale-105 duration-100"
        >
          My App
        </Link>
        <div className="hidden md:flex space-x-4">
          <Link
            to="/manage"
            className="text-white hover:text-emerald-300 transition"
          >
            Manage Products
          </Link>
          <Link
            to="/create"
            className="text-white hover:text-emerald-300 transition"
          >
            Create Product
          </Link>
          <button
            onClick={handleLogout}
            className="text-white hover:text-emerald-300 transition"
          >
            Logout
          </button>
          <button
            onClick={toggleDarkMode}
            className="text-white hover:text-emerald-300 transition flex items-center"
          >
            {isDarkMode ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
        {/* Hamburger Menu for Mobile */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <MenuIcon />
        </button>
      </div>
      {/* Mobile Menu */}
      <div className={`${isOpen ? "block" : "hidden"} md:hidden`}>
        <div className="flex flex-col justify-center items-center space-y-2 p-4">
          <Link
            to="/manage"
            className="text-white hover:text-emerald-300 transition"
          >
            Manage Products
          </Link>
          <Link
            to="/create"
            className="text-white hover:text-emerald-300 transition"
          >
            Create Product
          </Link>
          <button
            onClick={handleLogout}
            className="text-white hover:text-emerald-300 transition"
          >
            Logout
          </button>
          <button
            onClick={toggleDarkMode}
            className="text-white hover:text-emerald-300 transition flex items-center"
          >
            {isDarkMode ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
