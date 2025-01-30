import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
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
    <nav className="bg-emerald-900 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-lg font-semibold">Bank App Demo</h1>
        <div className="space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-3 py-2 rounded-md transition ${
                isActive
                  ? "text-white font-bold border-b-2 border-white"
                  : "text-gray-300 hover:text-white"
              }`
            }
          >
            Accounts
          </NavLink>
          <NavLink
            to="/transfer"
            className={({ isActive }) =>
              `px-3 py-2 rounded-md transition ${
                isActive
                  ? "text-white font-bold border-b-2 border-white"
                  : "text-gray-300 hover:text-white"
              }`
            }
          >
            Transfer
          </NavLink>
        </div>
        <div className="text-sm font-semibold text-white">
          {formattedTime}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
