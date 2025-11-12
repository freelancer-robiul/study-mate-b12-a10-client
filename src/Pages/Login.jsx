import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router";
import { toast } from "react-toastify";
import { useAuth } from "../Contexts/AuthContext";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const Login = () => {
  const { signIn, googleSignIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname
    ? location.state.from.pathname + (location.state.from.search || "")
    : location.state?.from || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  const handleEmailPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signIn(email.trim(), password);
      toast.success("Logged in");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    try {
      await googleSignIn();
      toast.success("Logged in with Google");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleForgot = async () => {
    if (!email.trim()) return toast.error("Enter your email first");
    setResetLoading(true);
    try {
      await sendPasswordResetEmail(getAuth(), email.trim());
      toast.success("Password reset email sent");
    } catch (err) {
      toast.error(err.message || "Could not send reset email");
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <main className="container mx-auto px-4 md:px-8 py-10">
      <div className="max-w-md mx-auto card bg-base-100 shadow">
        <div className="card-body">
          <h1 className="text-2xl font-bold text-center">Login</h1>

          <form onSubmit={handleEmailPassword} className="grid gap-3 mt-4">
            <input
              type="email"
              className="input input-bordered w-full"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              className="input input-bordered w-full"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="flex items-center justify-between text-sm">
              <span />
              <button
                type="button"
                onClick={handleForgot}
                className="link link-primary"
                disabled={resetLoading}
              >
                {resetLoading ? "Sending..." : "Forgot password?"}
              </button>
            </div>

            <button disabled={loading} className="btn btn-primary w-full">
              {loading ? "Please wait..." : "Login"}
            </button>
          </form>

          <div className="divider my-4">OR</div>

          <button
            onClick={handleGoogle}
            disabled={loading}
            className="btn btn-outline w-full"
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

          <p className="text-sm text-center mt-3">
            Don’t have an account?{" "}
            <Link className="link link-primary" to="/register" state={{ from }}>
              Register
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Login;
