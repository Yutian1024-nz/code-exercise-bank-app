const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getTransactionsByAccountId = async (accountId, authToken) => {
  if (!accountId || !authToken) {
    console.error("getTransactionsByAccountId: Missing accountId or authToken");
    return [];
  }
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/transactions?accountId=${accountId}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
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

export const transferMoney = async (
  fromAccountId,
  toAccountId,
  amount,
  authToken
) => {
  if (!fromAccountId || !toAccountId || !amount || !authToken) {
    console.error("transferMoney: Missing required parameters");
    return { success: false, message: "Invalid transfer request" };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/transfers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ fromAccountId, toAccountId, amount }),
    });

    if (response.ok) {
      return { success: true, message: "Transfer Successful!" };
    } else {
      return {
        success: false,
        message: "Transfer failed. Please try again later.",
      };
    }
  } catch (error) {
    console.error("Error during transfer:", error);
    return { success: false, message: "Network error. Please try again." };
  }
};
