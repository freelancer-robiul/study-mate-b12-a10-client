import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { API_BASE, getJson, patchJson } from "../lib/api";
import { toast } from "react-toastify";

const EditPartner = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const d = await getJson(`${API_BASE}/api/partners/${id}`);
        setForm({
          name: d.name || "",
          profileimage: d.profileimage || "",
          subject: d.subject || "",
          studyMode: d.studyMode || "Online",
          availabilityTime: d.availabilityTime || "",
          location: d.location || "",
          experienceLevel: d.experienceLevel || "Beginner",
        });
      } catch (e) {
        toast.error(e.message || "Failed to load");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await patchJson(`${API_BASE}/api/partners/${id}`, {
        name: form.name,
        profileimage: form.profileimage,
        subject: form.subject,
        studyMode: form.studyMode,
        availabilityTime: form.availabilityTime,
        location: form.location,
        experienceLevel: form.experienceLevel,
      });
      toast.success("Profile updated");
      navigate(`/partners/${id}`, { replace: true });
    } catch (e) {
      toast.error(e.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading || !form)
    return <div className="container mx-auto px-4 md:px-8 py-8">Loading…</div>;

  return (
    <main className="container mx-auto px-4 md:px-8 py-8">
      <div className="max-w-2xl mx-auto card bg-base-100 shadow">
        <div className="card-body">
          <h1 className="text-2xl font-bold">Edit Partner Profile</h1>
          <form
            onSubmit={handleSubmit}
            className="grid md:grid-cols-2 gap-4 mt-4"
          >
            <input
              className="input input-bordered w-full"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              className="input input-bordered w-full"
              name="subject"
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
              <option>Hybrid</option>
            </select>
            <select
              className="select select-bordered w-full"
              name="experienceLevel"
              value={form.experienceLevel}
              onChange={handleChange}
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
            <input
              className="input input-bordered w-full md:col-span-2"
              name="availabilityTime"
              value={form.availabilityTime}
              onChange={handleChange}
              required
            />
            <input
              className="input input-bordered w-full"
              name="location"
              value={form.location}
              onChange={handleChange}
              required
            />
            <input
              className="input input-bordered w-full"
              name="profileimage"
              value={form.profileimage}
              onChange={handleChange}
            />
            <button className="btn btn-primary md:col-span-2" disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default EditPartner;
