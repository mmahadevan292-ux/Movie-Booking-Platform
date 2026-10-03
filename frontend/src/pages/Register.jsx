import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function Register() {
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const { login } = useAuth();

  const navigate = useNavigate();

  const submit = (event) => {
    event.preventDefault();

    login(email, name);

    navigate("/");
  };

  return (
    <main className="auth-page">
      <div className="auth-card">
        <span className="eyebrow">JOIN MOVIEBOOK</span>

        <h1>Create account.</h1>

        <p>Save your bookings and manage your movie tickets.</p>

        <form className="form-card plain" onSubmit={submit}>
          <label>
            Full Name
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </label>

          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>

          <button className="primary-button full">Create Account</button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </main>
  );
}

export default Register;
