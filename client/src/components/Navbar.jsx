import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  return (
    <nav className="bg-emerald-600 p-4 shadow-md">
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
        </div>
        {/* Hamburger Menu for Mobile */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
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
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
      {/* Mobile Menu */}
      <div className={`${isOpen ? "block" : "hidden"} md:hidden`}>
        <div className="flex flex-col space-y-2 p-4">
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
