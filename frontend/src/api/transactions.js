const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getTransactionsByAccountId = async (accountId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/transactions?accountId=${accountId}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch transactions");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return [];
  }
};
