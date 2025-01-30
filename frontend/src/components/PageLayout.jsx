import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const PageLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default PageLayout;
