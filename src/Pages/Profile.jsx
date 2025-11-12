import React from "react";
import { useAuth } from "../Contexts/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  return (
    <main className="container mx-auto px-4 md:px-8 py-8">
      <div className="max-w-xl mx-auto card bg-base-100 shadow">
        <div className="card-body">
          <div className="flex items-center gap-4">
            <div className="avatar">
              <div className="w-20 rounded-full ring ring-base-300">
                <img
                  src={
                    user?.photoURL ||
                    "https://i.ibb.co/9G7n1Qh/default-avatar.png"
                  }
                  alt={user?.displayName || "User"}
                  referrerPolicy="no-referrer"
                  onError={(e) =>
                    (e.currentTarget.src =
                      "https://i.ibb.co/9G7n1Qh/default-avatar.png")
                  }
                />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold">
                {user?.displayName || "User"}
              </h1>
              <p className="opacity-80 text-sm">{user?.email}</p>
            </div>
          </div>

          <div className="mt-6 grid gap-2 text-sm">
            <div>
              <span className="font-semibold">UID:</span> {user?.uid}
            </div>
            <div>
              <span className="font-semibold">Provider:</span>{" "}
              {user?.providerData?.[0]?.providerId}
            </div>
            <div>
              <span className="font-semibold">Email Verified:</span>{" "}
              {user?.emailVerified ? "Yes" : "No"}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
