import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { API_BASE, getJson } from "../lib/api";
import { useAuth } from "../Contexts/AuthContext";

const FindPartners = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // controls
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("rating");

  const fetchList = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search.trim()) params.set("subject", search.trim());
    if (sort) params.set("sort", sort);
    const data = await getJson(`${API_BASE}/api/partners?${params.toString()}`);
    setItems(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchList();
  }, []);

  const handleView = (id) => {
    if (!user) return navigate("/login", { replace: true });
    navigate(`/partners/${id}`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchList();
  };

  return (
    <main className="container mx-auto px-4 md:px-8 py-8">
      <h1 className="text-2xl font-bold">Find Partners</h1>

      {/* Top bar: Sort (left) | Search (right) */}
      <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="flex items-center gap-2">
          <label className="text-sm opacity-80">Sort</label>
          <select
            className="select select-bordered select-sm w-44"
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);

              setTimeout(fetchList, 0);
            }}
          >
            <option value="rating">Highest Rating</option>
            <option value="new">Newest</option>
          </select>
        </div>

        {/* Search (right) */}
        <form
          onSubmit={handleSearch}
          className="flex items-center gap-2 md:ml-auto"
        >
          <input
            className="input input-bordered input-sm w-56 md:w-72"
            placeholder="Search by subject"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn btn-primary btn-sm" type="submit">
            Search
          </button>
        </form>
      </div>

      {/* Results */}
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
                  <p className="text-sm opacity-80">Subject: {p.subject}</p>
                  <p className="text-sm opacity-80">Mode: {p.studyMode}</p>
                  <p className="text-sm opacity-80">
                    Level: {p.experienceLevel}
                  </p>
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
