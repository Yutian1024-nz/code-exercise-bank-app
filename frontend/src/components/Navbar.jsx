import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { authToken, user, logout } = useAuth();
  const navigate = useNavigate();

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formattedTime = currentTime.toLocaleString("en-NZ", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZoneName: "short",
  });

  return (
    <nav className="bg-[#3B755F] p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-white text-lg font-semibold tracking-wide">
          Bank App Demo
        </h1>
        <div className="space-x-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-4 py-2 transition duration-300 ${
                isActive
                  ? "text-[#A8E6CF] font-bold border-b-2 border-[#A8E6CF]"
                  : "text-[#D4ECDD] hover:text-white hover:border-white border-b-2 border-transparent"
              }`
            }
          >
            Accounts
          </NavLink>
          <NavLink
            to="/transfer"
            className={({ isActive }) =>
              `px-4 py-2 transition duration-300 ${
                isActive
                  ? "text-[#A8E6CF] font-bold border-b-2 border-[#A8E6CF]"
                  : "text-[#D4ECDD] hover:text-white hover:border-white border-b-2 border-transparent"
              }`
            }
          >
            Transfer
          </NavLink>
        </div>
        <div className="flex items-center space-x-6">
          {authToken ? (
            <>
              <span className="text-[#D4ECDD] text-sm">
                Hi, {user?.name || "Guest"}
              </span>
              <button
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
                className="text-[#D4ECDD] text-sm border border-[#A8E6CF] px-4 py-1 rounded-full transition duration-300 hover:bg-[#A8E6CF] hover:text-[#2B4A3F]"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="text-[#D4ECDD] text-sm border border-[#A8E6CF] px-4 py-1 rounded-full transition duration-300 hover:bg-[#A8E6CF] hover:text-[#2B4A3F]"
            >
              Login
            </button>
          )}
        </div>
        <div className="text-sm font-light tracking-wide text-[#D4ECDD]">
          {formattedTime}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
