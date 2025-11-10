import React from "react";

const data = [
  {
    id: 1,
    name: "Nusrat Jahan",
    role: "Chemistry • Advanced",
    img: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg",
    rating: 5,
    text: "Matched with a partner in two days. Weekly sessions boosted my grades fast.",
  },
  {
    id: 2,
    name: "Aisha Rahman",
    role: "Mathematics • Intermediate",
    img: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
    rating: 4,
    text: "Loved the flexibility to choose online or campus meets. Super convenient.",
  },
  {
    id: 3,
    name: "Omita Jahan",
    role: "Computer Science • Intermediate",
    img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e",
    rating: 4,
    text: "Clean UI and quick matching. Pair programming made learning enjoyable.",
  },
];

const Star = ({ on }) => (
  <span className={on ? "text-warning" : "text-base-300"}>★</span>
);

const Testimonials = () => {
  return (
    <section className="container mx-auto px-4 md:px-8 py-10">
      <h2 className="text-2xl md:text-3xl font-bold text-center">
        What Learners Say
      </h2>
      <p className="text-center opacity-80 mt-2">
        Real experiences from students who study together
      </p>
      <div className="mt-8 grid md:grid-cols-3 gap-6">
        {data.map((t) => (
          <div
            key={t.id}
            className="card bg-base-100 shadow hover:shadow-lg transition"
          >
            <div className="card-body">
              <div className="flex items-center gap-3">
                <img
                  src={t.img}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover"
                  onError={(e) =>
                    (e.currentTarget.src =
                      "https://i.ibb.co/9G7n1Qh/default-avatar.png")
                  }
                />
                <div>
                  <h3 className="font-semibold leading-tight">{t.name}</h3>
                  <p className="text-xs opacity-70">{t.role}</p>
                </div>
              </div>
              <p className="mt-3 text-sm">{t.text}</p>
              <div className="mt-2 text-lg">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} on={i < t.rating} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
