import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const { login } = useAuth();

  const navigate = useNavigate();

  const submit = (event) => {
    event.preventDefault();

    login(email, email.split("@")[0]);

    navigate("/");
  };

  return (
    <main className="auth-page">
      <div className="auth-card">
        <span className="eyebrow">WELCOME BACK</span>

        <h1>Sign in.</h1>

        <p>Access your bookings and continue your movie journey.</p>

        <form className="form-card plain" onSubmit={submit}>
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

          <button className="primary-button full">Sign In</button>
        </form>

        <p className="auth-footer">
          New here? <Link to="/register">Create an account</Link>
        </p>
      </div>
    </main>
  );
}

export default Login;
