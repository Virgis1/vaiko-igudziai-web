import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ParentView from "./components/ParentView";
import ChildView from "./components/ChildView";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/parent"
          element={
            <ProtectedRoute>
              <ParentView />
            </ProtectedRoute>
          }
        />

        <Route path="/child" element={<ChildView />} />
      </Routes>
    </Router>
  );
}

export default App;