import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext.js";


const Header = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { token, logout, user } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    alert("Logged Out!")
    navigate("/login");
  }


  return (
    <header className="sticky top-0 z-50 border-b border-gray-200/50 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="https://www.svgrepo.com/show/448244/pack.svg"
            alt="Logo"
            className="h-10 w-10"
          />
          <span className="text-xl font-bold text-gray-800">
            AuthApp
          </span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden items-center gap-8 md:flex">
          <li>
            <Link
              to="/users"
              className="font-medium text-gray-600 transition hover:text-indigo-600"
            >
              Users
            </Link>
          </li>

          <li>
            <Link
              to="/profile"
              className="font-medium text-gray-600 transition hover:text-indigo-600"
            >
              Profile
            </Link>
          </li>
        </ul>

        {/* Desktop Buttons */}
        {token ? (
          <div className="hidden md:flex items-center gap-3 rounded-full border border-gray-200 bg-white px-3 py-2 shadow-sm transition hover:shadow-md">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6.75a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a7.5 7.5 0 0115 0"
                />
              </svg>
            </div>

            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-gray-800">
                {user?.fullName || "User"}
              </p>
              <p className="text-xs text-gray-500">
                {user?.email}
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="cursor-pointer rounded-full p-2 text-red-500 transition hover:bg-red-50 hover:text-red-600"
              title="Logout"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M22 12H14m5-3 3 3-3 3"
                />
              </svg>
            </button>
          </div>) : (
          <div className="hidden items-center gap-3 md:flex">
            <Link
              to="/login"
              className="rounded-lg border border-gray-300 px-5 py-2 font-medium transition hover:bg-gray-100"
            >
              Sign In
            </Link>

            <Link
              to="/register"
              className="rounded-lg bg-indigo-600 px-5 py-2 font-medium text-white shadow-lg transition hover:bg-indigo-700"
            >
              Sign Up
            </Link>
          </div>
        )}


        {/* Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="rounded-lg p-2 transition hover:bg-gray-100 md:hidden"
        >
          {open ? (
            <svg
              className="h-7 w-7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-7 w-7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden transition-all duration-300 md:hidden ${open ? "max-h-96 border-t" : "max-h-0"
          }`}
      >
        <div className="space-y-1 bg-white px-5 py-4">
          <Link
            to="/users"
            onClick={() => setOpen(false)}
            className="block rounded-lg px-4 py-3 font-medium text-gray-700 transition hover:bg-gray-100"
          >
            Users
          </Link>

          <Link
            to="/profile"
            onClick={() => setOpen(false)}
            className="block rounded-lg px-4 py-3 font-medium text-gray-700 transition hover:bg-gray-100"
          >
            Profile
          </Link>

          <hr className="my-3" />
          {token ? (
            <div className="flex w-full max-w-md items-center justify-between rounded-xl border border-gray-200 bg-white px-3 py-2 shadow-sm transition hover:shadow-md">

              {/* Left Section */}
              <div className="flex min-w-0 items-center gap-3">
                {/* Avatar */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-indigo-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6.75a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a7.5 7.5 0 0115 0"
                    />
                  </svg>
                </div>

                {/* User Info */}
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-gray-800">
                    {user?.fullName || "User"}
                  </p>

                  <p className="truncate text-xs text-gray-500">
                    {user?.email}
                  </p>
                </div>
              </div>

              {/* Logout */}
              <button
                onClick={handleLogout}
                title="Logout"
                className="ml-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-red-500 transition hover:bg-red-50 hover:text-red-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M22 12H14m5-3 3 3-3 3"
                  />
                </svg>
              </button>

            </div>
          ) : (
            <div>
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="block rounded-lg border px-4 py-3 text-center font-medium transition hover:bg-gray-100"
              >
                Sign In
              </Link>

              <Link
                to="/register"
                onClick={() => setOpen(false)}
                className="mt-3 block rounded-lg bg-indigo-600 px-4 py-3 text-center font-medium text-white transition hover:bg-indigo-700"
              >
                Sign Up
              </Link>
            </div>
          )}

        </div>
      </div>
    </header>
  );
};

export default Header;