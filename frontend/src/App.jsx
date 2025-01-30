import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PageLayout from "./components/PageLayout";
import AccountsPage from "./pages/AccountsPage";
import TransferPage from "./pages/TransferPage";
import TransactionsPage from "./pages/TransactionsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PageLayout />}>
        <Route index element={<AccountsPage />} />
        <Route path="transactions/:accountId" element={<TransactionsPage />} />
        <Route path="transfer" element={<TransferPage />} />
      </Route>
    </Routes>
  );
}

export default App;
