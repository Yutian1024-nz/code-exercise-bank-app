import { fetchWithAuth } from "./apiClient";

export const getTransactionsByAccountId = async (accountId, authToken) => {
  if (!accountId) {
    console.error("getTransactionsByAccountId: Missing accountId");
    return [];
  }

  try {
    return await fetchWithAuth(
      `/api/transactions?accountId=${accountId}`,
      authToken
    );
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return [];
  }
};

export const transferMoney = async (
  fromAccountId,
  toAccountId,
  amount,
  authToken
) => {
  if (!fromAccountId || !toAccountId || !amount) {
    console.error("transferMoney: Missing required parameters");
    return { success: false, message: "Invalid transfer request" };
  }

  try {
    const result = await fetchWithAuth(`/api/transfers`, authToken, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fromAccountId, toAccountId, amount }),
    });

    return { success: true, message: "Transfer Successful!" };
  } catch (error) {
    console.error("Error transferring money:", error);
    return { success: false, message: "Unexpected error. Please try again." };
  }
};
