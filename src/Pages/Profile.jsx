import React from "react";
import { useAuth } from "../contexts/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  if (!user) return <div className="text-center py-10">No user logged in.</div>;

  return (
    <main className="container mx-auto px-4 md:px-8 py-8">
      <div className="max-w-md mx-auto card bg-base-100 shadow">
        <div className="card-body text-center">
          <img
            src={user.photoURL || "https://i.ibb.co/9G7n1Qh/default-avatar.png"}
            alt={user.displayName || "User"}
            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
          />
          <h1 className="text-xl font-bold">{user.displayName || "User"}</h1>
          <p className="text-sm opacity-70">{user.email}</p>
        </div>
      </div>
    </main>
  );
};

export default Profile;
