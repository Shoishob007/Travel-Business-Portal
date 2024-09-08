import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import CreateProduct from "./components/CreateProduct";
import ManageProducts from "./components/ManageProducts";
import UpdateProduct from "./components/UpdateProduct";
import Navbar from "./components/Navbar";

const App = () => {
  const isAuthenticated = () => {
    return !!localStorage.getItem("access_token");
  };

  return (
    <Router>
      {isAuthenticated() && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/create"
          element={
            isAuthenticated() ? <CreateProduct /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/manage"
          element={
            isAuthenticated() ? <ManageProducts /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/update/:id"
          element={
            isAuthenticated() ? <UpdateProduct /> : <Navigate to="/login" />
          }
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
