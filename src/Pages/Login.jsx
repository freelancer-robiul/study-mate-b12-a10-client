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
              className="btn btn-outline w-full flex items-center justify-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 488 512"
                width="20"
                height="20"
              >
                <path
                  fill="#EA4335"
                  d="M488 261.8c0-17.8-1.6-35-4.6-51.6H249v97.7h135.7c-5.9 31.8-23.5 58.7-50.2 76.8v63.8h81.1c47.4-43.7 74.4-108.2 74.4-186.7z"
                />
                <path
                  fill="#34A853"
                  d="M249 492c67.5 0 124.2-22.4 165.6-60.8l-81.1-63.8c-22.5 15-51.3 23.7-84.5 23.7-64.9 0-120-43.8-139.8-102.7H27.2v64.5C68.7 441.4 152 492 249 492z"
                />
                <path
                  fill="#4A90E2"
                  d="M109.2 288.4c-9.3-27.8-9.3-57.9 0-85.7v-64.5H27.2C9.8 175.3 0 211.1 0 249s9.8 73.7 27.2 110.8l82-64.5z"
                />
                <path
                  fill="#FBBC05"
                  d="M249 97.6c36.8 0 69.7 12.6 95.6 37.4l71.4-71.4C373.2 24.5 316.5 0 249 0 152 0 68.7 50.6 27.2 138.2l82 64.5C129 141.4 184.1 97.6 249 97.6z"
                />
              </svg>
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
