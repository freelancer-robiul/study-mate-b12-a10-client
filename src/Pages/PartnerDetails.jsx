import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { getJson, postJson } from "../lib/api";
import { useAuth } from "../Contexts/AuthContext";
import Loader from "../Components/Loader";

const PartnerDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [partner, setPartner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  // Load partner info
  const loadPartner = async () => {
    setLoading(true);
    try {
      const data = await getJson(`/api/partners/${id}`);
      setPartner(data);
    } catch (err) {
      toast.error(err.message || "Failed to load partner details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPartner();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Handle Send Request
  const handleSendRequest = async () => {
    if (!user) {
      // Redirect to login, but remember this page
      return navigate("/login", { state: { from: `/partners/${id}` } });
    }

    setSending(true);
    try {
      const res = await postJson(`/api/partners/${id}/request`, {
        requesterEmail: user.email,
      });
      toast.success("Partner request sent!");
      setPartner(res.partner); // update UI with incremented count
    } catch (err) {
      toast.error(err.message || "Failed to send request");
    } finally {
      setSending(false);
    }
  };

  if (loading) return <Loader label="Loading partner details..." />;

  if (!partner)
    return (
      <main className="container mx-auto p-8 text-center">
        <p className="text-red-500">Partner not found.</p>
      </main>
    );

  return (
    <main className="container mx-auto px-4 md:px-8 py-8">
      <div className="max-w-3xl mx-auto bg-base-100 rounded-xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <img
            src={partner.profileimage}
            alt={partner.name}
            className="w-48 h-48 object-cover rounded-lg shadow"
            onError={(e) =>
              (e.currentTarget.src =
                "https://i.ibb.co/9G7n1Qh/default-avatar.png")
            }
          />
          <div>
            <h1 className="text-2xl font-bold">{partner.name}</h1>
            <p className="text-sm opacity-80 mt-1">{partner.email}</p>
            <div className="mt-3 space-y-1 text-sm">
              <p>
                <strong>Subject:</strong> {partner.subject}
              </p>
              <p>
                <strong>Study Mode:</strong> {partner.studyMode}
              </p>
              <p>
                <strong>Availability:</strong> {partner.availabilityTime}
              </p>
              <p>
                <strong>Location:</strong> {partner.location}
              </p>
              <p>
                <strong>Experience Level:</strong> {partner.experienceLevel}
              </p>
              <p>
                <strong>Rating:</strong> ⭐ {partner.rating}
              </p>
              <p>
                <strong>Partner Count:</strong> {partner.patnerCount}
              </p>
            </div>

            <button
              onClick={handleSendRequest}
              disabled={sending}
              className="btn btn-primary mt-5"
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
