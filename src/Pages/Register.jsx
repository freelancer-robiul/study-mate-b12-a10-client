import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useAuth } from "../Contexts/AuthContext";
import { toast } from "react-toastify";

const Register = () => {
  const { register, googleLogin } = useAuth();
  const navigate = useNavigate();
  const loc = useLocation();
  const redirectTo = loc.state?.from || "/";

  const [form, setForm] = useState({
    name: "",
    photoURL: "",
    email: "",
    password: "",
  });
  const [errs, setErrs] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const validatePassword = (pwd) => {
    const errors = {};
    if (!/[A-Z]/.test(pwd)) errors.upper = "At least one uppercase required.";
    if (!/[a-z]/.test(pwd)) errors.lower = "At least one lowercase required.";
    if (pwd.length < 6) errors.len = "Must be at least 6 characters.";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const valErrs = validatePassword(form.password);
    setErrs(valErrs);
    if (Object.keys(valErrs).length) {
      toast.error("Password does not meet requirements");
      return;
    }
    setLoading(true);
    try {
      await register(form.email, form.password, form.name, form.photoURL);
      toast.success("Registration successful");
      navigate(redirectTo, { replace: true });
    } catch {
      toast.error("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    try {
      await googleLogin();
      toast.success("Signed in with Google");
      navigate(redirectTo, { replace: true });
    } catch {
      toast.error("Google sign-in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[70vh] flex items-center">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-md mx-auto card bg-base-100 shadow">
          <div className="card-body">
            <h1 className="text-2xl font-bold text-center">Create Account</h1>

            <form onSubmit={handleSubmit} className="space-y-3 mt-3">
              <input
                className="input input-bordered w-full"
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                required
              />
              <input
                className="input input-bordered w-full"
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
              />
              <input
                className="input input-bordered w-full"
                type="url"
                name="photoURL"
                placeholder="Photo URL (optional)"
                value={form.photoURL}
                onChange={handleChange}
              />
              <div className="space-y-2">
                <input
                  className="input input-bordered w-full"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
                {(errs.upper || errs.lower || errs.len) && (
                  <ul className="text-xs text-error list-disc ml-5 space-y-0.5">
                    {errs.upper && <li>{errs.upper}</li>}
                    {errs.lower && <li>{errs.lower}</li>}
                    {errs.len && <li>{errs.len}</li>}
                  </ul>
                )}
              </div>

              <button disabled={loading} className="btn btn-primary w-full">
                {loading ? "Please wait..." : "Register"}
              </button>
            </form>

            <p className="text-sm text-center mt-2">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary">
                Login
              </Link>
            </p>

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

export default Register;
