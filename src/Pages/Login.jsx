import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../Contexts/AuthContext";

const Login = () => {
  const { login, googleLogin } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate("/", { replace: true });
    } catch (error) {
      setErr("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setErr("");
    setLoading(true);
    try {
      await googleLogin();
      navigate("/", { replace: true });
    } catch (error) {
      setErr("Google sign-in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[70vh] flex items-center">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-md mx-auto card bg-base-100 shadow">
          <div className="card-body">
            <h1 className="text-2xl font-bold">Login</h1>
            {err && <div className="alert alert-error text-sm">{err}</div>}
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className="input input-bordered w-full"
                required
              />
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                className="input input-bordered w-full"
                required
              />
              <button disabled={loading} className="btn btn-primary w-full">
                {loading ? "Please wait..." : "Login"}
              </button>
            </form>
            <button
              onClick={handleGoogle}
              disabled={loading}
              className="btn btn-outline w-full"
            >
              Continue with Google
            </button>
            <p className="text-sm text-center">
              New here?{" "}
              <Link to="/register" className="link link-primary">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
