import { useState } from "react";
import { registerParent } from "../api/auth";
import { useNavigate } from "react-router-dom";
import "../css/auth.css";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerParent(name, email, password);
      alert("Registracija sėkminga!");
      navigate("/");
    } catch (err) {
      alert("Klaida registruojantis");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Registracija</h2>

        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Vardas"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

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

          <button type="submit">Registruotis</button>
        </form>

        <p onClick={() => navigate("/")} className="link">
          Jau turi paskyrą? Prisijungti
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;