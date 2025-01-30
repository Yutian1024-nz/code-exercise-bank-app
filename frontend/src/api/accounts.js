const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getAccountsByCustomerId = async (customerId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/accounts?customerId=${customerId}`
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
