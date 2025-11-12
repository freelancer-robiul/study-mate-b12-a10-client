import React from "react";
import { Link, useRouteError } from "react-router";

const ErrorPage = () => {
  const err = typeof useRouteError === "function" ? useRouteError() : null;

  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <div className="text-8xl font-black">404</div>
        <h1 className="text-2xl font-bold mt-2">Lost in Study Space</h1>
        <p className="opacity-70 mt-2">
          {err?.statusText ||
            err?.message ||
            "The page you’re looking for doesn’t exist."}
        </p>
        <div className="mt-6 flex gap-3 justify-center">
          <Link to="/" className="btn btn-primary">
            Back to Home
          </Link>
          <Link to="/find-partners" className="btn btn-outline">
            Find Partners
          </Link>
        </div>
        <div className="mt-8">
          <svg
            width="200"
            height="110"
            viewBox="0 0 200 110"
            className="mx-auto opacity-70"
          >
            <circle
              cx="40"
              cy="70"
              r="20"
              fill="currentColor"
              className="opacity-20"
            />
            <circle
              cx="100"
              cy="55"
              r="30"
              fill="currentColor"
              className="opacity-20"
            />
            <circle
              cx="160"
              cy="75"
              r="18"
              fill="currentColor"
              className="opacity-20"
            />
          </svg>
        </div>
      </div>
    </main>
  );
};

export default ErrorPage;
