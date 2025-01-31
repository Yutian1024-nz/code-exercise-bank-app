import { useAuth } from "../contexts/AuthProvider";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getAccountsByCustomerId = async (customerId, authToken) => {
  if (!customerId || !authToken) {
    console.error("getAccountsByCustomerId: Missing customerId or authToken");
    return [];
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/accounts?customerId=${customerId}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch accounts");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching accounts:", error);
    return [];
  }
};
