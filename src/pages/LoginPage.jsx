import { useState } from "react";
import { loginParent } from "../api/auth";
import { useNavigate } from "react-router-dom";
import "../css/auth.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginParent(email, password);
      navigate("/parent");
    } catch (err) {
      console.log("Login Error:", err)
      console.log("Login Error response:", err?.response?.data);

      const msg =
        err?.response?.data?.detail ||
        err?.message ||
        "Prisijungti nepavyko"

      alert(msg)
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Prisijungimas</h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="El. paštas"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Slaptažodis"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Prisijungti</button>
        </form>

        <p onClick={() => navigate("/register")} className="link">
          Neturi paskyros? Registruotis
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
