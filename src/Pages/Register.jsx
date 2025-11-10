import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../Contexts/AuthContext";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    photoURL: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      await register(form.email, form.password, form.name, form.photoURL);
      navigate("/", { replace: true });
    } catch (error) {
      setErr("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[70vh] flex items-center">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-md mx-auto card bg-base-100 shadow">
          <div className="card-body">
            <h1 className="text-2xl font-bold">Create Account</h1>
            {err && <div className="alert alert-error text-sm">{err}</div>}
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Full name"
                className="input input-bordered w-full"
                required
              />
              <input
                type="url"
                name="photoURL"
                value={form.photoURL}
                onChange={handleChange}
                placeholder="Photo URL (optional)"
                className="input input-bordered w-full"
              />
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
                {loading ? "Please wait..." : "Register"}
              </button>
            </form>
            <p className="text-sm text-center">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Register;
