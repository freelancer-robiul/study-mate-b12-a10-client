import React, { useEffect, useState } from "react";
import { useAuth } from "../Contexts/AuthContext";
import { API_BASE, getJson, patchJson, delJson } from "../lib/api";
import { toast } from "react-toastify";

const emptyForm = {
  name: "",
  location: "",
  studyMode: "Online",
  preferredMode: "Online",
  note: "",
};

const MyConnections = () => {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const load = async () => {
    if (!user?.email) return;
    setLoading(true);
    try {
      const data = await getJson(
        `${API_BASE}/api/requests?requesterEmail=${encodeURIComponent(
          user.email
        )}`
      );
      setItems(data);
    } catch (e) {
      toast.error(e.message || "Failed to load requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.email]);

  const openEdit = (req) => {
    setEditingId(req._id);
    setForm({
      name: req.partnerSnapshot?.name || "",
      location: req.partnerSnapshot?.location || "",
      studyMode: req.partnerSnapshot?.studyMode || "Online",
      preferredMode: req.preferredMode || "Online",
      note: req.note || "",
    });
    setOpen(true);
  };

  const closeEdit = () => {
    setOpen(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const saveEdit = async () => {
    if (!editingId) return;
    setSaving(true);
    try {
      // Use dot-notation to update nested partnerSnapshot fields
      const payload = {
        "partnerSnapshot.name": form.name,
        "partnerSnapshot.location": form.location,
        "partnerSnapshot.studyMode": form.studyMode,
        preferredMode: form.preferredMode,
        note: form.note,
      };
      const updated = await patchJson(
        `${API_BASE}/api/requests/${editingId}`,
        payload
      );

      // Update the item locally without full reload
      setItems((prev) =>
        prev.map((it) => (it._id === updated._id ? updated : it))
      );

      toast.success("Request updated");
      closeEdit();
    } catch (e) {
      toast.error(e.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async (id) => {
    if (!confirm("Delete this request?")) return;
    try {
      await delJson(`${API_BASE}/api/requests/${id}`);
      setItems((prev) => prev.filter((x) => x._id !== id));
      toast.success("Deleted");
    } catch (e) {
      toast.error(e.message || "Delete failed");
    }
  };

  return (
    <main className="container mx-auto px-4 md:px-8 py-8">
      <h1 className="text-2xl font-bold">My Connections</h1>

      {/* Table */}
      {loading ? (
        <div className="mt-8">Loading...</div>
      ) : items.length === 0 ? (
        <p className="opacity-70 mt-6">No requests yet.</p>
      ) : (
        <div className="overflow-x-auto mt-6">
          <table className="table">
            <thead>
              <tr>
                <th>Partner</th>
                <th>Subject</th>
                <th>Study Mode</th>
                <th>Preferred Mode</th>
                <th>Note</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((r) => (
                <tr key={r._id}>
                  <td className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={
                            r.partnerSnapshot?.profileimage ||
                            "https://i.ibb.co/9G7n1Qh/default-avatar.png"
                          }
                          alt={r.partnerSnapshot?.name || "Partner"}
                          onError={(e) =>
                            (e.currentTarget.src =
                              "https://i.ibb.co/9G7n1Qh/default-avatar.png")
                          }
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">
                        {r.partnerSnapshot?.name || "-"}
                      </div>
                      <div className="text-sm opacity-50">
                        {r.partnerEmail || ""}
                      </div>
                    </div>
                  </td>
                  <td>{r.partnerSnapshot?.subject || "-"}</td>
                  <td>{r.partnerSnapshot?.studyMode || "-"}</td>
                  <td>{r.preferredMode || "-"}</td>
                  <td>{r.note || "-"}</td>
                  <td className="text-right space-x-2">
                    <button className="btn btn-sm" onClick={() => openEdit(r)}>
                      Update
                    </button>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => onDelete(r._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Modal */}
      <dialog className={`modal ${open ? "modal-open" : ""}`}>
        <div className="modal-box max-w-2xl">
          <h3 className="font-bold text-lg mb-4">Update Request</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="form-control">
              <span className="label-text">Partner Name</span>
              <input
                type="text"
                className="input input-bordered"
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                placeholder="e.g., Aisha Rahman"
              />
            </label>

            <label className="form-control">
              <span className="label-text">Location</span>
              <input
                type="text"
                className="input input-bordered"
                value={form.location}
                onChange={(e) =>
                  setForm((f) => ({ ...f, location: e.target.value }))
                }
                placeholder="City, area"
              />
            </label>

            <label className="form-control">
              <span className="label-text">Study Mode (Partner)</span>
              <select
                className="select select-bordered"
                value={form.studyMode}
                onChange={(e) =>
                  setForm((f) => ({ ...f, studyMode: e.target.value }))
                }
              >
                <option>Online</option>
                <option>Offline</option>
                <option>Hybrid</option>
              </select>
            </label>

            <label className="form-control">
              <span className="label-text">Preferred Mode (Your request)</span>
              <select
                className="select select-bordered"
                value={form.preferredMode}
                onChange={(e) =>
                  setForm((f) => ({ ...f, preferredMode: e.target.value }))
                }
              >
                <option>Online</option>
                <option>Offline</option>
                <option>Hybrid</option>
              </select>
            </label>

            <label className="form-control md:col-span-2">
              <span className="label-text">Note</span>
              <textarea
                className="textarea textarea-bordered h-28"
                placeholder="Add a short note"
                value={form.note}
                onChange={(e) =>
                  setForm((f) => ({ ...f, note: e.target.value }))
                }
              />
            </label>
          </div>

          <div className="modal-action">
            <button className="btn" onClick={closeEdit} disabled={saving}>
              Cancel
            </button>
            <button
              className="btn btn-primary"
              onClick={saveEdit}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop" onClick={closeEdit}>
          <button>close</button>
        </form>
      </dialog>
    </main>
  );
};

export default MyConnections;
