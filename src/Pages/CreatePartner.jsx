import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../Contexts/AuthContext";
import { API_BASE, postJson } from "../lib/api";
import { toast } from "react-toastify";

const CreatePartner = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    profileimage: "",
    subject: "",
    studyMode: "Online",
    availabilityTime: "",
    location: "",
    experienceLevel: "Beginner",
    rating: "0",
    patnerCount: 0,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        name: form.name.trim(),
        profileimage: form.profileimage.trim(),
        subject: form.subject.trim(),
        studyMode: form.studyMode,
        availabilityTime: form.availabilityTime.trim(),
        location: form.location.trim(),
        experienceLevel: form.experienceLevel,
        rating: Math.max(0, Math.min(5, Number(form.rating) || 0)),
        patnerCount: 0,
        email: user?.email || "",
        createdAt: new Date(),
      };
      const created = await postJson(`${API_BASE}/api/partners`, payload);
      toast.success("Profile created");
      navigate(`/partners/${created._id}`, { replace: true });
    } catch (err) {
      toast.error(err.message || "Failed to create profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container mx-auto px-4 md:px-8 py-8">
      <div className="max-w-2xl mx-auto card bg-base-100 shadow">
        <div className="card-body">
          <h1 className="text-2xl font-bold">Create Partner Profile</h1>

          <form
            onSubmit={handleSubmit}
            className="grid md:grid-cols-2 gap-4 mt-4"
          >
            <input
              className="input input-bordered w-full"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              className="input input-bordered w-full"
              name="profileimage"
              placeholder="Profile Image URL"
              value={form.profileimage}
              onChange={handleChange}
            />

            <input
              className="input input-bordered w-full"
              name="subject"
              placeholder="Subject (e.g., Math, English)"
              value={form.subject}
              onChange={handleChange}
              required
            />

            <select
              className="select select-bordered w-full"
              name="studyMode"
              value={form.studyMode}
              onChange={handleChange}
            >
              <option>Online</option>
              <option>Offline</option>
            </select>

            <input
              className="input input-bordered w-full"
              name="availabilityTime"
              placeholder='Availability (e.g., "Evening 6–9 PM")'
              value={form.availabilityTime}
              onChange={handleChange}
              required
            />
            <input
              className="input input-bordered w-full"
              name="location"
              placeholder="Location (City/Area)"
              value={form.location}
              onChange={handleChange}
              required
            />

            <select
              className="select select-bordered w-full"
              name="experienceLevel"
              value={form.experienceLevel}
              onChange={handleChange}
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Expert</option>
            </select>

            <input
              type="number"
              min="0"
              max="5"
              step="0.1"
              className="input input-bordered w-full"
              name="rating"
              placeholder="Rating (0–5)"
              value={form.rating}
              onChange={handleChange}
            />

            <input
              className="input input-bordered w-full"
              name="patnerCount"
              value={form.patnerCount}
              readOnly
            />

            <input
              className="input input-bordered w-full md:col-span-2"
              value={user?.email || ""}
              readOnly
            />

            <button
              disabled={loading}
              className="btn btn-primary md:col-span-2"
            >
              {loading ? "Creating..." : "Create Profile"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default CreatePartner;
