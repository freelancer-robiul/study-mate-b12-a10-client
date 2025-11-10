import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router";

const slides = [
  {
    id: 1,
    title: "Find Your Perfect Study Partner",
    subtitle: "Match by subject, level, and schedule to learn faster—together.",
    img: "https://images.pexels.com/photos/6147362/pexels-photo-6147362.jpeg",
    ctaPrimary: { label: "Find Partners", to: "/find-partners" },
    ctaSecondary: { label: "How It Works", to: "/about" },
  },
  {
    id: 2,
    title: "Create Your Partner Profile",
    subtitle:
      "Show your strengths, goals, and availability to get better matches.",
    img: "https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg",
    ctaPrimary: { label: "Create Profile", to: "/create-partner" },
    ctaSecondary: { label: "View Examples", to: "/profiles" },
  },
  {
    id: 3,
    title: "Study Online or Nearby",
    subtitle: "Choose online meets or find peers from your campus or city.",
    img: "https://images.pexels.com/photos/6325951/pexels-photo-6325951.jpeg",
    ctaPrimary: { label: "Start Now", to: "/find-partners" },
    ctaSecondary: { label: "Join Free", to: "/register" },
  },
];

const AUTO_MS = 5000;

const HeroCarousel = () => {
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);

  const next = () => setIndex((i) => (i + 1) % slides.length);
  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);

  useEffect(() => {
    timerRef.current = setInterval(next, AUTO_MS);
    return () => clearInterval(timerRef.current);
  }, [index]);

  return (
    <section className="relative w-full rounded-2xl shadow-lg overflow-hidden">
      <div className="relative h-[70vh] md:h-[80vh] overflow-hidden">
        {slides.map((s, i) => (
          <article
            key={s.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === i ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* Background */}
            <img
              src={s.img}
              alt={s.title}
              className="w-full h-full object-cover"
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/50"></div>

            {/* Content centered */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 md:px-8">
              <h1 className="text-3xl md:text-5xl font-extrabold mb-4">
                {s.title}
              </h1>
              <p className="text-sm md:text-lg mb-6 opacity-90 max-w-2xl">
                {s.subtitle}
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link to={s.ctaPrimary.to} className="btn btn-primary">
                  {s.ctaPrimary.label}
                </Link>
                <Link to={s.ctaSecondary.to} className="btn btn-outline">
                  {s.ctaSecondary.label}
                </Link>
              </div>
            </div>
          </article>
        ))}

        {/* Arrows */}
        <button
          className="btn btn-circle absolute left-4 top-1/2 -translate-y-1/2 z-20"
          onClick={prev}
        >
          ❮
        </button>
        <button
          className="btn btn-circle absolute right-4 top-1/2 -translate-y-1/2 z-20"
          onClick={next}
        >
          ❯
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2 w-2 rounded-full transition-all ${
              index === i ? "w-6 bg-primary" : "bg-base-300"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
