import React from "react";
import { Link } from "react-router";

const steps = [
  {
    id: 1,
    title: "Create Profile",
    desc: "Add subjects, level, availability, and location.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8">
        <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5Z" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Find Partners",
    desc: "Filter by subject, mode, level, and city.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8">
        <path d="M10 18a8 8 0 1 1 5.292-14.03l.332.282 5.052 5.051-1.414 1.414-4.6-4.6A6 6 0 1 0 10 16a5.963 5.963 0 0 0 3.284-.986l1.152 1.152A7.962 7.962 0 0 1 10 18Z" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Connect & Schedule",
    desc: "Message, agree on time, online or in person.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8">
        <path d="M6 2h2v2h8V2h2v2h3v18H3V4h3Zm15 6H3v12h18V8Zm-4 3v2H7v-2h10Z" />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Track Progress",
    desc: "Rate partners and improve together.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8">
        <path d="M7 14h2v6H7v-6Zm4-4h2v10h-2V10Zm4-6h2v16h-2V4Z" />
      </svg>
    ),
  },
];

const HowItWorks = () => {
  return (
    <section className="container mx-auto px-4 md:px-8 py-10">
      <h2 className="text-2xl md:text-3xl font-bold text-center">
        How It Works
      </h2>
      <p className="text-center opacity-80 mt-2">
        Four simple steps to your perfect study match
      </p>
      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((s) => (
          <div
            key={s.id}
            className="card bg-base-100 shadow hover:shadow-lg transition"
          >
            <div className="card-body items-start">
              <div className="p-3 rounded-xl bg-pink-400">{s.icon}</div>
              <h3 className="text-lg font-semibold">{s.title}</h3>
              <p className="opacity-80 text-sm">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <Link to="/find-partners" className="btn btn-primary">
          Get Started
        </Link>
      </div>
    </section>
  );
};

export default HowItWorks;
