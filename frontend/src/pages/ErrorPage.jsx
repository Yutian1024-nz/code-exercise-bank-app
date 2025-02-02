import { useNavigate, useLocation } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const errorMessage = location.state?.message || "Oops! Something went wrong.";

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold text-red-600 mb-4">Error</h1>
      <p className="text-lg text-gray-700 mb-4">{errorMessage}</p>
      <button
        onClick={() => navigate("/")}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Go to Home
      </button>
    </div>
  );
};

export default ErrorPage;
