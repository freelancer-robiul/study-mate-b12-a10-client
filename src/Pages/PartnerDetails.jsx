import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { API_BASE, getJson, postJson } from "../lib/api";
import Loader from "../Components/Loader";
import { useAuth } from "../Contexts/AuthContext";
import { toast } from "react-toastify";

const PartnerDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const d = await getJson(`/api/partners/${id}`);
      setData(d);
    } catch (e) {
      toast.error(e.message || "Failed to load partner");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [id]);

  const handleSendRequest = async () => {
    if (!user?.email) return toast.error("Please login again");
    setSending(true);
    try {
      const res = await postJson(`/api/partners/${id}/request`, {
        requesterEmail: user.email,
      });
      setData(res.partner);
      toast.success("Partner request sent");
    } catch (e) {
      toast.error(e.message || "Failed to send request");
    } finally {
      setSending(false);
    }
  };

  if (loading || !data) return <Loader label="Loading profile..." />;

  return (
    <main className="container mx-auto px-4 md:px-8 py-8">
      <div className="max-w-3xl mx-auto card bg-base-100 shadow">
        <figure className="w-full max-h-[340px] overflow-hidden">
          <img
            src={data.profileimage}
            alt={data.name}
            className="w-full object-cover"
            onError={(e) =>
              (e.currentTarget.src =
                "https://i.ibb.co/9G7n1Qh/default-avatar.png")
            }
          />
        </figure>
        <div className="card-body">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-2xl font-bold">{data.name}</h1>
            <div className="badge badge-lg">{data.experienceLevel}</div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 mt-2 text-sm">
            <div>
              <p>
                <span className="font-semibold">Subject:</span> {data.subject}
              </p>
              <p>
                <span className="font-semibold">Study Mode:</span>{" "}
                {data.studyMode}
              </p>
              <p>
                <span className="font-semibold">Availability:</span>{" "}
                {data.availabilityTime}
              </p>
            </div>
            <div>
              <p>
                <span className="font-semibold">Location:</span> {data.location}
              </p>
              <p>
                <span className="font-semibold">Rating:</span>{" "}
                {Number(data.rating || 0).toFixed(1)}
              </p>
              <p>
                <span className="font-semibold">Partner Count:</span>{" "}
                {data.patnerCount || 0}
              </p>
            </div>
          </div>

          <div className="mt-4">
            <button
              onClick={handleSendRequest}
              disabled={sending}
              className="btn btn-primary"
            >
              {sending ? "Sending..." : "Send Partner Request"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PartnerDetails;
