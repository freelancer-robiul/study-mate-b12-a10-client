import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../Contexts/AuthContext";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000";

const StarRating = ({ value = 0 }) => {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: full }).map((_, i) => (
        <span key={`f${i}`} className="text-warning text-lg">
          ★
        </span>
      ))}
      {half && <span className="text-warning text-lg">★</span>}
      {Array.from({ length: empty }).map((_, i) => (
        <span key={`e${i}`} className="text-base-300 text-lg">
          ★
        </span>
      ))}
      <span className="ml-2 text-sm opacity-80">
        {Number(value).toFixed(1)}
      </span>
    </div>
  );
};

const TopStudyPartners = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/api/partners/top?limit=3`);
        const data = await res.json();
        if (mounted) setItems(data || []);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => (mounted = false);
  }, []);

  const handleView = (id) => {
    if (!user) return navigate("/login", { replace: true });
    navigate(`/partners/${id}`);
  };

  return (
    <section className="container mx-auto px-4 md:px-8 py-8">
      <div className="flex items-end justify-between gap-4 mb-5">
        <h2 className="text-2xl md:text-3xl font-bold">Top Study Partners</h2>
        <Link to="/find-partners" className="btn btn-outline btn-sm">
          View All
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="card bg-base-100 shadow animate-pulse">
              <div className="h-40 bg-base-200" />
              <div className="card-body">
                <div className="h-6 w-2/3 bg-base-200 rounded" />
                <div className="h-4 w-1/2 bg-base-200 rounded mt-2" />
                <div className="h-4 w-24 bg-base-200 rounded mt-4" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(items || []).slice(0, 3).map((p) => (
            <div
              key={p._id}
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
                <p className="text-sm opacity-80">
                  <span className="font-medium">Subject:</span> {p.subject}
                  {p.experienceLevel ? ` • ${p.experienceLevel}` : ""}
                </p>
                <StarRating value={Number(p.rating) || 0} />
                <div className="card-actions justify-end mt-2">
                  <button
                    className="btn btn-primary"
                    onClick={() => handleView(p._id)}
                  >
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && items.length < 3 && (
        <p className="mt-4 text-sm opacity-70">Not enough profiles yet.</p>
      )}
    </section>
  );
};

export default TopStudyPartners;
