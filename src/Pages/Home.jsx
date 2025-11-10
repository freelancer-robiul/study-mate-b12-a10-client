import React from "react";
import HeroCarousel from "../Components/HeroCarousel";
import TopStudyPartners from "../Components/TopStudyPartners";
import HowItWorks from "../Components/HowItWorks";
import Testimonials from "../Components/Testimonials";

const Home = () => {
  return (
    <main className="container mx-auto px-4 md:px-8 py-6 md:py-10">
      <HeroCarousel />
      <section className="mt-10">
        <TopStudyPartners />
      </section>
      <section className="mt-10">
        <HowItWorks />
      </section>
      <section className="mt-2">
        <Testimonials />
      </section>
    </main>
  );
};

export default Home;
