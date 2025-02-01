import { createContext, useContext } from "react";
import useLocalStorage from "./useLocalStorage";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [authToken, setAuthToken] = useLocalStorage("authToken", null);
  const [user, setUser] = useLocalStorage("user", null);

  const login = (token, userData) => {
    setAuthToken(token);
    setUser({
      id: userData.userId,
      name: userData.name,
      email: userData.email,
    });
  };

  const logout = () => {
    setAuthToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ authToken, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
