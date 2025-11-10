import React from "react";

import HeroCarousel from "../../Components/HeroCarousel";

const Home = () => {
  return (
    <div className="my-10">
      <div>
        <HeroCarousel></HeroCarousel>
      </div>
      <div className="mt-7 grid grid-cols-3 items-center justify-center gap-5">
        <h1>This Home user section</h1>
      </div>
    </div>
  );
};

export default Home;
