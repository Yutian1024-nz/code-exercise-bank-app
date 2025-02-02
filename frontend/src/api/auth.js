const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Invalid credentials");
    }

    return await response.json();
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};
