import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { API_BASE, getJson } from "../lib/api";
import Loader from "../Components/Loader";
import { toast } from "react-toastify";
import { useAuth } from "../Contexts/AuthContext";

const FindPartners = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("rating");

  const fetchList = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search.trim()) params.set("subject", search.trim());
      if (sort) params.set("sort", sort);
      const data = await getJson(`/api/partners?${params.toString()}`);
      setItems(data);
    } catch (e) {
      toast.error(e.message || "Failed to load partners");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleView = (id) => {
    if (!user)
      return navigate("/login", {
        state: { from: `/partners/${id}` },
        replace: true,
      });
    navigate(`/partners/${id}`);
  };

  if (loading) return <Loader label="Fetching partners..." />;

  return (
    <main className="container mx-auto px-4 md:px-8 py-8">
      <h1 className="text-2xl font-bold">Find Partners</h1>

      <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-sm opacity-80">Sort</span>
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

        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetchList();
          }}
          className="flex items-center gap-2 md:ml-auto"
        >
          <input
            className="input input-bordered input-sm w-56 md:w-72"
            placeholder="Search by subject (e.g., Math)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn btn-primary btn-sm" type="submit">
            Search
          </button>
        </form>
      </div>

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
                <p className="text-sm opacity-80">Level: {p.experienceLevel}</p>
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
    </main>
  );
};

export default FindPartners;
