import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { API_BASE, getJson } from "../lib/api";
import { useAuth } from "../Contexts/AuthContext";

const FindPartners = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const data = await getJson(`${API_BASE}/api/partners`);
      setItems(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleView = (id) => {
    if (!user) return navigate("/login", { replace: true });
    navigate(`/partners/${id}`);
  };

  return (
    <main className="container mx-auto px-4 md:px-8 py-8">
      <h1 className="text-2xl font-bold">Find Partners</h1>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="card bg-base-100 shadow animate-pulse">
              <div className="h-40 bg-base-200" />
              <div className="card-body">
                <div className="h-6 w-2/3 bg-base-200 rounded" />
                <div className="h-4 w-1/2 bg-base-200 rounded mt-2" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {items.map((p) => {
            const id =
              typeof p._id === "string"
                ? p._id
                : p._id?.$oid || p._id?.toString?.() || p.id;
            return (
              <div
                key={id}
                className="card bg-base-100 shadow hover:shadow-lg transition"
              >
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
                  <p className="text-sm opacity-80">{p.subject}</p>
                  <p className="text-sm opacity-80 text-green-500">
                    {p.studyMode}
                  </p>
                  <p className="text-sm opacity-80">{p.experienceLevel}</p>
                  <div className="card-actions justify-end">
                    <button
                      className="btn btn-primary"
                      onClick={() => handleView(id)}
                    >
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          {!items.length && <p className="opacity-70">No partners found.</p>}
        </div>
      )}
    </main>
  );
};

export default FindPartners;
