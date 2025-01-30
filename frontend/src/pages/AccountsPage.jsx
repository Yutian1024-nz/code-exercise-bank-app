import { useEffect, useState } from "react";
import { getAccountsByCustomerId } from "../api/accounts";
import { useNavigate } from "react-router-dom";

const AccountsPage = () => {
  const [accounts, setAccounts] = useState([]);
  const navigate = useNavigate();
  const customerId = "112233"; // 先写死，后续可用登录信息替换

  useEffect(() => {
    const fetchAccounts = async () => {
      const data = await getAccountsByCustomerId(customerId);
      setAccounts(data);
    };
    fetchAccounts();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Accounts</h2>
      {accounts.length === 0 ? (
        <p className="text-gray-500">No accounts found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {accounts.map((account) => (
            <div
              key={account.id}
              className="p-4 bg-white shadow-md rounded-lg border border-gray-200 transition transform hover:shadow-lg hover:scale-105 cursor-pointer"
              onClick={() =>
                navigate(`/transactions/${account.id}`, { state: account })
              }
            >
              <p className="text-lg font-semibold">
                Account No: {account.accountNumber}
              </p>
              <p className="text-gray-600">
                Balance:{" "}
                <span className="font-bold">${account.balance.toFixed(2)}</span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AccountsPage;
