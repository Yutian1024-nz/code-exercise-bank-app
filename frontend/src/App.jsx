import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PageLayout from "./components/PageLayout";
import AccountsPage from "./pages/AccountsPage";
import TransferPage from "./pages/TransferPage";
import TransactionsPage from "./pages/TransactionsPage";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/LoginPage";
import { useAuth, AuthProvider } from "./contexts/AuthProvider";

function PrivateRoute({ element }) {
  const { authToken } = useAuth();
  return authToken ? element : <Navigate to="/login" replace />;
}

function App() {
  return (

      <Router>
        <Routes>
          <Route path="/" element={<PageLayout />}>
            <Route
              index
              element={<PrivateRoute element={<AccountsPage />} />}
            />
            <Route
              path="transactions/:accountId"
              element={<PrivateRoute element={<TransactionsPage />} />}
            />
            <Route
              path="transfer"
              element={<PrivateRoute element={<TransferPage />} />}
            />
            <Route path="login" element={<LoginPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </Router>
  );
}

export default App;
