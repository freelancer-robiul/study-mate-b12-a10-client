import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000";

const PartnerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [p, setP] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/api/partners/${id}`);
        if (!res.ok) throw new Error();
        setP(await res.json());
      } catch {
        setErr("Failed to load");
      }
    })();
  }, [id]);

  if (err)
    return <div className="container mx-auto p-6 alert alert-error">{err}</div>;
  if (!p) return <div className="container mx-auto p-6">Loading…</div>;

  return (
    <main className="container mx-auto px-4 md:px-8 py-8">
      <button className="btn btn-outline mb-4" onClick={() => navigate(-1)}>
        ← Back
      </button>
      <div className="grid md:grid-cols-2 gap-6">
        <img
          src={p.profileimage}
          alt={p.name}
          className="w-full h-[390px] object-cover rounded-xl shadow"
          onError={(e) =>
            (e.currentTarget.src =
              "https://i.ibb.co/9G7n1Qh/default-avatar.png")
          }
        />
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">{p.name}</h1>
          <p className="opacity-80">{p.email}</p>
          <div className="divider" />
          <p>
            <span className="font-semibold">Subject:</span> {p.subject}
          </p>
          <p>
            <span className="font-semibold">Experience:</span>{" "}
            {p.experienceLevel}
          </p>
          <p>
            <span className="font-semibold">Study Mode:</span> {p.studyMode}
          </p>
          <p>
            <span className="font-semibold">Availability:</span>{" "}
            {p.availabilityTime}
          </p>
          <p>
            <span className="font-semibold">Location:</span> {p.location}
          </p>
          <p>
            <span className="font-semibold">Rating:</span>{" "}
            {Number(p.rating || 0).toFixed(1)}
          </p>
          <p>
            <span className="font-semibold">Partners:</span> {p.patnerCount}
          </p>
        </div>
      </div>
    </main>
  );
};

export default PartnerDetails;
