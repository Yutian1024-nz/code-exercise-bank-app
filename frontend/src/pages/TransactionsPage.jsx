// src/pages/TransactionsPage.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getTransactionsByAccountId } from "../api/transactions";

const TransactionsPage = () => {
  const { accountId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { accountNumber, balance = 0 } = location.state || {};

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const data = await getTransactionsByAccountId(accountId);

      const sortedTransactions = data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setTransactions(sortedTransactions);
    };
    fetchTransactions();
  }, [accountId]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-NZ", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false, 
      timeZoneName: "short",
    });
  };

  const formatAmount = (tx) => {
    const amount = Math.abs(tx.amount).toFixed(2);
    if (tx.type === "DEPOSIT") return `+ $${amount}`;
    if (tx.type === "WITHDRAW") return `- $${amount}`;
    return tx.amount < 0 ? `- $${amount}` : `+ $${amount}`;
  };

  const getAmountColor = (tx) => {
    if (tx.type === "DEPOSIT") return "text-green-600";
    if (tx.type === "WITHDRAW") return "text-black";
    return tx.amount < 0 ? "text-black" : "text-green-600";
  };

  return (
    <div className="p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 transition"
      >
        ← Back to Accounts
      </button>

      <h2 className="text-2xl font-bold mb-2">
        Transactions for Account {accountNumber}
      </h2>
      <p className="text-gray-600 mb-4">
        Current Balance:{" "}
        <span className="font-bold">${balance.toFixed(2)}</span>
      </p>

      {transactions.length === 0 ? (
        <p className="text-gray-500">No transactions found.</p>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-4">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Date</th>
                <th className="p-2 text-left">Type</th>
                <th className="p-2 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id} className="border-t">
                  <td className="p-2">{formatDate(tx.createdAt)}</td>
                  <td className="p-2">{tx.type}</td>
                  <td
                    className={`p-2 text-right font-semibold ${getAmountColor(
                      tx
                    )}`}
                  >
                    {formatAmount(tx)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TransactionsPage;
