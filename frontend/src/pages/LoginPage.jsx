import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { login } from "../api/auth";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login: saveAuth } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { token, ...userData } = await login(email, password);
      saveAuth(token, userData);
      navigate("/");
    } catch (error) {
      setError("Login failed. Please check your email and password.");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded mb-2"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded mb-2"
          required
        />
        <button
          type="submit"
          className="w-full bg-[#3B755F] text-white p-2 rounded hover:bg-[#A8E6CF]"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
