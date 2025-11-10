import React from "react";
import HeroCarousel from "../Components/HeroCarousel";
import TopStudyPartners from "../Components/TopStudyPartners";

const Home = () => {
  return (
    <main className="container mx-auto px-4 md:px-8 py-6 md:py-10">
      <HeroCarousel />
      <section className="mt-10">
        <TopStudyPartners />
      </section>
    </main>
  );
};

export default Home;
