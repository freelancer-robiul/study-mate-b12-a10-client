import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { API_BASE, getJson, delJson } from "../lib/api";
import { useAuth } from "../Contexts/AuthContext";
import { toast } from "react-toastify";

const asId = (v) =>
  typeof v === "string" ? v : v?.$oid || v?.toString?.() || "";

const MyConnections = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await getJson(
        `${API_BASE}/api/partners?email=${encodeURIComponent(user.email)}`
      );
      setItems(data);
    } catch (e) {
      toast.error(e.message || "Failed to load");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) load();
  }, [user?.email]);

  const onEdit = (id) => navigate(`/partners/${id}/edit`);

  const onDelete = async (id) => {
    const pid = asId(id);
    if (!pid) return toast.error("Invalid id");
    if (!confirm("Delete this profile?")) return;
    setDeletingId(pid);
    try {
      await delJson(`${API_BASE}/api/partners/${pid}`);
      setItems((prev) =>
        prev.filter((p) => asId(p._id) !== pid && asId(p.id) !== pid)
      );
      toast.success("Profile deleted");
    } catch (e) {
      toast.error(e.message || "Delete failed");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <main className="container mx-auto px-4 md:px-8 py-8">
      <h1 className="text-2xl font-bold">My Connections</h1>
      {loading ? (
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="card bg-base-100 shadow animate-pulse">
              <div className="h-40 bg-base-200" />
              <div className="card-body">
                <div className="h-6 w-2/3 bg-base-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {items.map((p) => {
            const pid = asId(p._id) || asId(p.id);
            return (
              <div key={pid} className="card bg-base-100 shadow">
                <figure className="aspect-[16/10] overflow-hidden">
                  <img
                    src={p.profileimage}
                    alt={p.name}
                    className="w-full h-full object-cover"
                    onError={(e) =>
                      (e.currentTarget.src =
                        "https://i.ibb.co/9G7n1Qh/default-avatar.png")
                    }
                  />
                </figure>
                <div className="card-body">
                  <h3 className="card-title">{p.name}</h3>
                  <p className="text-sm opacity-80">
                    {p.subject} • {p.experienceLevel}
                  </p>
                  <div className="card-actions justify-between mt-2">
                    <button
                      className="btn btn-outline btn-sm"
                      onClick={() => onEdit(pid)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-error btn-sm"
                      onClick={() => onDelete(pid)}
                      disabled={deletingId === pid}
                    >
                      {deletingId === pid ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          {!items.length && <p className="opacity-70">No profiles yet.</p>}
        </div>
      )}
    </main>
  );
};

export default MyConnections;
