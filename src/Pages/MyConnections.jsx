import React, { useEffect, useState } from "react";
import { getJson, patchJson, delJson } from "../lib/api";
import { useAuth } from "../Contexts/AuthContext";
import Loader from "../Components/Loader";
import { toast } from "react-toastify";

const asId = (v) =>
  typeof v === "string" ? v : v?.$oid || v?.toString?.() || "";

const MyConnections = () => {
  const { user } = useAuth();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editOpen, setEditOpen] = useState(false);
  const [editId, setEditId] = useState("");
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState("");
  const [editForm, setEditForm] = useState({
    preferredMode: "Online",
    note: "",
  });

  const load = async () => {
    if (!user?.email) return;
    setLoading(true);
    try {
      const data = await getJson(
        `/api/requests?requesterEmail=${encodeURIComponent(user.email)}`
      );
      setRows(data);
    } catch {
      toast.error("Failed to load requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.email]);

  const openEdit = (r) => {
    setEditId(asId(r._id));
    setEditForm({
      preferredMode:
        r.preferredMode || r.partnerSnapshot?.studyMode || "Online",
      note: r.note || "",
    });
    setEditOpen(true);
  };

  const saveEdit = async () => {
    if (!editId) return;
    setSaving(true);
    try {
      const updated = await patchJson(`/api/requests/${editId}`, {
        preferredMode: editForm.preferredMode,
        note: editForm.note,
        updatedAt: new Date(),
      });
      setRows((prev) =>
        prev.map((x) => (asId(x._id) === asId(updated._id) ? updated : x))
      );
      toast.success("Request updated");
      setEditOpen(false);
    } catch (e) {
      toast.error(e.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async (rawId) => {
    const id = asId(rawId);
    if (!id) return toast.error("Invalid request id");
    if (!confirm("Delete this request?")) return;
    setDeletingId(id);
    try {
      await delJson(`/api/requests/${id}`);
      setRows((prev) => prev.filter((x) => asId(x._id) !== id));
      toast.success("Request deleted");
    } catch (e) {
      toast.error(e.message || "Delete failed");
    } finally {
      setDeletingId("");
    }
  };

  if (loading) return <Loader label="Loading your connections..." />;

  return (
    <main className="container mx-auto px-4 md:px-8 py-8">
      <h1 className="text-2xl font-bold">My Connections</h1>

      {rows.length === 0 ? (
        <p className="mt-6 opacity-70">No partner requests yet.</p>
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
              {rows.map((r) => {
                const id = asId(r._id);
                const snap = r.partnerSnapshot || {};
                return (
                  <tr key={id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={snap.profileimage}
                              alt={snap.name}
                              onError={(e) =>
                                (e.currentTarget.src =
                                  "https://i.ibb.co/9G7n1Qh/default-avatar.png")
                              }
                            />
                          </div>
                        </div>
                        <div className="font-semibold">{snap.name}</div>
                      </div>
                    </td>
                    <td>{snap.subject}</td>
                    <td>{snap.studyMode}</td>
                    <td>{r.preferredMode || "-"}</td>
                    <td className="max-w-[220px] truncate" title={r.note || ""}>
                      {r.note || "-"}
                    </td>
                    <td className="text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          className="btn btn-outline btn-sm"
                          onClick={() => openEdit(r)}
                        >
                          Update
                        </button>
                        <button
                          className="btn btn-error btn-sm"
                          onClick={() => onDelete(id)}
                          disabled={deletingId === id}
                        >
                          {deletingId === id ? "Deleting..." : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {editOpen && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-3">Update Request</h3>
            <div className="grid gap-3">
              <label className="form-control">
                <span className="label-text">Preferred Mode</span>
                <select
                  className="select select-bordered"
                  value={editForm.preferredMode}
                  onChange={(e) =>
                    setEditForm((p) => ({
                      ...p,
                      preferredMode: e.target.value,
                    }))
                  }
                >
                  <option>Online</option>
                  <option>Offline</option>
                  <option>Hybrid</option>
                </select>
              </label>

              <label className="form-control">
                <span className="label-text">Note</span>
                <textarea
                  className="textarea textarea-bordered"
                  placeholder="Add a short note"
                  value={editForm.note}
                  onChange={(e) =>
                    setEditForm((p) => ({ ...p, note: e.target.value }))
                  }
                />
              </label>
            </div>

            <div className="modal-action">
              <button className="btn" onClick={() => setEditOpen(false)}>
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
          <form
            method="dialog"
            className="modal-backdrop"
            onClick={() => setEditOpen(false)}
          >
            <button>close</button>
          </form>
        </dialog>
      )}
    </main>
  );
};

export default MyConnections;
