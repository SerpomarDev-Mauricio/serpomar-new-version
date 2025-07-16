import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/hooks"; // Assuming authHooks is in '../contexts'

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-backgroundDark p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or Site Title */}
        <Link to="/" className="text-textLight text-2xl font-heading font-bold">
          My App
        </Link>

        {/* Navigation Links */}
        <div className="space-x-6">
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="text-textLight hover:text-primary transition-colors duration-200"
              >
                Dashboard
              </Link>
              <Link
                to="/profile"
                className="text-textLight hover:text-primary transition-colors duration-200"
              >
                Profile
              </Link>
              <button
                onClick={logout}
                className="px-4 py-2 bg-danger text-textLight rounded-full hover:bg-red-700 transition-colors duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/auth"
              className="px-4 py-2 bg-primary text-textLight rounded-full hover:bg-green-700 transition-colors duration-200"
            >
              Login / Signup
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
