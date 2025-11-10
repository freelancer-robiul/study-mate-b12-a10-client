import React from "react";
import { useRouteError, isRouteErrorResponse, Link } from "react-router";

const ErrorPage = () => {
  const error = useRouteError();
  const code = isRouteErrorResponse(error) ? error.status : 500;
  const text = isRouteErrorResponse(error)
    ? error.statusText
    : "Unexpected Error";

  return (
    <main className="min-h-[60vh] container mx-auto px-4 md:px-8 py-12">
      <div className="max-w-xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold">{code}</h1>
        <p className="mt-2 text-lg">{text}</p>
        <p className="mt-1 opacity-70">
          {code === 404
            ? "The page you’re looking for doesn’t exist."
            : "Something went wrong while loading this page."}
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Link to="/" className="btn btn-primary">
            Go Home
          </Link>
          <button className="btn btn-outline" onClick={() => location.reload()}>
            Retry
          </button>
        </div>
      </div>
    </main>
  );
};

export default ErrorPage;
