import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const TransferPage = () => {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);
  const [fromAccount, setFromAccount] = useState(null);
  const [toAccount, setToAccount] = useState(null);
  const [amount, setAmount] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // 显示错误消息
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isResultOpen, setIsResultOpen] = useState(false);
  const [resultMessage, setResultMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const customerId = "112233";

  // **获取账户数据**
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/accounts?customerId=${customerId}`
        );
        if (!response.ok) throw new Error("Failed to fetch accounts");
        const data = await response.json();

        if (data.length < 2) {
          setResultMessage("You need at least two accounts to transfer money.");
          setIsResultOpen(true);
        } else {
          setAccounts(data);
        }
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };
    fetchAccounts();
  }, []);

  // **金额输入格式化**
  const handleAmountChange = (e) => {
    let value = e.target.value;
    value = value.replace(/[^0-9.]/g, ""); // 只允许数字和小数点
    if (value.includes(".")) {
      const [intPart, decimalPart] = value.split(".");
      if (decimalPart.length > 2)
        value = `${intPart}.${decimalPart.slice(0, 2)}`;
    }
    setAmount(value);
    setErrorMessage(""); // 清空错误提示
  };

  // **处理转账 API**
  const handleTransfer = async () => {
    if (!fromAccount || !toAccount || !amount || parseFloat(amount) <= 0)
      return;
    if (parseFloat(amount) > fromAccount.balance) return;
    setIsLoading(true);

    const transferData = {
      fromAccountId: fromAccount.id,
      toAccountId: toAccount.id,
      amount: parseFloat(amount).toFixed(2),
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/transfers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transferData),
      });

      if (response.ok) {
        setResultMessage("Transfer Successful!");
      } else {
        setResultMessage("Transfer failed. Please try again later.");
      }
    } catch (error) {
      console.error("Error:", error);
      setResultMessage("Network error. Please try again.");
    } finally {
      setIsLoading(false);
      setIsResultOpen(true);
      setIsConfirmOpen(false);
    }
  };

  return (
    <div className="p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 transition"
      >
        ← Back to Accounts
      </button>

      <h2 className="text-2xl font-bold mb-4">Transfer Money</h2>

      {/* From Account */}
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-1">
          From Account
        </label>
        <select
          className="w-full p-2 border rounded"
          value={fromAccount?.id || ""}
          onChange={(e) => {
            const selected = accounts.find((acc) => acc.id === e.target.value);
            setFromAccount(selected);
            if (selected?.id === toAccount?.id) setToAccount(null);
          }}
        >
          <option value="">Select an account</option>
          {accounts.map((account) => (
            <option key={account.id} value={account.id}>
              {account.accountNumber} (Balance: ${account.balance.toFixed(2)})
            </option>
          ))}
        </select>
      </div>

      {/* To Account */}
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-1">
          To Account
        </label>
        <select
          className="w-full p-2 border rounded"
          value={toAccount?.id || ""}
          onChange={(e) => {
            const selected = accounts.find((acc) => acc.id === e.target.value);
            setToAccount(selected);
          }}
          disabled={!fromAccount}
        >
          <option value="">Select an account</option>
          {accounts
            .filter((acc) => acc.id !== fromAccount?.id)
            .map((account) => (
              <option key={account.id} value={account.id}>
                {account.accountNumber} (Balance: ${account.balance.toFixed(2)})
              </option>
            ))}
        </select>
      </div>

      {/* Amount Input */}
      <div className="mb-2">
        <label className="block text-gray-700 font-semibold mb-1">Amount</label>
        <input
          type="text"
          placeholder="$0.00"
          className="w-full p-2 border rounded"
          value={amount}
          onChange={handleAmountChange}
        />
      </div>

      {/* 错误提示 */}
      {fromAccount && amount && parseFloat(amount) > fromAccount.balance && (
        <p className="text-red-500 mb-2">
          Insufficient balance for this transfer.
        </p>
      )}

      {/* Transfer Button */}
      <button
        disabled={
          !fromAccount ||
          !toAccount ||
          !amount ||
          parseFloat(amount) <= 0 ||
          parseFloat(amount) > fromAccount.balance ||
          isLoading
        }
        onClick={() => setIsConfirmOpen(true)}
        className={`w-full p-2 text-white rounded ${
          fromAccount &&
          toAccount &&
          amount &&
          parseFloat(amount) > 0 &&
          parseFloat(amount) <= fromAccount.balance
            ? "bg-blue-500 hover:bg-blue-700"
            : "bg-gray-300 cursor-not-allowed"
        }`}
      >
        {isLoading ? "Processing..." : "Make Transfer"}
      </button>

      {/* Confirm Transfer Modal */}
      {isConfirmOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <h3 className="text-lg font-bold mb-4">Confirm Transfer</h3>
            <p>
              From: <strong>{fromAccount.accountNumber}</strong>
            </p>
            <p>
              To: <strong>{toAccount.accountNumber}</strong>
            </p>
            <p>
              Amount: <strong>${parseFloat(amount).toFixed(2)}</strong>
            </p>
            <button
              onClick={handleTransfer}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
            >
              Confirm
            </button>
            <button
              onClick={() => setIsConfirmOpen(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Result Modal */}
      {isResultOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <h3 className="text-lg font-bold mb-4">{resultMessage}</h3>
            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransferPage;
