import { fetchWithAuth } from "./apiClient";

export const getAccountsByCustomerId = async (customerId, authToken) => {
  if (!customerId) {
    console.error("getAccountsByCustomerId: Missing customerId");
    return [];
  }

  try {
    return await fetchWithAuth(
      `/api/accounts?customerId=${customerId}`,
      authToken
    );
  } catch (error) {
    console.error("Error fetching accounts:", error);
    return [];
  }
};
