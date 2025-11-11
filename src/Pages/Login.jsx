import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";

const Login = () => {
  const { login, googleLogin, resetPassword } = useAuth();
  const navigate = useNavigate();
  const loc = useLocation();
  const redirectTo = loc.state?.from || "/";

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success("Logged in successfully");
      navigate(redirectTo, { replace: true });
    } catch {
      toast.error("Login failed. Check your email/password.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    try {
      await googleLogin();
      toast.success("Google login successful");
      navigate(redirectTo, { replace: true });
    } catch {
      toast.error("Google login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    if (!form.email) {
      toast.warn("Enter your email first");
      return;
    }
    try {
      await resetPassword(form.email);
      toast.info("Password reset email sent");
    } catch {
      toast.error("Failed to send reset email");
    }
  };

  return (
    <main className="min-h-[70vh] flex items-center">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-md mx-auto card bg-base-100 shadow">
          <div className="card-body">
            <h1 className="text-2xl font-bold text-center">Login</h1>

            <form onSubmit={handleSubmit} className="space-y-3 mt-3">
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

              <div className="flex items-center justify-between text-sm">
                <button type="button" className="link" onClick={handleReset}>
                  Forget Password?
                </button>
                <Link to="/register" className="link link-primary">
                  Create an account
                </Link>
              </div>

              <button disabled={loading} className="btn btn-primary w-full">
                {loading ? "Please wait..." : "Login"}
              </button>
            </form>

            <div className="divider">or</div>

            <button
              onClick={handleGoogle}
              disabled={loading}
              className="btn btn-outline w-full"
            >
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
